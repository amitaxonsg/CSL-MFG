// Run interactively on the confirmed server account; never commit the resulting .env.
import readline from 'node:readline';
import {Writable} from 'node:stream';
import {readFile,writeFile,chmod} from 'node:fs/promises';
import {hashPassword} from '../lib/nexus.mjs';
const silentOutput=new Writable({write(_chunk,_encoding,done){done();}});
const rl=readline.createInterface({input:process.stdin,output:silentOutput,terminal:Boolean(process.stdin.isTTY)});
process.stdout.write('Set staff access code (input hidden): ');
const password=await new Promise(resolve=>rl.question('',resolve));rl.close();process.stdout.write('\n');
if(password.length<4||password.length>200)throw new Error('Use between 4 and 200 characters.');
if(password.length<12)console.error('Short code: preview use only. Replace with individual staff authentication before connecting private work data.');
let current='';try{current=await readFile('.env','utf8');}catch(e){if(e.code!=='ENOENT')throw e;}
const line='NEXUS_PASSWORD_HASH='+await hashPassword(password);
current=/^NEXUS_PASSWORD_HASH=.*$/m.test(current)?current.replace(/^NEXUS_PASSWORD_HASH=.*$/m,line):current.trimEnd()+'\n'+line+'\n';
await writeFile('.env',current,{mode:0o600});await chmod('.env',0o600);console.log('Staff access hash saved in server-only .env. Restart the CSL app.');
