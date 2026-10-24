# Photorealistic gallery — version 1.3

## Result
All 25 collections now have their own set of 12 photorealistic AI-generated apparel concepts (300 displayed designs). The gallery layout, category selector, enquiry references and Phase 2 Studio link are retained. These are visual proposals, not photos of manufactured CSL customer orders, editable garment patterns, technical packs or interactive 3D models.

Business categories use distinct relevant garments: hospitality shirts, concierge waistcoats and housekeeping tunics; restaurant and bar aprons/service shirts; corporate polos and business shirts; private-label casualwear; non-protective industrial staff/work shirts; logistics uniforms; trade/service tops; campus apparel; event uniforms; community apparel. All manufacturing suitability is subject to CSL review. No protective performance or certification is implied.

Sports use category-appropriate cuts: rugby and rugby league, football, basketball, cricket, netball, volleyball, field hockey, Australian rules, baseball, softball, cycling, running and esports.

## Generation workflow and prompt set
Built-in image generation was used, with one independently generated collection image for each category. Files are saved in public/assets/design-renders/ and collection/source mappings are in DESIGN-RENDERS-SOURCES.json. Original generated PNGs remain in the task's generated_images directory. Project WebP copies are optimised for website use.

Common generation prompt:
> Create one premium apparel product render atlas: exactly 12 distinct products in a precise 3-column by 4-row grid, portrait 3:4. Each equal square cell contains one fully visible centred garment with generous equal padding. Seamless pale warm-grey studio backgrounds and no dividing lines. Photorealistic 3D ghost-mannequin product photography, front three-quarter view, believable weave or mesh, seams, stitching, collars, plackets, fabric gravity, folds and soft studio shadows. Each cell must have a different design, not only a recolour. No humans, skin, visible mannequin, props, hangers, text, numbers, logos, watermarks, badges or certification marks. Never flat vector illustration. Keep each garment completely within its cell.

Category-specific direction:
- Hotels/resorts: reception shirts, concierge overshirts, resort polos, housekeeping tunics, service waistcoats and hospitality aprons; cream, forest, sand, slate, burgundy.
- Restaurants/cafés: chef/service shirts, barista aprons, bistro waistcoats and short-sleeve kitchen concepts; linen, espresso, sage, cream, rust.
- Bars/entertainment: bartender shirts, denim service shirts, camp collars, waistcoats, premium aprons; charcoal, oxblood, indigo, forest, copper.
- Corporate/office: smart polos, business-casual shirts and tailored light overshirts; navy, blue, cream, teal, charcoal.
- Retail/private label: elevated T-shirts, polos, overshirts and casual knit-like tops, including distinctive garment silhouettes and finishing.
- Manufacturing: ordinary non-protective pocketed work shirts, staff polos, overshirts; graphite, slate, navy, khaki, orange accents, no safety markings.
- Logistics/transport: driver shirts, warehouse overshirts and structured staff polos with practical pockets; navy, grey, petrol, controlled bright panels.
- Trades/service: ordinary utility shirts and practical maintenance polos; navy, olive, charcoal, tan, copper, no protective claims.
- Schools/universities: campus polos, organisation T-shirts and activity tops; no real crests or school identities.
- Events/exhibitions: distinctive staff polos, crew T-shirts, host shirts and event overshirts; memorable colour blocks without sponsor marks.
- Community/charity: volunteer T-shirts, comfortable polos and recreation tops; welcoming colour palettes, no charity identities.
- Rugby: robust athletic short-sleeve bodies, rugby collars, hoops, chevrons, diagonal cuts and original panels.
- Football: lightweight athletic short-sleeve tops, crew/V necks, jacquard-like texture, restrained stripes and original geometric graphics.
- Basketball: sleeveless tanks with authentic armholes and mesh, ribbed edging, distinct court colour blocks.
- Cricket: classic off-white long/short sleeve collared shirts and modern coloured cricket polos.
- Netball: athletic sleeveless playing dresses and netball tops with streamlined armholes and original side panels.
- Volleyball: short-sleeve and sleeveless performance cuts, mesh zones, dynamic original team layouts.
- Hockey: field-hockey athletic shirts, modern polo/crew necks and refined club stripes; not ice-hockey sweaters.
- AFL: authentic sleeveless guernseys with original chevrons, sashes and panels, no real club identities.
- Rugby league: V/low-profile collars, athletic bodies, original chevrons, shoulder bands and contrast sleeves.
- Baseball: button-front jerseys, raglan sleeves, piping, pinstripes and restrained colour panels; no lettering or numbers.
- Softball: athletic softball cuts, button-front, henley and V-neck tops, contrasting sleeves and piping.
- Cycling: fitted jerseys, full front zip, standing collar, dropped-back hem and different road-cycling panels.
- Running: lightweight singlets, race vests and short-sleeve tops, mesh zones and different geometric layouts.
- Esports: short-sleeve gaming jerseys, crew/V/polo necks and original controlled gradients/geometric panels; no sponsors or player names.

## Navigation and responsive checks
Primary navigation uses a dark green background, bold white text and lime current-page highlight. Mobile has a larger touch menu with 21–22px link text, scrollable content and hidden floating chat launchers while open.

Preview checks at iframe viewport widths 320, 390, 768 and 1440 pixels found no horizontal page overflow. Phone/tablet menu open and close controls worked. Desktop displayed the full high-contrast navigation; phone links had approximately 54px or greater heights. Category photos loaded and tile crops showed individual garments. Twenty automated tests passed, including presence/signatures for all 25 render files and all 300 image tiles.

Production deployment and live screenshot verification remain separate steps recorded in GERMAN-DEPLOYMENT.md after completion. No global server changes are required for this release.
