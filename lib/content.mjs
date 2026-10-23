export const company = {
  name: 'Custom Sports and Leisure Manufacturing Corp.', short: 'CSL',
  phone: '+63 45 499 5422', tel: '+63454995422',
  address: 'Unit 11A3 Philexcel Business Park, M.A. Roxas Highway, Clark Freeport Zone, Angeles City, Pampanga 2023, Philippines',
  summary: 'A family-owned manufacturer in the Philippines specialising in custom sublimated sportswear, cut-and-sew apparel, knitwear and performance socks.'
};
export const products = [
 {slug:'sublimated-teamwear', name:'Sublimated Teamwear', label:'01 / TEAM & PERFORMANCE', image:'teamwear.webp', summary:'Your colours. Your identity. Made for the team.', text:'Create a cohesive team identity with custom sublimated jerseys, training tops and coordinated apparel. Share your sport, intended use and artwork so our team can help specify the right construction.', features:['Custom colours and artwork','Names, numbers and team identity','Fabric and fit selected around your brief']},
 {slug:'corporate-leisure', name:'Corporate & Leisure', label:'02 / WORK & EVERYDAY', image:'polo.webp', summary:'A considered look, wherever your brand goes.', text:'Bring your identity to polo shirts and leisure apparel for staff, events and everyday wear. We will work through the fabric, decoration and garment details with you.', features:['Polo shirts and leisure apparel','Embroidery and print options','Coordinated brand presentation']},
 {slug:'knitwear', name:'Knitwear', label:'03 / HERITAGE & CRAFT', image:'rugby.webp', summary:'Classic character. Carefully constructed.', text:'Explore knitted rugby jerseys, beanies and scarves. From a traditional sporting look to a distinctive brand collection, start with the design, colour palette and intended use.', features:['Knitted rugby jerseys','Beanies and scarves','Construction and finishing discussed with your brief']},
 {slug:'performance-socks', name:'Performance Socks', label:'04 / EVERY DETAIL', image:'socks.webp', summary:'Complete the kit, down to the last detail.', text:'Custom athletic socks bring the whole kit together. Tell us the sport, sizing, colour palette and design direction, and we will help establish a suitable production specification.', features:['Custom athletic sock designs','Knitted and sublimated options','Team colours and coordinated details']}
];
export const capabilities = [
 ['Sublimation','Colour and artwork integrated into your sportswear design.'],
 ['Cut & sew','Garment construction shaped around your product requirements.'],
 ['Embroidery & tackle twill','Texture, dimension and a considered finishing touch.'],
 ['Screen printing','A further decoration option for suitable apparel.'],
 ['Knitting','Specialist production for rugby jerseys, socks and accessories.'],
 ['Quality control','Checks through fabric, printing, sizing, sewing and packing.']
];
export const faqs = [
 ['What does CSL manufacture?', 'We specialise in sublimated sportswear, cut-and-sew apparel, corporate and leisurewear, knitwear and performance socks. Send your product brief so we can confirm the right manufacturing approach.'],
 ['What is the minimum order?', 'Minimums depend on the product, design, colourway and whether it is a new order or reorder. Tell us your estimated quantity in the RFQ form and our team will confirm the applicable minimum.'],
 ['How long does production take?', 'Timing depends on the product, order size, available production slots and final artwork approval. Include your required delivery date and destination in your enquiry. Our team will confirm production and shipping separately.'],
 ['Can I send my own logo or a rough concept?', 'Yes. Upload a logo, reference image or concept with your enquiry. JPG, PNG, WebP and PDF files are accepted, up to 5 MB each, with a maximum of three files. You can also describe your idea without uploading a file.'],
 ['Do you ship internationally?', 'We can discuss international shipping as part of your quotation. Include your destination country and delivery requirements so the team can confirm the available options and terms.'],
 ['Can I design in CSL Studio?', 'CSL Studio is planned for Phase 2. It will bring garment selection, logo uploads and AI-assisted concept design into one enquiry journey. For now, send your concept through our RFQ form.'],
 ['Can I order one bespoke shirt?', 'CSL focuses on manufacturing projects rather than one-off bespoke garments. Please share the intended product and quantity so the team can confirm whether the project is a fit.']
];
export const publicKnowledge = `${company.name}. ${company.summary}\nLocated at ${company.address}. Telephone ${company.phone}.\n${faqs.map(([q,a])=>q+' '+a).join('\n')}\nCSL Studio is coming soon, Phase 2, and is not available now. Prices, exact minimums, delivery commitments, certification status and duty eligibility require confirmation from the CSL team. Do not invent these. RFQ page: /rfq. Contact page: /contact.`;
