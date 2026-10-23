import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {randomUUID} from 'node:crypto';
test('HTTP routes, uploads, chatbot, privacy boundaries and redirects work end to end',async()=>{const dir=await mkdtemp(join(tmpdir(),'csl-http-'));process.env.DATA_DIR=dir;process.env.SITE_URL='http://localhost';process.env.SEARCH_INDEXING='false';delete process.env.OPENAI_API_KEY;const {createServer}=await import('../server.mjs');const server=createServer();await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;const post=(path,body,origin)=>fetch(base+path,{method:'POST',headers:{'Content-Type':'application/json',...(origin?{Origin:origin}:{})},body:JSON.stringify(body)});try{
 for(const path of ['/','/products','/studio','/rfq','/contact','/styles.css','/assets/hero.webp','/sitemap.xml','/llms.txt']){const r=await fetch(base+path);assert.equal(r.status,200,path);}
 const missing=await fetch(base+'/nonexistent');assert.equal(missing.status,404);
 const redirect=await fetch(base+'/history',{redirect:'manual'});assert.equal(redirect.status,301);assert.equal(redirect.headers.get('location'),'/about');
 const res=await fetch(base+'/');assert.match(res.headers.get('content-security-policy'),/frame-ancestors 'none'/);assert.match(await res.text(),/noindex, nofollow/);
 assert.equal((await post('/api/enquiries',{},'https://attacker.example')).status,403);
 const payload={type:'contact',name:'Buyer',email:'buyer@example.com',subject:'Product information',message:'Please advise about a teamwear project.',consent:true,submissionKey:randomUUID(),files:[{name:'idea.pdf',type:'application/pdf',data:Buffer.from('%PDF-1.7\ntest concept').toString('base64')}]};
 const saved=await post('/api/enquiries',payload);assert.equal(saved.status,201);const data=await saved.json();assert.match(data.reference,/^CSL-/);const duplicate=await post('/api/enquiries',payload);assert.equal((await duplicate.json()).reference,data.reference);
 assert.equal((await fetch(base+'/var/enquiries')).status,404);assert.equal((await fetch(base+'/api/enquiries')).status,405);
 const chat=await post('/api/chat',{message:'Can I upload a logo?'});assert.equal(chat.status,200);assert.match((await chat.json()).answer,/Upload|upload/);
 const bad=await post('/api/chat',{message:'x'.repeat(1501)});assert.equal(bad.status,400);
 }finally{server.closeAllConnections();await new Promise(r=>server.close(r));await rm(dir,{recursive:true,force:true});}});
