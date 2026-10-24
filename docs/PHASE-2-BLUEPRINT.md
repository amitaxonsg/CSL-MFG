# CSL Phase 2 blueprint — client portal, gallery, Studio and NEXUS

## Scope and implementation status

The current release adds interactive **preview pages**, a staff chat access gate, an optional OpenAI text adapter and a Mailtrap sending adapter. It does not implement customer login, live Trello syncing, live mail retrieval, design generation, a production editor or automatic order placement.

| Area | Current provision | Phase 2 result |
|---|---|---|
| Track your Order | Disabled access preview, fictional current/past orders, repeat-request demonstrator | Verified customer order access |
| Jersey Gallery | 300 photorealistic AI concepts across14 sports and11 business collections;12 per collection, filters and concept-to-RFQ link | Curated real product photography, saved designs and optional AI variations |
| CSL Studio | Coming Soon roadmap | Garment templates, logo placement, AI concepts and versioned enquiry exports |
| ASK NEXUS | Server-verified staff access; bounded text assistant; no company source tools | Individual staff identity, scoped email/Trello retrieval and approved skills |
| Mailtrap | Server-only transactional sending adapter with mocked success/failure tests | Verified sender, production recipients, notification workflows and delivery events |
| Trello | Environment placeholders and customer-safe data/repeat-request contracts | Mapped lists/custom fields, validated webhooks, reconciliation and audited writes |

## 1. Client identity: reference + email is a lookup, not authentication

1. Client supplies order reference and registered email over HTTPS.
2. Respond identically whether or not a match exists: “If the details match, we will email your sign-in link.” Do not reveal whether an email/order exists.
3. Send a short-lived, single-use email link or code with Mailtrap, only to the already registered address. Never grant access because the typed details match a visible Trello card.
4. Verify the token server-side; store only its hash, expiry and attempt state. Rate-limit requests, retries and code checks. Prevent replay.
5. Resolve a durable customer/account ID. Authorisation uses that account ID and a staff-approved order association, never an email substring, card-title search, shared email domain or caller-supplied customer ID.
6. Fetch current and past orders for that customer only. Each order detail, artwork view/download, repeat request and notification endpoint repeats the ownership check.
7. Multiple contacts per business require invitations and explicit access grants. Changing the registered email needs verification and an audit trail. Departed staff can be revoked.
8. Use secure, HttpOnly, SameSite cookies and bounded sessions. Provide sign out and session revocation. No private order data should appear in URLs, browser storage, analytics or public HTML caches.

## 2. Trello remains the operational order record

All actual production orders/cards stay in Trello. The portal still needs a small private identity/sync store for customer-to-order access grants, verification tokens, session state, webhook deduplication, artwork visibility and audit events. This is a security and delivery layer, not a competing order system.

Before connecting anything, inspect the real boards and agree one stable **order reference**, card ID, customer account ID and approved contact mapping. Do not infer ownership from a card name or free-text email mention. Legacy cards need a review/backfill migration and an “unmatched — staff review” queue.

Define explicit, configurable mappings for list IDs and custom field IDs. Never hard-code list display names, which staff may rename. Map internal Trello lists to simplified customer stages:

- Brief received
- Artwork review / awaiting customer approval
- Approved
- In production
- Quality check
- Ready to dispatch
- Partially dispatched / dispatched
- Completed
- On hold / cancelled

Actual list mappings and date semantics need staff approval. A Trello due date may be an internal task deadline; it must not automatically become a promised delivery date. Percent-complete figures are omitted unless CSL supplies a meaningful calculation.

Use signed/verified Trello webhooks for timely updates, plus scheduled reconciliation to repair missed events. Validate webhook signatures against the raw body and exact callback URL, deduplicate event IDs, handle retries, queue work and re-fetch the authorised resource. Handle rate limits, revoked credentials, deleted/archived cards and moved boards. Show a “last updated” timestamp; display a clear stale/unavailable state if sync fails rather than an invented current status.

Official references:
- https://developer.atlassian.com/cloud/trello/guides/rest-api/webhooks/
- https://developer.atlassian.com/cloud/trello/guides/rest-api/api-introduction/

## 3. Customer-safe order view — absolutely no financial information

Allowlist fields only. `lib/order-contract.mjs` provides the starting boundary and tests, but is not a live Trello parser.

Allow: public order reference, product/range, quantity, size/roster details when authorised, approved colours/fabric specification, customer-safe status/update, last sync time, confirmed manufacturing/dispatch milestones, approved artwork versions and customer-visible shipment information.

