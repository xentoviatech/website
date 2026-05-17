// Minimal cache-first service worker for the /ceo/ digital business card.
// Scope: /ceo/ (derived from this file's location).

const CACHE = 'ceo-card-v2';
const ASSETS = [
  '/ceo/',
  '/ceo/index.html',
  '/ceo/manifest.webmanifest',
  '/assets/team/avr.jpg',
  '/favicon.png',
  '/favicon.ico',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  // Only handle same-origin requests; let cross-origin (fonts CDN, tailwind CDN) hit network with browser cache.
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((resp) => {
        // Cache successful basic responses for next time (within scope).
        if (resp && resp.status === 200 && resp.type === 'basic') {
          const copy = resp.clone();
          caches.open(CACHE).then((cache) => cache.put(req, copy));
        }
        return resp;
      }).catch(() => {
        // Offline fallback: if navigating, return the cached card.
        if (req.mode === 'navigate') return caches.match('/ceo/');
      });
    })
  );
});
