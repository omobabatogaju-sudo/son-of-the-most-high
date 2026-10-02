const CACHE_NAME='bible-streak-shell-v3';
const BASE='/son-of-the-most-high/bible-streak/';
const APP_SHELL=[BASE,BASE+'index.html',BASE+'manifest.json',BASE+'icon.svg'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(APP_SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('bible-streak-')&&k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 const url=new URL(event.request.url);
 if(url.origin!==self.location.origin)return;
 if(event.request.mode==='navigate')event.respondWith(fetch(event.request).then(r=>{caches.open(CACHE_NAME).then(c=>c.put(event.request,r.clone()));return r}).catch(()=>caches.match(BASE+'index.html')));
});