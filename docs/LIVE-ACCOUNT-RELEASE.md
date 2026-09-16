# Edgebox owner account release — 2026-09-15

## Scope
This release adds an actual Netlify Function, persistent account metadata, a dashboard and source-event API on the existing Edgebox site. It is not the old loopback-only SQLite reference. There is no fake login, demo tenant, automatic camera inference or simulated billing. New public pages describe only site/event management and requests for further services; the development-status marketing headings are removed.

Access is deliberately owner-only until Google application registration and customer data/commercial gates are resolved. Existing transport handlers, api.edgebox.africa, the private backend reference and Khusela are not changed. Production URLs use the existing site at https://edgebox.africa; no DNS change, hosting-plan upgrade or equipment purchase is part of this release.

## Implemented routes
- GET /api/v1/health — service health and configuration capabilities.
- GET /api/v1/health/storage — fixed non-sensitive write/read sentinel proving the storage adapter; no account access.
- GET /api/v1/auth/config — provider availability; no secrets.
- POST /api/v1/auth/owner — administrator-issued, random 256-bit, one-time owner link, expiry required.
- POST /api/v1/auth/challenge and /auth/google — Google Identity Services nonce and official server-side token validation, with issuer/audience/expiry/verified-owner checks.
- GET /api/v1/auth/session; POST /api/v1/auth/logout — server-side opaque sessions, secure HttpOnly SameSite cookie, CSRF and revocation.
- GET /api/v1/dashboard, /export — owner-scoped persistent records, no API secrets.
- POST /api/v1/sites, /sources — idempotent owner registration.
- POST /api/v1/api-keys; POST /api/v1/api-keys/{id}/revoke — source-scoped, hashed, expiring credentials. A new secret is shown once; lost responses require revocation and replacement, not redisplay.
- POST /api/v1/events — bearer-authenticated event metadata, scope enforced server-side, exact replay deduplication and conflicting-payload rejection.
- POST /api/v1/events/{id}/acknowledge — persistent acknowledgement.
- POST /api/v1/service-requests — saved intent, not a purchase or external notification.

Dashboard: /app (also /dashboard); sign-in: /signin; public API guide: /docs/api. New sources say Awaiting events. A connection.test record tests the API; it does not establish camera installation or detection quality. Billing displays server-reported counts and No paid subscription, never a made-up invoice.

## Data, concurrency and limits
Use Netlify Blobs on the current provider for bounded owner metadata. Published production uses a site-wide store; previews use deploy-specific stores and cannot use the production owner link. Conditional ETag writes and retry preserve aggregate updates under concurrency. Reject an empty ETag on a reported conditional-write success to fail closed around the documented SDK failure mode. This is not a financial ledger or high-volume telemetry database.

Owner scope: 20 sites, 100 sources, 1,000 retained events, 20 active keys (100 lifetime keys before support), 50 requests, 500 recent audit entries. New events fail at capacity; no silent deletion. A seven-day input freshness bound is not a seven-day retention policy. Stored records remain until managed removal/export; account-deletion requests currently require operator handling. API event metadata rejects raw images, URLs and credentials. Do not use this release for customer footage, facial recognition, security response or sensitive third-party data.

The provider's default region is not asserted to be South Africa. Confirm customer-data region, POPIA roles and retention before opening registration. No new database provider or paid plan is selected. Existing Netlify usage charges/limits still apply; rate limits are not a guarantee of a zero bill.

## Google setup — one external prerequisite
Create or select Edgebox's Google Cloud project, configure Google Auth Platform branding/audience and a Web application client. Set the authorised JavaScript origin to https://edgebox.africa. The popup flow posts a credential to our own API and does not request Gmail/Drive scopes or a refresh token. Configure EDGEBOX_GOOGLE_CLIENT_ID as a Netlify Functions variable in production. A client ID is public configuration; do not put a client secret, password or private access link in GitHub. No client secret is needed for this Identity Services ID-token flow.

Until that client is configured, the sign-in screen accurately reports Google unavailability. The private owner link is a separate real authentication method, not a simulated Google login. It is issued only to the authenticated account owner's email, expires after 24 hours and is single-use. Its raw value is not stored in source or server logs; the URL fragment is removed before sending the code to the API. Session lifetime: 12 hours. Once Google is working, remove the bootstrap variables. To recover an expired/consumed owner link before then, issue a new random code through the same private owner delivery route; never publish it in an issue.

Functions-only production variables: EDGEBOX_OWNER_EMAIL, EDGEBOX_OWNER_CODE_HASH (SHA-256), EDGEBOX_OWNER_CODE_EXPIRES (Unix milliseconds). EDGEBOX_SITE_ORIGIN defaults to the canonical URL. All provider configuration is read using Netlify.env.get. No test verifier is available in the deployed function; it uses google-auth-library.verifyIdToken.

## Evidence and remaining tests
17 request/logic tests passed locally against an isolated CAS store, plus strict TypeScript checking of server/app.ts and syntax transpilation of new JSX. Run npm run test:api. The build runs those tests before Vite. Local test credentials and Google claim fixtures exist only in tests and do not prove a real Google-account consent journey. Record exact-head preview/build, production publish, persistence probe and browser results separately after deployment.

Not yet implemented: public customer signup, invitations/partner delegation, camera/VMS drivers and inference, video/evidence storage, external notifications, metered commercial plans/invoice ledger/payment collection, managed PostgreSQL migrations and production disaster recovery. These are not all solved by providing a Google client ID.

## Rollback
Revert this isolated release to the previous frontend. The existing Netlify data store is not automatically deleted on code rollback. Revoke bootstrap variables and active keys/sessions if disabling access. Do not destroy owner data as part of a routine code rollback.

Primary implementation references checked 2026-09-15:
- https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid
- https://developers.google.com/identity/gsi/web/guides/verify-google-id-token
- https://docs.netlify.com/build/functions/api/
- https://docs.netlify.com/build/data-and-storage/netlify-blobs/
- https://github.com/netlify/primitives/issues/741
