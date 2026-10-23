// Phase 2 boundary only. No Trello requests or customer endpoints are enabled.
// Input must be a staff-curated projection, NEVER a raw Trello card or description.
export const clientStages=['brief_received','artwork_review','awaiting_approval','approved','production','quality_check','ready_to_dispatch','partially_dispatched','dispatched','completed','on_hold','cancelled'];
const text=(value,max=250)=>typeof value==='string'?value.slice(0,max):'';
const count=value=>Number.isInteger(value)&&value>=0?value:null;
const rows=value=>Array.isArray(value)?value:[];
export function customerOrderView(order,customerId){
 if(!customerId||!order||order.customerId!==customerId||order.customerVisible!==true)throw new Error('Order not found');
 return {id:text(order.id),reference:text(order.reference),revision:text(String(order.revision)),product:text(order.product),quantity:count(order.quantity),sizeBreakdown:rows(order.sizeBreakdown).map(s=>({size:text(s.size,30),quantity:count(s.quantity)})),stage:clientStages.includes(order.stage)?order.stage:'status_unavailable',customerUpdate:text(order.customerUpdate,2000),updatedAt:text(order.updatedAt,40),confirmedDispatchDate:text(order.confirmedDispatchDate,40)||null,shipments:rows(order.shipments).filter(s=>s.customerVisible===true).map(s=>({carrier:text(s.carrier),trackingNumber:text(s.trackingNumber),dispatchedAt:text(s.dispatchedAt,40),quantity:count(s.quantity)})),artwork:rows(order.artwork).filter(a=>a.customerVisible===true&&a.approved===true).map(a=>({id:text(a.id),title:text(a.title),version:text(String(a.version)),mime:text(a.mime,100)})),canRequestRepeat:order.stage!=='cancelled'};
}
export const repeatTypes=['same','quantity','roster_sizes','artwork_revision','new_design'];
export function repeatRequest(source,customerId,input){
 const view=customerOrderView(source,customerId);
 if(!repeatTypes.includes(input.type)||!Number.isInteger(input.quantity)||input.quantity<1||input.quantity>1000000)throw new Error('Invalid repeat request');
 if(!['standard','urgent','event'].includes(input.urgency))throw new Error('Invalid timing request');
 if(typeof input.notes!=='string'||input.notes.length>6000)throw new Error('Invalid change notes');
 if(String(input.expectedRevision)!==view.revision)throw new Error('The source order has changed. Review the latest version first.');
 if(input.requestedDate&&(!/^\d{4}-\d{2}-\d{2}$/.test(input.requestedDate)||!Number.isFinite(Date.parse(input.requestedDate))||new Date(input.requestedDate).toISOString().slice(0,10)!==input.requestedDate))throw new Error('Invalid requested date');
 return {sourceOrderId:view.id,sourceOrderRevision:view.revision,sourceArtworkVersions:view.artwork.map(a=>({id:a.id,version:a.version})),customerId,type:input.type,quantity:input.quantity,urgency:input.urgency,requestedDate:input.requestedDate||null,notes:input.notes,status:'staff_review_required',createsNewOrder:false};
}
