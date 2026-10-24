## Production status — 24 October 2026

Live at https://csl-mfg.com, application v1.7.1. Public indexing enabled;24 public sitemap routes, Google/Bing verification tags, consent-controlled GA4, favicons and social metadata. Mike, CSL AI Assistant, uses Groq with a private server key and curated public CSL knowledge. NEXUS remains the internal CSL AI Agent with private-source connections pending.

Contact/RFQ have been tested through the live browser, with staff notification and customer acknowledgement received in Amit’s Gmail. Routing uses the user-confirmed Adam/Ben Gmail addresses; Amit copied. See docs/FINAL-VERIFICATION.md for references, reply behavior and remaining Phase2 scope. Real credentials and private recipient configuration are not in this repository.

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
- No runtime package dependencies, external font services or analytics trackers. Forms use private server storage; optional email/AI features use their configured APIs.

## Phase 2 provisions (v1.1)

- **Track your Order**: fictional current/past order dashboard, customer access preview and repeat/change/urgent request demonstrator. No live customer login or Trello order feed yet.
- **Jersey Gallery**: 12 original schematic concepts per sport, Rugby first, with sport filters and concept references carried into an RFQ. Not real customer designs or product photographs.
- **ASK NEXUS**: separate internal entry, server-verified access hash and 30-minute session, optional OpenAI text assistant, no work-email or Trello tools. Configure preview access with `npm run nexus:set-password`; the resulting `.env` is private and ignored by Git. Use individual staff authentication before connecting actual work data.
- **Mailtrap API**: preferred server-side notification adapter; sender, recipient and token remain deployment settings. Provider acceptance is recorded separately from delivery.
- **Phase 2 blueprint**: [detailed scope and acceptance gates](docs/PHASE-2-BLUEPRINT.md).

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

The API returns success only after the record and attachments are written. It does not falsely claim email delivery. The on-page success includes a reference. Set `MAIL_PROVIDER=mailtrap`, `MAILTRAP_API_TOKEN`, `ENQUIRY_EMAIL` and `MAIL_FROM` for Mailtrap API notifications. A configured sender domain is required. Alternatively, explicitly select `MAIL_PROVIDER=sendmail` and set `SENDMAIL_PATH`. Use a verified company recipient at deployment. Uploaded files stay private and are not attached to notifications.

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

NEXUS sessions require an essential authentication cookie. No staff code, password hash, real orders, customer data or API keys are committed. The requested short preview code is not suitable for protecting connected company sources.

## Version 1.2 — export buyers and broader industries
Design Gallery now provides 300 illustrative concepts across sports and business categories. Industry and export buyer pages, all 28 inventoried original-site photos, locally hosted Manrope fonts, stronger utility navigation and branded Mailtrap staff/customer email templates are included. See [discovery and positioning](docs/EXPORT-AND-DISCOVERY.md), [email activation](docs/MAILTRAP-SETUP.md), and [image provenance](docs/OLD-SITE-IMAGE-INVENTORY.json). Mailtrap credentials and live delivery verification remain pending; Phase 2 functionality remains labelled as preview/coming soon.

## Version 1.3 — realistic collection imagery and clear navigation
All 300 gallery concepts now use category-specific photorealistic 3D-style AI renders. The primary navigation has a high-contrast green background, bolder labels, current-page highlighting and larger mobile targets. Responsive preview checks cover 320/390/768/1440px. See [render provenance, generation brief and QA](docs/PHOTOREALISTIC-GALLERY.md).
