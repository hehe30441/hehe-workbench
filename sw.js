const C='hehe-v1';
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(self.clients.claim())});
self.addEventListener('fetch',e=>{
  e.respondWith(
    caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{
      if(resp.ok&&e.request.method==='GET'){
        const c=resp.clone();
        caches.open(C).then(cache=>cache.put(e.request,c));
      }
      return resp;
    }).catch(()=>caches.match(e.request)))
  );
});
