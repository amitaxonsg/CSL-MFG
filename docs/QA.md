# Verification record

## Completed

- Node syntax checks for server, intake, templates and browser script.
- Eight automated tests covering all public routes, metadata/landmarks, enquiry validation, attachment signatures and limits, private storage, duplicate submission handling, notification-pending behaviour, legacy redirects, wrong-origin rejection, guided answers, mocked OpenAI request contract and upstream failure fallback.
- Browser desktop inspection of the homepage and RFQ.
- Browser RFQ submitted using synthetic `example.com` details; successful on-page saved reference observed.
- Browser assistant minimum-order question returned the intended qualified answer and form handoff.
- Product assets encoded as WebP; original CSL logo retained.
- Responsive CSS includes desktop, tablet and small-phone layouts. Separate real-device/mobile browser UAT remains a deployment check.

## Not yet connected or verified

- No OpenAI key supplied; no live API call or model account verification.
- No production email recipient/sender/MTA configured; no email delivery claimed.
- German server, confirmed account/domain, HTTPS proxy, process manager, disk monitoring and backups are not yet configured.
- Source content and privacy/commercial terms need CSL approval before public indexing.
- Product photographs are illustrative concepts pending approved actual photography.

The first HTTP preview exposed a client UUID compatibility issue. A secure-random fallback was added, forms explicitly use POST even when JavaScript fails, and script/style cache revalidation/versioning was added. Successful browser submission was repeated after these fixes.