Exclude: all prices, unit rates, order totals, balances, invoices, payments, deposits, credit notes, financial attachments, supplier costs, margins, internal comments, staff notes, unrelated emails and other customers' information. Do not serialise raw Trello cards/actions/descriptions into customer responses. Do not rely on CSS hiding, client-side filtering or an AI model to remove sensitive fields.

Treat artwork as a separately authorised resource. Never expose Trello credentials, raw private attachment URLs or an entire card attachment list. Store/proxy only staff-approved customer-visible files, verify ownership on each request, use short-lived download authorisation and disable shared caching. Require reauthentication where appropriate. Public gallery rights and private order artwork visibility are separate permissions.

## 4. Current and past orders

The dashboard should offer search by reference/product, current/past filters, recently updated sorting, customer-safe progress timeline and explicit “action needed” flags. Details include front/back approved previews, revision IDs, product specifications, quantities/size breakdown and dispatch information.

Provide clear states for no orders, incorrect access, delayed sync, missing artwork, on hold, cancellations, split orders, partial shipments and archived legacy orders. For legacy orders without reliable data, show “Contact CSL” instead of filling gaps with guesses.

## 5. Repeat requests — new request linked to immutable history

| Customer intention | Capture | Required staff review |
|---|---|---|
| Same design, same quantity | Original reference/revision, current contact, destination | Availability, material continuity and current terms |
| Same design, different quantity | New quantity and size distribution | Minimums, feasibility and timing |
| Same kit, new names/numbers | Versioned roster and size breakdown | Roster validation and artwork approval |
| Same concept, different colours/logo | New assets and exact change notes | New artwork revision and proof |
| Revised fit/fabric/product | Explicit specification differences | Sampling, suitability and construction |
| New design based on old order | New brief with original linked as inspiration | Design scope and fresh approval |
| Urgent/event order | Requested arrival date, event date, flexibility and destination | Capacity and transit feasibility; no automatic guarantee |

Create a **new Trello request card** in a review queue, linked to the source order ID and exact approved artwork revision. Never overwrite the original production card or copy its approval as approval of the changed request. Preserve a structured diff of changed quantity, sizes, artwork and destination. Validate stale source revisions before submission and prevent double-click duplicates.

An urgent request is a request, not a confirmed expedite. Changing a live order is a separate change request: staff assess the production lock stage and explicitly accept or decline it. No silent edits to quantities or artwork already in production.

A repeat request may need a new quotation internally, but this client portal does not expose financial data. Use the existing authorised commercial process separately.

## 6. Proof approval and revision control

Add a versioned approval centre: product views, roster/specification summary, “approve this version” and “request changes”. Record who approved, when, which artwork/spec revision and what was shown. Superseded proofs cannot be approved. Lock the approved package and present staff with a comparison on later changes. This is more valuable than adding more generic AI chat first.

## 7. Gallery and CSL Studio

Gallery: Rugby is featured first. The preview supports Rugby, Football, Basketball, Cricket and Netball with 12 original vector concept directions each. These are schematic illustrations, not real CSL projects, testimonials, inventory or production-ready designs. The sport selection does not assert CSL currently sells every proposed silhouette; verify actual ranges before a public product launch.

Phase 2 should use approved real kits and/or clearly labelled generated concepts, front/back views, colour families, garment style tags and design IDs. Separate “CSL product work” from “concept inspiration”. Never reuse customer logos or publish private designs without permission. Do not imply an affiliation with famous teams.

Studio journey: select a supported garment template; choose colours, approved fabrics and decoration options; upload owned/permitted logos; explore AI ideas; place/scale elements; inspect front/back; add names/numbers/roster; save versions; send selected concept and specifications as an RFQ. Keep original logos intact and provide a manual path if generation fails.

Generated image concepts are not manufacturing files. Vector artwork, colour matching, placement tolerances, print areas, licensing and export requirements need production review. Preview model behaviour must not invent available fabrics, guarantee Pantone matches or promise print-ready output. Add generation quotas, cost controls, asset retention, staff moderation and consent before generation.

## 8. ASK NEXUS — internal use

Public entry: an “ASK NEXUS / Internal Use” button. Current access is verified by a salted scrypt hash stored only in server `.env`, with five login attempts per 15 minutes, a bounded server-side session, HttpOnly/SameSite cookie, optional OpenAI text generation, sign out and no-store responses. No email, Trello or financial source is connected.

