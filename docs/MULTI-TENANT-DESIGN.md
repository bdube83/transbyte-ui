# Edgebox multi-tenant accounts — design (rev 2)

Goal: turn PR #5's single-owner Edgebox console into a multi-tenant product where any
verified Google user signs in, picks Home or Business on first login, gets an organisation,
and manages sites, sources, API keys, events and usage. Keep PR #5's proven server-side auth
mechanism. Drop the single-owner gate.

Decision on file (2026-09-16): keep PR #5's server-side Google-ID-token verification plus
`__Host-` cookie sessions. Do not adopt Netlify Identity (new-site enablement unverified for
Sept 2026; it would not deliver the org/membership layer anyway).

Rev 2 folds in the security and senior-engineer design reviews. Changes from rev 1: identity
keyed by Google `sub` not email; memberships stored on the identity blob; onboarding uses an
orphan-safe write plus one identity CAS (no phantom multi-key transaction); a single
deny-by-default authorization chokepoint; explicit per-request org context instead of an
ambient session `currentOrgId`; `email-index` and partner delegation deferred to Phase 2 and
redesigned to be identity-scoped.

## What exists (verified this turn against the code, `feat/multi-tenant-accounts`)

- `server/app.ts` `application()`: single-owner. Only `settings.ownerEmail` may sign in
  (`/auth/google` rejects other emails, app.ts:94; `/auth/owner` is a one-use owner code-link,
  app.ts:98-103). Every login maps to `digest("owner:"+ownerEmail)`.
- The per-account blob holds `{sites, sources, keys, events, requests, audit, operations}`.
  Storage keyed by `accounts/<id>`, `sessions/<digest(token)>`, `keys/<keyId>`,
  `challenges/<digest(nonce)>`, `limits/*`. Cross-account isolation test at
  live-api.test.mjs:30 proves the storage layer isolates by id.
- Storage supports compare-and-swap: `edgebox.mts:13` uses `onlyIfNew` / `onlyIfMatch`;
  `change()` at app.ts:32-38 is single-key CAS.
- Security posture already present and preserved unchanged: `__Host-` cookies (app.ts:21),
  CSRF double-submit (app.ts:54), idempotency keys (app.ts:57-64), rate limits (app.ts:82),
  same-origin enforcement (app.ts:72-76), Google nonce/audience/iss/exp/email_verified checks
  (app.ts:93), storage-failure-never-a-false-save. 17 tests green on baseline.

## Target model (rev 2)

The person and the tenant are separate records. A person can belong to many orgs.

```
identity/<idId>            {idId, sub, email, createdAt, defaultOrgId,
                            memberships:[{orgId, type, role}]}      # idId = digest("sub:"+googleSub)
org/<orgId>                {orgId, type, name, createdAt,
                            members:[{idId, email, role, addedAt}],
                            delegations:[...],                      # Phase 2, empty in Phase 1
                            sites, sources, keys, events, requests, audit, operations}
sessions/<digest(token)>   {idId, email, csrf, expires, revoked}   # identity only; no org
keys/<keyId>               {orgId, sourceId}                        # was {accountId}
```

- Identity key: `digest("sub:"+googleSub)`. Google `sub` is stable per account and survives
  email changes; email is stored as a display/alias attribute only. This closes the
  recycled-email takeover and invitation-inheritance paths the security review raised.
- Memberships live on the identity blob (authoritative index for "my orgs", powers `GET /orgs`
  and the switcher without a KV scan). The org blob's `members[]` is the authoritative record
  for in-org authorization, read on every resource call.
- Org types: `home`, `business` in Phase 1; `security_partner`, `edgebox_internal` in Phase 2.
- Roles: `owner`, `admin`, `member`, `viewer`. Phase 1 creates only `owner` (self-created org),
  so Phase 1 authorization is simply "is a member of the target org." The role matrix is Phase 2.

## Authorization (single chokepoint, deny-by-default)

One function `authorize(actor, org, method, path)` runs before every non-GET resource endpoint
and before every GET that returns org data. Rules:
- Resolve the target org from the explicit `X-Edgebox-Org` request header, not from the session.
  The session carries identity only. This removes the ambient-authority confused-deputy: a
  request acts on the org it names, authorized against live membership every time.
