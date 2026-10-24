// Recover unmodified original CSL fabric photographs for local high-resolution previews.
import {heritageImages} from '../lib/heritage.mjs';
import {mkdir,writeFile,stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const directory=new URL('../public/assets/fabric-originals/',import.meta.url);await mkdir(directory,{recursive:true});
const items=heritageImages.filter(x=>x.pages.includes('/fabrics'));let failed=0;
for(let i=0;i<items.length;i+=4)await Promise.all(items.slice(i,i+4).map(async x=>{const destination=new URL(x.file.replace('.webp','.jpg'),directory);try{if((await stat(destination)).size>1000)return;}catch{}try{const url=new URL(x.source);if(url.hostname!=='images.squarespace-cdn.com')throw Error('Unexpected source');const response=await fetch(url,{headers:{Accept:'image/jpeg','User-Agent':'Mozilla/5.0'},signal:AbortSignal.timeout(20000)});if(!response.ok)throw Error('HTTP '+response.status);const bytes=Buffer.from(await response.arrayBuffer());if(bytes[0]!==255||bytes[1]!==216||bytes.length>12000000)throw Error('Unexpected image');await writeFile(destination,bytes);console.log('Recovered '+x.file);}catch(e){failed++;console.error(x.file+': '+e.message);}}));
if(failed)process.exitCode=1;else console.log('All 13 original fabric photos available locally.');
