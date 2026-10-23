# German server deployment — account-scoped

This repository is ready to pull. The server itself has not been accessed or changed.

## Before deployment

Confirm the CSL domain, cPanel/Linux account, existing Apache/OpenLiteSpeed configuration, installed Node version and an unused loopback port. Keep all work in the CSL account. Preserve the current site and DNS until staging is approved. Do not install NGINX or alter any other account.

## Install

1. Under the confirmed account, clone `https://github.com/amitaxonsg/CSL-MFG.git` into `/home/CSL_ACCOUNT/apps/CSL-MFG`, outside `public_html`.
2. Verify Node.js 22+ (`node --version`). This project has zero runtime dependencies and needs no build or `npm install`.
3. Copy `.env.example` to `.env`; set permissions to `600`.
4. Set `HOST=127.0.0.1`, an available `PORT`, and `SITE_URL=https://THE_CONFIRMED_DOMAIN`.
5. Create `/home/CSL_ACCOUNT/private/csl-mfg` owned by the account with mode `700`. Set its absolute path as `DATA_DIR`.
6. Keep `SEARCH_INDEXING=false` during review. Leave OpenAI variables blank until the approved key and model are available.
7. Configure `MAIL_PROVIDER=mailtrap`, `MAILTRAP_API_TOKEN`, `MAIL_FROM` using a verified sending domain and `ENQUIRY_EMAIL`. The optional local MTA route requires explicit `MAIL_PROVIDER=sendmail` and `SENDMAIL_PATH`. Test delivery to the verified company inbox. Unconfigured mail leaves enquiries safely stored with notification status pending.
8. Run `npm run check` and `npm test`.
9. Adapt `deploy/csl-mfg.service.example` with the verified account and absolute Node binary path. Install and start that specific service. If the host already provides an account-scoped Node process manager, use that instead.
10. In the existing web stack's **CSL virtual host only**, proxy the domain to the selected loopback port. Route all page and `/api/` requests to Node; do not expose the checkout or private storage as the document root. No NGINX configuration is needed.
11. Allow at least a 22 MiB JSON request body and a 60-second request timeout on this virtual host. The app's limits remain three files of 5 MiB each. Have the proxy overwrite forwarding headers; enable `TRUST_PROXY=true` only for a trusted loopback proxy. Otherwise leave it false (shared proxy-level limits may apply).
12. Confirm valid HTTPS. With the production domain in place, test `/health`, page deep links, image loads and a real RFQ with an attachment. Verify the saved file, reference and email delivery independently.

## Launch checks

- Confirm factual copy, current business address/phone, product scope, privacy notice and authorised imagery.
- Verify tablet and mobile layouts, form errors, actual submit success, chatbot handoff, and Phase 2 labels.
- Confirm real mail delivery, pending-notification monitoring, disk-space monitoring and persistent backups outside the checkout.
- Restrict the Node port to loopback; external access should be through HTTPS only.
- Check redirects from `/history`, `/factory` and `/general-information`.
- Once approved, set `SEARCH_INDEXING=true`, restart the app, verify `/robots.txt`, `/sitemap.xml` and canonical domains, and submit the sitemap in Search Console/Bing.
- Check the public repository contains no `.env`, uploaded files, customer enquiries or API keys.

## Updates

From the confirmed checkout, `git pull --ff-only`, run checks/tests, then restart only the CSL service. Private data lives outside the checkout and must survive releases. Keep a record of the previous commit for rollback. Do not reset or clean the private store.

## Backups and operations

Back up `DATA_DIR` separately, encrypted and accessible only to authorised staff. Set retention and deletion procedures before launch. Use `scripts/enquiries.mjs list` to inspect pending/failed notification states and `retry-notification ID` after resolving delivery configuration. A local MTA accepting an email does not guarantee inbox delivery; verify the recipient inbox and server queue during UAT.

The current rate limiter is process-local. Use one Node instance for this version. If scaling across workers, add shared rate limiting and storage coordination first. This version intentionally provides no public enquiry admin or file download endpoint.

## Optional container

`Dockerfile` is provided. Publish the container port to loopback only, mount `/data` to durable account-scoped private storage and supply environment variables securely. Ensure the volume is writable by the container's non-root `node` user. This is an alternative to the systemd setup, not an additional requirement.

## NEXUS preview access

Run `npm run nexus:set-password` interactively on the confirmed account. It stores only a salted hash in the ignored, mode-600 `.env`. Restart the app. Production HTTPS adds the Secure cookie flag; sessions are memory-only and expire after 30 minutes or restart. Short/shared codes must be replaced with individual staff authentication before connecting private Trello or email records. No such sources are connected by this release.

## Phase 2 preview pages

`/track-order` and `/gallery` contain explicitly fictional/sample information. `/nexus` is excluded from the public sitemap and marked noindex, but this is not authentication: its API independently enforces staff sessions. Live customer portal authentication and Trello synchronisation remain future work; do not connect real orders to the demo page. Read `docs/PHASE-2-BLUEPRINT.md` before enabling customer access.
