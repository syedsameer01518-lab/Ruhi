const V=6,C="ruhi-v"+V;
const A=["./","./index.html","./manifest.webmanifest","./ruhi-180.png","./ruhi-192.png","./ruhi-512.png","./ruhi-maskable-512.png","./pdf.min.mjs","./pdf.worker.min.mjs"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(A.map(u=>c.add(new Request(u,{cache:"reload"})).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;
 e.respondWith(caches.match(e.request).then(m=>{const n=fetch(e.request).then(r=>{if(r&&(r.status===200||r.type==="opaque")){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp))}return r}).catch(()=>m);return m||n}))});
