# Production verification — 24 October 2026

## Live website

v1.7.1 at https://csl-mfg.com. Changes confined to /opt/csl-mfg application and its private .env. No NGINX, server upgrades, Apache configuration changes or other-site changes. Existing CSL service and Apache remained active at deployment checks. Health endpoint OK.

- All24 public pages returned200, unique titles, Google/Bing verification, canonical metadata and one H1 each.
- Sitemap24 routes; lastmod and original photo references. robots.txt allows public crawling, disallows /api/ and /nexus. NEXUS noindex, excluded from sitemap and Analytics.
- /llms.txt and /llms-full.txt return200; public company facts, actual feature status, buyer answers and page links. No private records or invented endorsements.
- Google verification G5CV3ww0bp23InEYrbFmAh2-zNHDCGCt0qxma1nV4Sw; Bing C467149C93C89FD7BB78443FEA4F7BF9 installed in SSR heads.
- GA4 G-BFEGVT265Y installed with consent choice, no ad features. Verified Google tag script loads once after allowance. Successful Contact/RFQ submissions trigger generate_lead with form_type only. Query strings, form contents, customer details and artwork are excluded from custom events. Owner should confirm Realtime/DebugView reporting; collection is not a ranking guarantee.
- Original CSL logo used for32/192/512px icons, Apple icon and web manifest; assets return200. OG/Twitter title/description/image tags use relevant page images. No invented social handles.
- Contact Street View directly visible; full address/phone/current configured email and LinkedIn shown. Contact image grid3; Home3; About6; Capabilities9. All28 original images remain, including fabrics.
- Established2006, earlier family manufacturing heritage1988, based on original CSL History. These are distinguished in footer/About/FAQs/schema/email.

## Live forms and email

Contact test reference CSL-O-20261024-28D2233CBB83.
RFQ test reference CSL-O-20261024-3B34B6F275CA.

Both submitted successfully in the browser. Staff notification and separate customer acknowledgement arrived in Amit’s Gmail. Staff To contains the verified Adam/Ben Gmail addresses, CC Amit. Customer test To Amit; CC Adam/Ben (Amit deduplicated from CC because he is already To). From is amit@axon.com.sg with CSL company display name. Reply-To on customer acknowledgement Adam; Reply All retains copies; Reply to CSL button addresses both CSL contacts with Amit copied. Received MIME verified logo, white background, footer, reference and reply link. Delivery into Adam/Ben inboxes cannot be independently asserted from Amit’s mailbox alone.

Online references CSL-O-YYYYMMDD-12HEX identify an enquiry, not a PO/production confirmation. Philippine local date. Existing references retain idempotent retry behavior. Raw artwork stays private. No historical enquiry replayed.

## Mike, CSL AI Assistant

Groq live; server-side key loaded without printing it. Model availability checked with the same Node fetch runtime used by the app; openai/gpt-oss-120b selected. OpenAI adapter retained as an alternative. No raw Trello/email/private data tools added.

- Real AI answer tested for60 rugby jerseys/Australian buyer: relevant preparation, manufacturing advice, RFQ link and concise follow-up.
- Real AI order/email escalation test correctly states no live order access/no autonomous sending. Offers draft/Contact/Email Adam.
- Real heritage/location answer matches2006/1988/Clark facts.
- Formatting uses safe DOM text, paragraphs, lists, bold and same-site links; no model HTML injection.
- Prepare an enquiry opens Contact with a temporary draft of recent visitor questions. Verified draft populated, original question retained and no form auto-submission.
- Mobile390px: panel fits inside375px client width (left14/right361); no document overflow. Desktop screenshot: screenshots/mike-live.jpg.
- NEXUS unauthorised API access returns401. Automated login/session/logout boundaries tested with isolated fixtures. No production credentials entered into public chat.
-26 automated tests passed, including uploads/private storage, notification idempotence, reply routing, AI adapters/fallback, discovery schema, original imagery and phase2 boundaries.

## Remaining scope

Phase2 Studio design tools, verified client accounts, live Trello sync/approvals/shipments and private NEXUS integrations remain coming soon. Owner verification and sitemap submission in Google Search Console/Bing, GA4 reporting confirmation and any final commercial-content approvals remain operational steps. Search inclusion/recommendations are not guaranteed by tags, schema or llms files.
