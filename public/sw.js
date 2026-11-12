// Service worker : lecture hors ligne. Changez CACHE (v2, v3…) à chaque grosse mise à jour.
// Chemins relatifs au scope /herbes-bienfaits/ (GitHub Pages projet).
const CACHE = "herbes-v2";
const CORE = ["./", "./conseils/", "./favoris/", "./a-propos/", "./manifest.json"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

// La page envoie la liste de toutes les fiches : on les met en cache pour le hors ligne.
self.addEventListener("message", (e) => {
  if (e.data && e.data.type === "PRECACHE" && Array.isArray(e.data.urls)) {
    e.waitUntil(
      caches.open(CACHE).then((c) => Promise.all(e.data.urls.map((u) => c.add(u).catch(() => {}))))
    );
  }
});

// Ne jamais mettre en cache une réponse non valide (erreur, redirection suspecte).
const isCacheable = (res) => res && res.ok && res.type === "basic";

const store = async (req, res) => {
  if (!isCacheable(res)) return;
  try {
    const cache = await caches.open(CACHE);
    await cache.put(req, res.clone());
  } catch (_) {
    // Quota dépassé ou requête non stockable : le site reste fonctionnel.
  }
};

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;

  // Pages : réseau d'abord (contenu à jour), cache en secours hors ligne
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((res) => { e.waitUntil(store(req, res)); return res; })
        .catch(async () =>
          (await caches.match(req)) || (await caches.match("./")) || Response.error())
    );
    return;
  }
  // Ressources (JS, CSS, polices, images) : cache d'abord
  e.respondWith(caches.match(req).then((hit) => {
    if (hit) return hit;
    return fetch(req).then((res) => { e.waitUntil(store(req, res)); return res; });
  }));
});
