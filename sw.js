const CACHE_NAME = 'mi-juego-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icono.png'
];

// Instalar el Service Worker y guardar en caché los archivos básicos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Activar el Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// Responder desde el caché si no hay internet (Fetch Handler requerido por Chrome)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
