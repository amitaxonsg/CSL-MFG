// Operator-only CLI. Never expose this script or DATA_DIR as a web endpoint.
import {readdir,readFile} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import {notifyEnquiry} from '../lib/intake.mjs';
const root=resolve(process.env.DATA_DIR||'./var','enquiries');
const [command='list',id]=process.argv.slice(2);
if(command==='list'){
 let dirs=[];try{dirs=await readdir(root);}catch(e){if(e.code!=='ENOENT')throw e;}
 for(const dir of dirs){if(!/^[a-f0-9]{32}$/.test(dir))continue;try{const r=JSON.parse(await readFile(join(root,dir,'record.json'),'utf8'));console.log(JSON.stringify({id:r.id,reference:r.reference,date:r.createdAt,type:r.type,name:r.name,company:r.company,notification:r.notification.status}));}catch{console.error('Unreadable enquiry record:',dir);}}
}else if(['show','retry-notification'].includes(command)&&/^[a-f0-9]{32}$/.test(id||'')){
 const dir=join(root,id),record=JSON.parse(await readFile(join(dir,'record.json'),'utf8'));
 if(command==='show')console.log(JSON.stringify({...record,privateAttachmentDirectory:dir},null,2));
 else {if(['sent','accepted'].includes(record.notification.status)){console.log('Already sent. No duplicate notification generated.');}else{await notifyEnquiry({record,dir,duplicate:false});console.log(record.reference+': '+record.notification.status);}}
}else{console.error('Usage: node --env-file-if-exists=.env scripts/enquiries.mjs [list | show ID | retry-notification ID]');process.exitCode=1;}
