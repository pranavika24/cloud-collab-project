// sw.js — Service Worker for Offline Support

const CACHE_NAME = "cloud-collab-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/dashboard.html",
  "/realtime.html",
  "/offline.html",
  "/offline-demo.html",
  "/styles.css",
  "/app.js",
  "/dashboard.js",
  "/firebase.js",
];

// Install: cache files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching files for offline use");
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch: serve from cache if offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const resClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, resClone));
        return response;
      })
      .catch(() => caches.match(event.request).then((res) => res || caches.match("/offline.html")))
  );
});

// Activate: remove old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => key !== CACHE_NAME && caches.delete(key)))
    )
  );
});
