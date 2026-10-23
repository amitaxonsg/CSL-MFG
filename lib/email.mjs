export async function sendMailtrap({from,to,replyTo,subject,text},env=process.env,fetcher=fetch){
 if(!env.MAILTRAP_API_TOKEN)throw new Error('Mailtrap is not configured.');
 const response=await fetcher('https://send.api.mailtrap.io/api/send',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+env.MAILTRAP_API_TOKEN,'User-Agent':'CSL-MFG/1.1'},signal:AbortSignal.timeout(15000),body:JSON.stringify({from:{email:from,name:'CSL Manufacturing'},to:[{email:to}],reply_to:{email:replyTo},subject,text,category:'CSL Website Enquiry'})});
 const data=await response.json();
 if(!response.ok||data.success!==true||!Array.isArray(data.message_ids)||!data.message_ids.length)throw new Error('Mailtrap did not accept the message.');
 return {status:'accepted',provider:'mailtrap',messageIds:data.message_ids,acceptedAt:new Date().toISOString()};
}
