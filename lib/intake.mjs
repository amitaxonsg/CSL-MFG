import {mkdir,writeFile,readFile,rename,rm} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import {createHash,randomUUID} from 'node:crypto';
import {spawn} from 'node:child_process';
export class HttpError extends Error{constructor(status,message){super(message);this.status=status;}}
const fail=m=>{throw new HttpError(400,m);};
const field=(d,k,max=200,required=false)=>{if(d[k]!==undefined&&typeof d[k]!=='string')fail('Invalid '+k+'.');const v=(d[k]||'').trim();if(v.length>max||(required&&!v))fail('Please check '+k+'.');return v;};
export function validateEnquiry(d){
 if(!d||typeof d!=='object'||Array.isArray(d))fail('Invalid enquiry.');
 if(d.website)fail('Unable to submit this enquiry.');
 if(!['rfq','contact'].includes(d.type))fail('Invalid enquiry type.');
 if(d.consent!==true)fail('Please agree to the enquiry privacy notice.');
 if(typeof d.submissionKey!=='string'||!/^[-a-f0-9]{36}$/i.test(d.submissionKey))fail('Please reload the form and try again.');
 const record={type:d.type,name:field(d,'name',100,true),email:field(d,'email',200,true),company:field(d,'company',150,d.type==='rfq'),phone:field(d,'phone',50),message:field(d,'message',6000,true),consent:true,privacyNotice:'enquiry-v1'};
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(record.email)||/[\r\n]/.test(record.email))fail('Please enter a valid email address.');
 if(record.message.length<10)fail('Please add a little more detail to your message.');
 if(d.type==='rfq'){
  record.product=field(d,'product',100,true);record.country=field(d,'country',100,true);record.buyerType=field(d,'buyerType',100);record.deliveryDate=field(d,'deliveryDate',10);
  if(!/^\d{1,7}$/.test(String(d.quantity))||Number(d.quantity)<1||Number(d.quantity)>1000000)fail('Please enter a valid quantity.');record.quantity=Number(d.quantity);
  if(record.deliveryDate&&(!/^\d{4}-\d{2}-\d{2}$/.test(record.deliveryDate)||!Number.isFinite(Date.parse(record.deliveryDate))||new Date(record.deliveryDate).toISOString().slice(0,10)!==record.deliveryDate))fail('Please check your delivery date.');
 }else record.subject=field(d,'subject',150,true);
 if(d.files!==undefined&&!Array.isArray(d.files))fail('Invalid attachments.');
 if((d.files||[]).length>3)fail('A maximum of three files is allowed.');
 const files=(d.files||[]).map(f=>{
  if(!f||typeof f.name!=='string'||typeof f.type!=='string'||typeof f.data!=='string')fail('Invalid attachment.');
  if(f.name.length>200||!f.data||f.data.length>7*1024*1024||(f.data.length%4!==0||!/^[A-Za-z0-9+/]*={0,2}$/.test(f.data)))fail('Invalid attachment data.');
  const bytes=Buffer.from(f.data,'base64');if(bytes.toString('base64')!==f.data)fail('Invalid attachment encoding.');if(!bytes.length||bytes.length>5*1024*1024)fail('Each attachment must be between 1 byte and 5 MB.');
  const signatures={
   'image/jpeg':{ext:/\.jpe?g$/i,valid:bytes[0]===255&&bytes[1]===216&&bytes[2]===255,suffix:'.jpg'},
   'image/png':{ext:/\.png$/i,valid:bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])),suffix:'.png'},
   'image/webp':{ext:/\.webp$/i,valid:bytes.subarray(0,4).toString()==='RIFF'&&bytes.subarray(8,12).toString()==='WEBP',suffix:'.webp'},
   'application/pdf':{ext:/\.pdf$/i,valid:bytes.subarray(0,5).toString()==='%PDF-',suffix:'.pdf'}
  };const kind=signatures[f.type];if(!kind||!kind.valid||!kind.ext.test(f.name))fail('Use genuine JPG, PNG, WebP or PDF attachments.');
  return {originalName:f.name.replace(/[\x00-\x1f\x7f/\\]/g,'_'),mime:f.type,bytes,size:bytes.length,storedName:randomUUID()+kind.suffix};
 });
 const fingerprint=createHash('sha256').update(JSON.stringify(record));for(const f of files)fingerprint.update(f.originalName).update(f.mime).update(f.bytes);
 return {record,files,key:d.submissionKey,fingerprint:fingerprint.digest('hex')};
}
export async function atomicRecord(dir,record){const tmp=join(dir,'record.'+randomUUID()+'.tmp');await writeFile(tmp,JSON.stringify(record,null,2),{mode:0o600});await rename(tmp,join(dir,'record.json'));}
export async function saveEnquiry(valid,dataDir){
 const root=resolve(dataDir,'enquiries');await mkdir(root,{recursive:true,mode:0o700});
 const id=createHash('sha256').update(valid.key).digest('hex').slice(0,32);const dir=join(root,id);
 try{await mkdir(dir,{mode:0o700});}catch(e){if(e.code!=='EEXIST')throw e;let previous;try{previous=JSON.parse(await readFile(join(dir,'record.json'),'utf8'));}catch{throw new HttpError(409,'This enquiry is already processing. Please try again in a moment.');}if(previous.fingerprint!==valid.fingerprint)throw new HttpError(409,'This submission reference has already been used. Reload the form for a new enquiry.');return {record:previous,dir,duplicate:true};}
 const record={...valid.record,id,reference:'CSL-'+id.slice(0,12).toUpperCase(),createdAt:new Date().toISOString(),fingerprint:valid.fingerprint,notification:{status:'pending'},attachments:valid.files.map(({bytes,...f})=>f)};
 try{for(const f of valid.files)await writeFile(join(dir,f.storedName),f.bytes,{mode:0o600,flag:'wx'});await atomicRecord(dir,record);}catch(e){await rm(dir,{recursive:true,force:true});throw e;}
 return {record,dir,duplicate:false};
}
const emailValid=v=>typeof v==='string'&&/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(v);
export async function notifyEnquiry(saved,env=process.env){
 if(saved.duplicate)return;
 const {record,dir}=saved;const from=env.MAIL_FROM,to=env.ENQUIRY_EMAIL;
 if(!env.SENDMAIL_PATH||!to||!from){record.notification={status:'pending',reason:'Email delivery is not configured.'};await atomicRecord(dir,record);return;}
 if(!emailValid(from)||!emailValid(to)){record.notification={status:'failed',reason:'Invalid notification address configuration.'};await atomicRecord(dir,record);return;}
 const content=`From: ${from}\nTo: ${to}\nReply-To: ${record.email}\nSubject: ${record.reference} - CSL ${record.type==='rfq'?'RFQ':'enquiry'}\nMIME-Version: 1.0\nContent-Type: text/plain; charset=UTF-8\nContent-Transfer-Encoding: base64\n\n${Buffer.from(`New CSL website enquiry\n\n${JSON.stringify(record,null,2)}\n\nAttachments are in the private enquiry store. Use the enquiry CLI on the server. Do not serve the storage directory publicly.`).toString('base64').match(/.{1,76}/g).join('\n')}\n`;
 try{await new Promise((resolve,reject)=>{const child=spawn(env.SENDMAIL_PATH,['-t','-i'],{stdio:['pipe','ignore','ignore']});const timer=setTimeout(()=>{child.kill();reject(new Error('Mail delivery timed out.'));},15000);child.on('error',e=>{clearTimeout(timer);reject(e);});child.on('close',code=>{clearTimeout(timer);code===0?resolve():reject(new Error('Mail delivery failed.'));});child.stdin.on('error',()=>{});child.stdin.end(content);});record.notification={status:'sent',sentAt:new Date().toISOString()};}catch{record.notification={status:'failed',reason:'Mail delivery failed. Retry from the enquiry CLI.'};}
 await atomicRecord(dir,record);
}
