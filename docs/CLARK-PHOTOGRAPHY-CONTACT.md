# Clark, authentic photography and Contact — v1.4

- Home now leads with the original full-width CSL group photo; About uses it as its photographic hero too. The photo remains uncropped on phones so the full group is visible.
- Matching original CSL photographic strips follow introductions on products, industries and industry detail pages, gallery, export guide, fabrics, Studio, RFQ, FAQs and the Phase 2 order preview. Capabilities keeps its existing factory hero. Contact leads with location rather than a photo hero. Product detail pages retain relevant garment visuals; privacy and internal login remain focused utility pages.
- All 28 original photos remain displayed on their associated pages, including fabric samples. Inventory: OLD-SITE-IMAGE-INVENTORY.json.
- Additional company-published image: CSL's LinkedIn cover, downloaded 24 October 2026, shown on About with a visible source link. It is not represented as independently verified customer work.
  Source company page: https://www.linkedin.com/company/custom-sports-and-leisure-manufacturing-corp
  Cover source: https://media.licdn.com/dms/image/v2/D563DAQGnWetP-KvuMA/image-scale_191_1128/B56ZWIqBQwGUAg-/0/1741754476847/custom_sports_and_leisure_manufacturing_corp_cover?e=2147483647&t=MrZ0lg6-XMPUO6OeMpqUr8KF-2YuVC5yPPeu6veIiOw&v=beta
- Verified social: LinkedIn company profile links back to the original CSL website. Facebook and Instagram were not verified and were not invented.
- /clark-freeport explains airport/road access, business ecosystem, regional workforce, buyer visits and export planning. It links to RFQ and is included in sitemap, llms.txt, footer and utility navigation.
- Location research: https://lec.philippines.business/economic-zones/cdc and https://lec.philippines.business/economic-zones/ciac (reviewed 24 October 2026). No tax rate, exemption, delivery guarantee, certification or CSL incentive eligibility is asserted.
- Contact includes full original address and phone, Adam's supplied company email, verified LinkedIn, visit arrangements, private upload enquiry form and a consent-to-load Google location map. Open Google Maps to use available Street View coverage. Exact entrance/panorama has NOT been verified; do not claim an embedded factory walkthrough. A verified Google Street View share/embed link is needed to finish that request precisely.
- Only www.google.com is added to frame-src. Existing frame-ancestors, same-origin scripts and other security restrictions remain. The Google map is not requested until the visitor chooses Load Google Map. Privacy notice explains this.
- Mailtrap code and branded customer acknowledgement already exist. Production Email Sending API token remains required; sender domain verification and production delivery still need completion. No email sent during this update.
- Search indexing remains intentionally disabled during prelaunch review. Do not imply SEO publication is already enabled.

## Production verification — 24 October 2026

Deployed application v1.4.1, commit 3ca083157b4fb7271243e2a3d4684da3aa75b7c2, to /opt/csl-mfg. Home is the first desktop/mobile navigation link and uses the current-page highlight. Removed duplicate mobile Design Gallery link.

- All 21 automated checks passed locally and on German VPS.
- All 24 public sitemap routes returned HTTP 200 on production.
- /clark-freeport present in live sitemap.xml and llms.txt.
- Home group photo and Home navigation verified in live browser; desktop 1731px has no horizontal overflow.
- Phone viewport 390px: Home, Clark and Contact have equal client/scroll widths (375px with scrollbar); navigation opens and includes Home; Clark hero loaded. Contact upload form and Google map load button are present; clicking inserts the expected Google Maps iframe.
- Health endpoint OK after restart. csl.service, csl-mfg.service and Apache active. Restarted only csl-mfg; no server configuration or global software changes.
- Live homepage proof: screenshots/home-v1.4.1-live.jpg.

Remaining: production Mailtrap token and delivery test; verified exact factory Street View panorama/embed link; Phase 2 integrations; explicit launch/indexing decision. These are not represented as live services.

## v1.4.2 — authentic machine grids, Philexcel and Street View

- Home original-photo grid expanded to 3 with original CSL embroidery equipment (03).
- About expanded to 6 with original CSL printing (06) and knitting department (11). Capabilities expanded from 8 to 9 with embroidery (03), completing three rows. All original 28 images remain on their relevant pages; no generated equipment is presented as CSL-owned machinery.
- Clark hero now uses the Philexcel Business Park entrance image from the park's official website: https://philexcel.com.ph/6169ede9-7be2-40e4-8816-5e2d1901c04b.png . Optimized WebP; visible source credit links to https://philexcel.com.ph/ . Screenshot: screenshots/clark-philexcel-live.jpg.
- Fabrics hero now shows an original CSL fabric texture. Studio uses the original colour/print-planning image. Other page imagery retains original relevant team/factory/workmanship assets.
- The old website map marker (15.16827,120.565339) did not resolve to CSL Street View and was not reused. Found the verified Google Maps listing for Custom Sports And Leisure: address Unit 11a3 Philexcel, original website and phone match. Its Street View & 360 tab opens Google imagery from May 2024: panorama aqLiJjX4K_NE6vHifCakrw at 15.17246968545677,120.5279783131798, heading147.69229. Obtained the iframe URL from Google's Share → Embed a map UI. Contact now loads this exact panorama after Explore Street View; external button launches the same panorama. This resolves the earlier panorama blocker. No Maps API key required for this provided embed.
- Mailtrap check found token empty in the private .env; provider is mailtrap, permissions600. No token printed by the configuration check, no email sent, no claim of delivery readiness. Hidden terminal input prepared separately for user entry.
- All21 checks passed locally and on VPS; health OK, existing CSL and Apache remain active. Only csl-mfg restarted.