- Membership is re-read from the target org's `members[]` (live) each request and matched by
  `idId`, never by email.
- Unknown path = deny (no fall-through to shared logic). Non-GET without a passing authz check
  = 403. A per-endpoint x per-role test matrix enumerates every mutating path; a new path with
  no matrix row fails the suite.
- Phase 2 delegation is evaluated in the same chokepoint as a second branch, also from live
  state (see Phase 2), so revocation cuts an in-flight session immediately.
- API-key event ingestion (app.ts:104-121) keeps its own machine-auth path, source-scoped via
  the immutable `keys/<keyId>` -> `{orgId, sourceId}` map, and correctly bypasses the role gate.

## Endpoint changes

Auth
- `POST /auth/google`: remove owner-email gate (app.ts:94). On verified claims, upsert identity
  by `digest("sub:"+sub)` using CAS `onlyIfNew` (concurrent first-logins converge to one idId).
  Create session bound to identity. Return `{signed_in, onboarding: memberships.length===0,
  orgs, csrf}`. Keep every existing claim check (email_verified/aud/iss/exp/nonce) as-is.
- `GET /auth/config`: `account_signup:true`.
- Keep `/auth/challenge`, `/auth/session`, `/auth/logout`. Retire `/auth/owner` and
  `EDGEBOX_OWNER_EMAIL` (single-owner artefacts).

Org lifecycle
- `GET /orgs`: list the identity's memberships `{orgId, type, name, role}` from the identity blob.
- `POST /onboarding` `{type, name}` (type in home|business): coordination-safe creation.
  1. Compute `orgId = digest(idId + ":" + idempotencyKey).slice(0,32)` (deterministic).
  2. Write `org/<orgId>` with the creator as sole `owner` member, `onlyIfNew` (orphan-safe:
     nothing links to an org until step 3, so a crash here leaves benign garbage; a retry with
     the same idempotency key reuses the same orgId and no-ops).
  3. One `change()` CAS on `identity/<idId>`: natural-key dedup (a membership already created
     under this idempotency key -> return it), else append `{orgId, type, role:'owner'}` and set
     `defaultOrgId` if unset. This single CAS is the commit point. `defaultOrgId` is a cache; if
     absent it is derived as the earliest membership.
- No `/orgs/select`: the org is named per request via `X-Edgebox-Org`. The frontend tracks the
  active org client-side and sends the header; `defaultOrgId` seeds the initial choice.

Resource endpoints (`/sites`, `/sources`, `/api-keys`, `/events`, `/dashboard`, `/export`,
`/service-requests`, acks, revoke): behaviour unchanged, now scoped to the header-named org and
gated by `authorize()`. Implementation note (from senior-eng review): this is more than a
`s.accountId -> orgId` rename. `sessionResponse()` auto-provisions a blob on sign-in (app.ts:44)
and must be split so sign-in creates identity+session only; the `view()` shape (app.ts:68) adds
org name/type/role and ripples to the frontend; resource endpoints need an explicit
"onboarding required / not a member" guard so a header naming an org the actor cannot access
returns 403, not a confusing 401 on `accounts/null`.

## Phase 2 (designed now, built later)

- Invitations: `email-index/<digest(email)>` -> `{idId|pending}` created with CAS `onlyIfNew`
  as the email->identity alias. Invite creates a pending membership bound to an email with a
  TTL. On claim, the membership is pinned to the claiming Google `sub` and requires
  `email_verified:true`. Non-Google credential paths (email-OTP) may not claim
  partner/admin/owner invitations.
- Partner delegation, identity-scoped (security review must-fix): a customer owner grants
  access to specific partner *identities*, not to a whole partner org. The customer sees the
  current delegated roster and can revoke per identity. Every grant/revoke and every partner
  read is audited into the customer org. The authz chokepoint re-reads delegations from live
  customer state each request; scope `verify` allows read plus acknowledge only.
- Admin (`edgebox_internal`): a `sub`-keyed env allowlist `EDGEBOX_INTERNAL_SUBS` evaluated as a
  computed role at request time (not a written membership), so removing an entry revokes
  immediately. Read-only. Every internal read is audited into the org read. Never inferred from
  email domain.
