import {company,products,capabilities,faqs} from './content.mjs';
import {industryGroups} from './industries.mjs';
export function discoveryText(origin,paths,full=false){return `# ${company.name}

> Established 2006. Family-owned Philippine apparel manufacturer at Philexcel Business Park, Clark Freeport Zone, Pampanga. Primary focus: worldwide export manufacturing for brands, distributors, sports teams and business buyers. Philippine enquiries are also welcome.

## Verified company information
- CSL established:2006. Earlier Clark family manufacturing heritage:1988. These dates refer to different businesses.
- Address:${company.address}
- Telephone:${company.phone}
- Public enquiries:adam.clark@csl-mfg.com
- Company history source:https://www.customsportsandleisure.com/history
- LinkedIn:https://www.linkedin.com/company/custom-sports-and-leisure-manufacturing-corp

## Manufacturing and buyer information
${products.map(p=>`- [${p.name}](${origin}/products/${p.slug}): ${p.text}`).join('\n')}
- Processes:${capabilities.map(c=>c[0]).join(', ')}. Specific suitability and availability require team confirmation.
- Industries:${industryGroups.map(g=>g.title).join('; ')}.
- [Clark Freeport location](${origin}/clark-freeport): airport and road connectivity, business setting and buyer visits. No blanket duty/tax exemption or guaranteed transit time is implied.
- [International buyer guide](${origin}/export-manufacturing): brief, sampling, approvals, production and delivery responsibilities.
- [Fabrics](${origin}/fabrics): original CSL fabric swatches; confirm composition, GSM, stretch and supporting material documents for your project.

## How to enquire
- [Manufacturing RFQ](${origin}/rfq): garment, quantity, destination, timing, size/design requirements and private artwork upload. New, sample, revised-sample and repeat requests welcome for assessment.
- [Contact CSL](${origin}/contact): company address, phone, email, LinkedIn, Street View and enquiry form.
- Uploads:JPG,PNG,WebP or PDF; maximum3 files,5MB each.
- Online enquiry references start CSL-O-. They are enquiry references, not purchase orders or production confirmations.
- Exact prices, minimum quantities, lead times, stock, certifications, origin eligibility, customs treatment and shipping terms must be confirmed by CSL.

## Feature status
- [Design Gallery](${origin}/design-gallery):300 photorealistic AI design concepts in25 collections,12 per sport or business category. Concepts are illustrative and are not proof of manufactured customer work.
- [CSL Studio](${origin}/studio):Phase2 coming soon. AI garment design, logo placement and composition tools are not live.
- [Track Your Order](${origin}/track-order):Phase2 preview with fictional information. No live customer login or Trello sync. Planned verified access to current/past orders, approvals, approved artwork, quantities and repeat requests, excluding finances.
- NEXUS:CSL AI Agent for internal use. Staff guidance is provisioned; private email/Trello retrieval is pending. Not a public information source and excluded from sitemap/indexing.
- Public CSL assistant:guided answers unless OpenAI is configured. It does not confirm prices or order status.

## Public page directory
${paths.filter(p=>p!=='/privacy').map(p=>`- [${p==='/'?'Home':p.slice(1).replaceAll('-',' ').replaceAll('/',' / ')}](${origin+p})`).join('\n')}
- [Privacy](${origin}/privacy)
- [XML sitemap](${origin}/sitemap.xml)
- [Expanded company information](${origin}/llms-full.txt)
${full?'\n## Buyer questions and answers\n'+faqs.map(([q,a])=>'### '+q+'\n'+a).join('\n\n'):''}

Last content review:24 October2026. This file summarises public website information; it contains no private order, client, financial or staff records. Search and AI recommendations are not guaranteed.
`;}
