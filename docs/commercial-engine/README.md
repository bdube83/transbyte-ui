# Edgebox Commercial — operator guide

Version 1, 16 September 2026. This adds a founder sales-operations workspace to the current Edgebox application. It is not a bank connector, invoice issuer, accounting ledger, autonomous outreach system or camera deployment engine.

## Open the workspace

Visit `/commercial` on the existing Edgebox site. Sign in with the existing account. Only subjects authorised by the existing `EDGEBOX_INTERNAL_SUBS` server setting may enter. Customer owners, partner delegates and ordinary organisation administrators cannot view these records. The release neither grants internal privileges nor changes authentication. If access is denied, an existing authorised administrator must confirm your identity and role through the normal secure process; never paste tokens in GitHub.

## One sales journey

1. **Add prospect.** Record the organisation, research source and sales route. A real prospect starts as research-only; training records are permanently excluded from financial projections.
2. **Create opportunity.** Give it an owner, one concrete next action and a due date.
3. **Record contact route.** Save consent or an existing relationship and its evidence before sales progression. A public email is not treated as an opt-in. Do-not-contact blocks qualification, new quotes and agreement progression.
4. **Qualify.** Record the economic buyer role, customer problem and discovery evidence.
5. **Prepare quote.** Enter bounded scope, actual price experiment, one-off and recurring lines, cost assumptions and expiry. Versions remain intact. Copying a draft does not send it. Negative estimated contribution requires a documented exception.
6. **Record agreement.** Link the signed document to the current unexpired quote. This action does not sign a document or make an external commitment.
7. **Record receipt.** Enter a unique settlement reference, date, gross amount, included tax, category and evidence reference. Figures are labelled operator-recorded, not bank-synchronised. Deposits, hardware and third-party funds remain distinct from service collections.
8. **Record activation.** Require a service receipt, buyer acceptance and commissioning references. Site IDs must be unique across live contracts. This records delivery evidence; it does not commission the device automatically.
9. **Review renewal.** The Today queue surfaces renewals, missing evidence, contact holds, blockers, expired quotes and overdue next actions. Ended service leaves MRR; historical receipts remain. For v1, end the current period and create a new opportunity for the next agreement rather than overlapping the same site attribution.

## Screens

Today: priority actions and next revenue gate. Pipeline: accounts, opportunity detail and step-by-step forms. Partners: security-company/installer accounts and their opportunities. Revenue: separated recorded collections, service receipts and activated MRR. Procurement: source, closing/briefing dates, mandatory eligibility evidence and partner dependencies. Growth plan: gate-based operating targets; not a forecast.

## Financial meanings

All stored amounts use integer minor units in ZAR. Quote amounts exclude tax; receipt tax is explicitly supplied by the operator. Quotes are not tax invoices. Annual recurring lines are normalised to a monthly equivalent; one-off lines are excluded from MRR.

Activated MRR is a deliberately conservative operational measure: only non-test, live records with positive net service receipts and a future renewal-review date. The measure does not automatically establish statutory revenue recognition, full payment for every period or independently verified collections. An elapsed renewal excludes the record until reconfirmation. Pipeline value is separate and unweighted. Historical analysis, accounting-grade accruals, delinquency, bank settlement feeds, commission payouts and subscription invoicing remain future work.

Refunds are linked additive records with gross/tax/net ceilings. They do not send money. Full reversal of service receipts removes the activation from the MRR projection and adds a reconciliation task.

## Implementation and APIs

`server/commercial.ts` owns validation and projections. The existing Netlify wrapper dispatches these routes and reuses `application()` for session and internal-role checks:

- `GET /api/v1/commercial`
- `GET /api/v1/commercial/export`
- `POST /api/v1/commercial/commands`

A command is `{revision, type, payload}` with the current workspace revision, same-site Origin, existing session CSRF token and a stable `Idempotency-Key`. Retry the identical command after uncertain network delivery. A changed payload under the same key or stale revision returns 409. Never attempt to resolve an error by dropping authentication.

Storage is a bounded compare-and-swap operational document using the existing Netlify storage adapter. Limit: 500 accounts, 1,000 deals, 200 procurement records, 5,000 audit/command entries or 4 MB. Writes stop rather than silently discard history. This is intentionally not a high-volume financial transaction database. Before scaling, use a relational canonical commercial/ledger service with proper retention, backups, reconciliation and independently reviewed accounting controls. Do not disable the limits to claim R100M-scale readiness.

## Security and privacy

Commercial reads/writes are internal-only. Every request reuses the current application session and internal subject allowlist. Mutations require CSRF, same-origin requests, bounded JSON, version checks and idempotency. Revoked sessions and removed internal authorisation are rejected on the next request. Source API keys cannot read the pipeline.

Keep actual records in the protected store, never in public GitHub. Use private document identifiers or clean HTTPS references; no token-bearing links, raw bank/identity documents, personal footage or passwords. An evidence reference records where a reviewer can check; the system does not download or independently validate the document.

## Tests and release

`npm run test:api` runs all repository test files, including commercial state-machine, money, duplicate/refund, permission, procurement, API and continuation tests. The existing Netlify build runs these before Vite. Integration tests use synthetic in-memory sessions to verify the actual application boundary; they are not a claim that a real Google login or production user journey was observed.

Production acceptance additionally requires exact deployed revision, unauthorised API checks, persistence evidence, responsive browser QA and an authorised operator completing a real record. Do not label an untested production step complete because a fixture passes. No test data is automatically seeded.

## Notifications and external effects

ChatGPT briefing jobs are separate from this app. They read connected evidence and the private operating record; they do not automatically receive protected dashboard data or execute this service's commands. Publish only a concise non-sensitive progress summary to the private operating issue for the jobs when needed. Missing source data must be reported as unavailable, not zero.

No emails, quotes, contracts, bids, payments, purchases or hardware commands are sent by this release. A proposal copy button creates a draft only. Automated ingestion and authorised adapter execution are later workstreams, not hidden enabled features.

## Rollback

Revert this isolated release; do not wipe the production store. Existing auth, customer APIs, historical transport handlers and Khusela code remain unchanged. Commercial JSON exports are private backups for operator use, not proof of disaster-recovery readiness.
