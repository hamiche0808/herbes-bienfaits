// Service worker — Herbes & Bienfaits
// Chemins relatifs au scope /herbes-bienfaits/ (GitHub Pages projet).
// Publier une nouvelle version → incrémenter herbes-v1 → herbes-v2 pour purger le cache.
const CACHE = 'herbes-v1';
const CORE = ['./', './conseils/', './manifest.json'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

const putInCache = (req, res) => {
  const copy = res.clone();
  caches.open(CACHE).then((c) => c.put(req, copy));
  return res;
};

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

  // Pages : réseau d'abord (contenu frais), cache si hors ligne
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then((res) => putInCache(req, res))
        .catch(() => caches.match(req).then((hit) => hit || caches.match('./')))
    );
    return;
  }
  // Ressources (JS/CSS/polices/images) : cache d'abord
  e.respondWith(
    caches.match(req).then((hit) => hit || fetch(req).then((res) => putInCache(req, res)))
  );
});
