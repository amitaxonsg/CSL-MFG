// Photorealistic AI-generated concepts, not photographs of manufactured customer orders.
export const renderCollections={
 'Rugby':'rugby','Football':'football','Basketball':'basketball','Cricket':'cricket','Netball':'netball','Volleyball':'volleyball','Hockey':'hockey','AFL':'afl','Rugby League':'rugby-league','Baseball':'baseball','Softball':'softball','Cycling':'cycling','Running':'running','Esports':'esports',
 'Hotels & Resorts':'hotels-resorts','Restaurants & Cafés':'restaurants-cafes','Bars & Entertainment':'bars-entertainment','Corporate & Office':'corporate-office','Retail & Private Label':'retail-private-label','Manufacturing & Factories':'manufacturing-factories','Logistics & Transport':'logistics-transport','Trades & Service Teams':'trades-service','Schools & Universities':'schools-universities','Events & Exhibitions':'events-exhibitions','Community & Charity':'community-charity'
};
export function designRender(collection,index=0){
 const slug=renderCollections[collection];if(!slug||!Number.isInteger(index)||index<0||index>11)throw new Error('Unknown design concept');
 return `<div class="render-tile render-cell-${index}"><img src="/assets/design-renders/${slug}.webp" alt="${collection} — photorealistic 3D apparel concept ${String(index+1).padStart(2,'0')}, AI-generated design inspiration" width="1536" height="2048" loading="lazy" decoding="async"></div>`;
}
