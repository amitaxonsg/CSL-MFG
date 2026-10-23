# CSL Manufacturing

Full-width, responsive manufacturing website based on the approved CSL concept: warm white, black, navy product imagery and lime accents. Original CSL logo retained. Prepared for the existing German server; nothing is deployed automatically.

## Included

- Server-rendered homepage, four product detail pages, product index, capabilities, fabrics, story, FAQs, RFQ, contact, privacy and Phase 2 CSL Studio page.
- Mobile navigation, accessible expandable FAQs, responsive layouts, keyboard access and reduced-motion support.
- RFQ and general enquiry forms with optional artwork/concept attachments (three genuine JPG, PNG, WebP or PDF files, up to 5 MiB each).
- Private server persistence, file signature checks, random stored filenames, duplicate-submission protection, origin checks and basic rate limiting.
- Optional email notification using the server's local sendmail-compatible MTA. Pending/failed notifications remain recorded and can be retried with the operator CLI.
- CSL assistant with useful guided responses now; optional server-side OpenAI Responses API connection later. API errors fall back to guided responses.
- SEO metadata, canonical URLs, Organization JSON-LD, sitemap, robots controls, `llms.txt`, social metadata and legacy-page redirects.
- No runtime package dependencies, external font services, analytics trackers or hosted backend dependency.

## Run locally

Requires Node.js 22 or newer. No `npm install` or frontend build is required.

```bash
cp .env.example .env
npm start
```

Open `http://localhost:3000`. For development: `npm run dev`.

```bash
npm run check
npm test
```

## German server

See [deployment guide](docs/DEPLOYMENT.md). Run the app as the CSL account, on a loopback port, behind the existing OpenLiteSpeed/Apache site configuration and HTTPS. **Do not introduce NGINX or modify other accounts.** Confirm the domain, account, existing stack and free port before changing the server.

## Forms and private enquiries

Set `DATA_DIR` to an absolute private path outside `public_html`, the checkout, and backups intended for public access. The default development path is `./var`, excluded from Git. Only `public/` assets and defined page routes are served. The server never provides an uploaded-file URL.

The API returns success only after the record and attachments are written. It does not falsely claim email delivery. The on-page success includes a reference. Add `SENDMAIL_PATH`, `ENQUIRY_EMAIL` and `MAIL_FROM` to enable staff notifications; use a verified company recipient at deployment. Uploaded files stay private and are not attached to notifications.

Operator commands, run from the checkout:

```bash
node --env-file-if-exists=.env scripts/enquiries.mjs list
node --env-file-if-exists=.env scripts/enquiries.mjs show ENQUIRY_ID
node --env-file-if-exists=.env scripts/enquiries.mjs retry-notification ENQUIRY_ID
```

IDs come from `list`. `show` gives the private attachment directory. No public admin dashboard is included. Monitor disk space and pending notifications, back up the private store, and apply an agreed retention policy. PDF uploads remain untrusted documents; staff should inspect attachments using their usual protected workflow.

## Connect OpenAI later

In the **server-only** `.env`, set `OPENAI_API_KEY` and `OPENAI_MODEL` to the approved account's key and supported model ID, then restart. Neither value is bundled into browser assets. Leave either blank for guided mode. No real API call was made during development.

The adapter uses `POST https://api.openai.com/v1/responses`, approved company knowledge, bounded recent history, `store:false`, timeout handling and no external tools. It does not send enquiry uploads to OpenAI. AI answers remain advisory, with pricing/delivery confirmation routed to staff. See [AI and Studio roadmap](docs/AI-STUDIO.md).

## Content and launch status

`SEARCH_INDEXING=false` by default. Keep it false on staging. Set the production `SITE_URL`, complete content/commercial/privacy approval, and enable indexing only for the real domain.

Exact minimums, lead times, production capacity, founding year and certificate/duty claims were inconsistent in the source material; this version uses qualified language instead of inventing figures. Public content and the assistant's knowledge live in `lib/content.mjs`; page templates are in `lib/pages.mjs`.

Product images are AI-generated illustrative concepts, not photographs of actual CSL stock. The factory image and logo came from CSL's existing website. Replace concept images with approved product photography when available. See [asset provenance](docs/ASSETS.md).

## Verification

Automated tests cover public pages, HTTP routes, enquiry persistence and attachments, invalid inputs, idempotency, private-path protection, redirects and guided/AI-adapter fallback behaviour. Live OpenAI, mail delivery, production domain/proxy configuration and server backups require deployment verification.