- Roles: owner/admin/member/viewer enforced via the chokepoint matrix.

## returnTo (open-redirect safe)

Decode once, normalize backslashes to slashes, then require a match of `^/app(/|$)` (Phase 1
only routes `/app`; `/partner` and `/admin` join the pattern when their routes ship).
Reject: absolute URLs, protocol-relative `//host` and `/\host`, encoded `/%2f%2fhost` and
double-encoded, `https:/host`, leading whitespace/control chars, CRLF. Never reflect `returnTo`
into HTML; only into a server-validated `Location`. A test enumerates each bypass.

## First-login UX

`SignIn`: single "Continue with Google" (shown only when `/auth/config.google_enabled`),
email fallback only if enabled. Remove owner-link-only copy. Safe `returnTo` as above.
On `onboarding:true`: two Phase 1 choices, My home / My business, each POSTs `/onboarding`.
(The "security company / installer" choice is Phase 2; omitted from Phase 1 onboarding so the
UI does not imply a capability the backend lacks.) Returning users skip onboarding and land in
`defaultOrgId`'s dashboard. Org switcher in the header when memberships > 1, sets the active
org the client sends in `X-Edgebox-Org`. Empty states stay truthful (already true in PR #5).

## Security tests (extend the existing 17)

Any verified Google email can sign up; two identities get isolated orgs and neither can
read/write the other via a forged `X-Edgebox-Org`; onboarding creates exactly one org under a
concurrent double-login (same idempotency key -> same org; different keys -> the natural-key
dedup on the identity still yields one membership per type+name); a request naming a non-member
org is 403; retired `/auth/owner` returns 404; API keys still source-scoped and browser-privilege
-free; concurrent first-login converges to one idId (CAS); unsafe `returnTo` values each rejected;
deny-by-default (an undefined non-GET path is 404/403, never a silent write).

## Build phases

1. Core multi-tenant (satisfies the definition-of-done): drop owner gate, identity+membership,
   onboarding, header-named org scoping, authz chokepoint (membership-only), `GET /orgs`,
   frontend onboarding + switcher, cross-tenant isolation tests.
2. Invitations + email-index, roles + matrix, identity-scoped partner delegation, admin surface.

## Known limitations

- Empty-store precondition (deploy gate). This rebuild assumes no existing users, per the brief.
  It does not migrate the prior single-owner data: old `accounts/owner:<email>` blobs are never
  read, and old `keys/<keyId>` blobs stored `{accountId}` while the new event path reads
  `{orgId}`. If the deployed Netlify Blobs store already holds owner data or issued API keys,
  those keys return 401 and the old account is invisible (the signed-in owner is sent to
  onboarding). The code fails safe (no crash, no leak), but verify the production/preview store
  is empty, or clear it, before deploy. No migration is built, by instruction.
- returnTo is restricted to `/app` in Phase 1 because that is the only routed destination.
  `/partner` and `/admin` re-enter the allowlist when their routes ship, to avoid sending a user
  to a NotFound page after login.
- Onboarding double-submit can leave an orphaned, unreachable `orgs/<oid>` blob (storage litter,
  no access, no correctness impact). The submit button is disabled while a create is in flight,
  so this only occurs under a genuine multi-tab race. A stable client idempotency key would
  close it but would make the deterministic org id ignore a changed name, so it is left as-is.
- Open signup: any verified Google account can create unbounded identity+org blobs, capped only
  by the existing 120/min global and 15/min per-IP auth buckets (app.ts:82). Conscious pre-users
  deferral; add per-identity org caps with paid tiers.
- No live payments, camera AI, armed response, notifications or evidence storage; capabilities
  stay `false`, matching PR #5.
- Real end-to-end Google sign-in needs a Google OAuth client id and Netlify site env
  (`EDGEBOX_GOOGLE_CLIENT_ID`). Human/Netlify-console actions; the code and unit tests do not
  depend on them and I will not fabricate a successful configuration.
- Invitation email delivery is Phase 2 and needs a sender; pending memberships expire on TTL.