Configure the requested temporary preview code using `npm run nexus:set-password` on the confirmed account. Do not put codes or hashes into Git, HTML, browser scripts, screenshots or docs. Shared short codes are suitable only for an isolated preview with no private work data. Before connecting actual company data, use individual staff sign-in and role permissions, preferably the existing business identity provider, plus revocation and audit logging. This release does not implement that identity provider integration.

Define skills as versioned, reviewed server-side procedures:
- Order lookup with source card reference, timestamp and customer/account context.
- Inbox/thread summary with source links and date boundaries; attachments treated as untrusted content.
- RFQ completeness and artwork/roster checklist.
- Repeat-order comparison and urgent-order readiness checks.
- Draft customer updates for human review; never invent production facts.
- SOP search that cites the exact approved document/version.
- Exception summaries: missing approvals, stalled cards, failed email and overdue internal tasks.

Use read-only tools first. Email sending, changing Trello cards, approvals and any commitment require explicit staff approval and an audit entry. Respect CSL's communication rules; source content can never authorise an action. Separate roles and datasets for sales, artwork, production and management; do not give every staff login access to every mailbox or financial record.

The public assistant, customer order portal and internal NEXUS must have separate prompts, authorisation boundaries and tool sets. Do not reuse a staff retrieval context for a customer chat.

## 9. ChatGPT Business, API and mailbox connections

ChatGPT Business is a staff workspace. The website uses its own server-side API integration and credentials. A Trello connection or mailbox app in ChatGPT is not automatically a credential/tool available to the website's OpenAI API assistant. Implement and authorise those separately; preserve provider scopes, staff permissions and company data policy.

Keep API keys and Trello/mailbox tokens server-only, with separate development/production settings. Decide which mailbox identity NEXUS may access; do not treat “all work email” as an instruction to expose every mailbox to every staff member. Store approved summaries/indexes only where needed, enforce permissions during retrieval and make deletion/revocation propagate.

## 10. Mailtrap delivery

Current adapter: `POST https://send.api.mailtrap.io/api/send`, server-side bearer token, configured sender/recipient and enquiry reply-to. It checks HTTP status AND `success:true` AND message IDs. Mark the result **accepted**, not delivered. Failures remain recorded for review; no silent success or uncontrolled duplicate retries.

Set `MAIL_PROVIDER=mailtrap`, `MAILTRAP_API_TOKEN`, `MAIL_FROM` (verified sender) and `ENQUIRY_EMAIL`. No token has been supplied and no live email was sent during development. The local sendmail option remains explicit (`MAIL_PROVIDER=sendmail`).

Phase 2 adds email-verification links, approval-needed notices, meaningful status changes and dispatch alerts. Never include financial data or public private-artwork URLs. Add template versioning, a durable outbox, event deduplication, preferences, bounce/suppression handling and provider delivery events. Do not email clients on every internal card move. Ambiguous timeouts require provider-log review before retry to reduce duplicate messages.

Official API reference: https://docs.mailtrap.io/developers/email-sending/transactional/send-transactional-email.md

## 11. Recommended priorities

1. **Data readiness:** stable order/customer IDs, board/list/field mapping, approved attachments and historical cleanup.
2. **Verified read-only client portal:** accurate current/past orders, ownership isolation and private artwork access.
3. **Versioned proof approvals and repeat requests:** separate new requests and production change controls.
4. **Mailtrap notifications and exception monitoring:** actionable milestones and reliable delivery feedback.
5. **NEXUS with individual staff access:** read-only sources and cited answers before write tools.
6. **Gallery and manual Studio:** curated real designs, templates and useful RFQ handoff.
7. **AI design generation:** introduce after production templates, review, rights and cost limits are established.

## 12. Phase 2 acceptance gates

- Customer A cannot list, view, download, approve or repeat Customer B's order, even with a known reference/file ID.
- Unknown reference/email receives the same outward response as a known one; tokens expire, are single-use and cannot be brute-forced cheaply.
- Financial fields, financial documents and raw internal text never enter the customer DTO, HTML, logs or notification payloads.
- Changed art/quantity creates an unapproved request; original approved order stays unchanged.
- Replayed webhooks and repeated submissions do not duplicate orders or notifications.
- Missing sync is visible; dates are labelled as requested, estimated or confirmed.
- Staff access can be revoked; NEXUS supplies genuine source references and cannot execute write actions without approval.
- Mailtrap accepted/delivered/bounced states are distinct; failed delivery does not erase the underlying enquiry.
- No private source or live customer data is included in public gallery samples or Git.

## Live board review

See TRELLO-WEBSITE-GAP-REVIEW.md for the24 October2026 read-only workflow review and implementation priorities. Source-specific client and staff data is intentionally omitted from public documentation.
