# Website gap review — 24 October 2026

Reviewed the signed-in CSL Order Management board read-only. No cards changed. This document intentionally omits customer names, order references, staff names, artwork, comments and attachment URLs.

## Observed workflow and website changes

| Board evidence | Website response |
|---|---|
| Intake and multiple approval steps | Keep enquiries separate from confirmed orders; add sample and revised-sample enquiry options |
| Pattern work, template preparation, digitising and knitting programming | Describe sample development and specification review, without promising every process for every garment |
| Sample printing, revisions, sample checking, digital approval and pre-production samples | Phase 2 approval centre with artwork versions, sample feedback and staff-controlled sign-off |
| Knitting, cutting, embroidery, sublimation, heat press, laser, sewing and transfer work | Extend manufacturing process copy with qualified sampling, transfer and laser enquiries |
| QC, completed QC/packing, grouped dispatch waiting and shipped | Distinguish QC, packing, ready for dispatch, waiting for consolidated shipment and dispatched; no automatic delivered status |
| Repeats, added uniforms and sample requests | RFQ original order/PO reference, sample type and changed-size/design/quantity options |
| Hold list and material-related labels | Phase 2 customer-safe action-needed / on-hold updates; staff curates reasons, not raw labels/comments |

The reviewed card exposes quantity, client name, construction and production-approval reference fields. These are not sufficient identity/authentication evidence. Phase 2 still needs verified registered customer contacts, stable account/order associations, artwork visibility permissions, date semantics and list/custom-field IDs. A display-name match must never unlock data.

## Added in v1.4.3

Contact Us appears in the main desktop and mobile navigation (previously mobile-only and footer). Active Contact page highlighted. Menu breakpoint expanded to1440px to allow the extra desktop item without crowding. RFQ original order reference is validated, stored and included in both staff/customer branded email summaries. Product range discussion covers coordinated garments and sampling without making unsupported stock/MOQ claims. Track Order adds clearly marked Phase 2 approval, hold/action-needed, grouped shipment and repeat-request provisions.

## Priorities still outstanding

1. Mailtrap production token, sender-domain verification and authorised delivery test. Do not replay historical enquiries to staff without review.
2. Trello integration with verified customer access, staff-approved field/stage mapping, webhooks plus reconciliation, staleness state and audit logs. Trello is reviewed manually here; the public website has no live Trello connection.
3. Approval centre: approved/rejected/request-changes events, version locking and pre-production sample approval. A request never silently changes a running order.
4. Shipment groups and line quantities for partial/consolidated dispatches. Internal due dates are not arrival promises.
5. Multiple authorised contacts per client business, permission revocation, current/past order search and customer-safe issue follow-up.
6. Public content: approved case studies, real finished garment photography and supported fabric/compliance documents supplied by CSL. Never publish private Trello artwork, customer names or logos as a public portfolio without clearance.
7. Launch: final contact/claims review, mail delivery test, accessibility/mobile pass, then explicit indexing switch and search-console/sitemap submission. No SEO/AEO/GEO result guarantee.
8. Internal NEXUS: individual staff identity and roles before private Trello/email access; the shared preview code is not a production staff identity system.
