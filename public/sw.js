// Service Worker for caching and performance optimization
const CACHE_NAME = 'agustin-cassani-v2';
// Only cache truly static, long-lived assets. Avoid caching dynamic pages in SW.
const STATIC_CACHE_URLS = [
  '/',
  '/profile-image.jpeg',
  '/AgustinCassaniCV.pdf'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // Cache each URL individually to handle failures gracefully
        return Promise.allSettled(
          STATIC_CACHE_URLS.map(url => 
            cache.add(url).catch(err => {
              console.warn(`Failed to cache ${url}:`, err);
              return null; // Don't fail the entire operation
            })
          )
        );
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  const requestUrl = event.request.url;

  // Skip cross-origin requests
  if (!requestUrl.startsWith(self.location.origin)) return;

  // Never intercept Next.js build/runtime assets or RSC/chunks
  if (requestUrl.includes('/_next/')) {
    event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
    return;
  }

  // Network-first for documents (HTML navigations) to avoid serving stale pages
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Optionally cache the fresh document
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone)).catch(() => {});
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Cache-first for other same-origin GET requests, with network fallback
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;
      return fetch(event.request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache)).catch(() => {});
          return response;
        })
        .catch(() => undefined);
    })
  );
});
