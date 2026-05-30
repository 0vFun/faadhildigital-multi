/**
 * ══════════════════════════════════════════════════════════════════
 * FAADHIL DIGITAL — PWA CORE SERVICE WORKER
 * Network-First Offline Strategy with Fallback Resilience.
 * ══════════════════════════════════════════════════════════════════
 */

const CACHE_NAME = 'faadhil-digital-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/home.html',
  '/css/style.css',
  '/js/script.js',
  '/manifest.json',
  '/assets/LOGO4721.png'
];

// Install Event
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Strategy: Network-First with Cache Fallback
self.addEventListener('fetch', (e) => {
  // Only handle internal requests
  if (!e.request.url.startsWith(self.location.origin)) return;

  e.respondWith(
    fetch(e.request)
      .then((response) => {
        // Update cache dynamically if response is clean
        if (response.status === 200) {
          const respCopy = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, respCopy);
          });
        }
        return response;
      })
      .catch(() => {
        // Fallback to cache if network drops
        return caches.match(e.request);
      })
  );
});