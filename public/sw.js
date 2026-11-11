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

// Ne jamais mettre en cache une réponse non valide (erreur, redirection suspecte).
const isCacheable = (res) => res && res.ok && res.type === 'basic';

const putInCache = async (req, res) => {
  if (!isCacheable(res)) return;
  try {
    const cache = await caches.open(CACHE);
    await cache.put(req, res.clone());
  } catch (_) {
    // Quota dépassé ou requête non stockable : on ignore, le site reste fonctionnel.
  }
};

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

  // Pages : réseau d'abord (contenu frais), cache si hors ligne.
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => { e.waitUntil(putInCache(req, res)); return res; })
        .catch(async () =>
          (await caches.match(req)) || (await caches.match('./')) || Response.error())
    );
    return;
  }

  // Ressources (JS/CSS/polices/images) : cache d'abord, sinon réseau.
  e.respondWith(
    caches.match(req).then((hit) => {
      if (hit) return hit;
      return fetch(req).then((res) => {
        e.waitUntil(putInCache(req, res));
        return res;
      });
    })
  );
});
