'use strict';
(() => {
 const measurementId='G-BFEGVT265Y',storageKey='csl-analytics-consent-v1';
 const panel=document.querySelector('#analytics-consent');
 if(!panel)return;
 let enabled=false;
 function choice(){try{return localStorage.getItem(storageKey);}catch{return null;}}
 function enable(){if(enabled)return;enabled=true;window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments);};window.gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});window.gtag('js',new Date());window.gtag('config',measurementId,{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false,page_location:location.origin+location.pathname});window.gtag('event','page_view',{page_location:location.origin+location.pathname,page_title:document.title});const script=document.createElement('script');script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id='+measurementId;document.head.append(script);}
 function save(value){try{localStorage.setItem(storageKey,value);}catch{}panel.hidden=true;if(value==='granted')enable();else if(enabled){window['ga-disable-'+measurementId]=true;window.gtag('consent','update',{analytics_storage:'denied'});for(const cookie of document.cookie.split(';')){const name=cookie.trim().split('=')[0];if(name==='_ga'||name.startsWith('_ga_'))for(const domain of ['',location.hostname,'.'+location.hostname])document.cookie=name+'=;Max-Age=0;path=/;SameSite=Lax'+(domain?';domain='+domain:'');}}
 }
 panel.querySelector('[data-analytics-allow]').addEventListener('click',()=>{window['ga-disable-'+measurementId]=false;save('granted');if(enabled)window.gtag('consent','update',{analytics_storage:'granted'});});
 panel.querySelector('[data-analytics-decline]').addEventListener('click',()=>save('denied'));
 document.querySelectorAll('[data-analytics-settings]').forEach(button=>button.addEventListener('click',()=>{panel.hidden=false;panel.querySelector('button').focus();}));
 const saved=choice();if(saved==='granted')enable();panel.hidden=!!saved;
 window.addEventListener('csl:enquiry-saved',event=>{if(choice()==='granted'&&enabled&&['rfq','contact'].includes(event.detail?.formType))window.gtag('event','generate_lead',{form_type:event.detail.formType,value:undefined});});
})();
