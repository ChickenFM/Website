'use strict';

// CODELAB: Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v1';

// CODELAB: Update cache names any time any of the cached files change.
const FILES_TO_CACHE = [
    '/offline.html',
    '/index.html',
    '/style/style.css',
    '/style/animations.css',
    '/scripts/player.js',
    '/scripts/settings.js',
    '/scripts/install.js',
    '/scripts/popups/settingspopup.js',
    '/scripts/popups/songrequest.js',
    '/favicon.ico'
  ];


  self.addEventListener('install', (evt) => {
    console.log('[ServiceWorker] Install');
    // CODELAB: Precache static resources here.
    evt.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        console.log('[ServiceWorker] Pre-caching offline page');
        return cache.addAll(FILES_TO_CACHE);
      })
  );
    self.skipWaiting();
  });
  
  self.addEventListener('activate', (evt) => {
    console.log('[ServiceWorker] Activate');
    // CODELAB: Remove previous cached data from disk.
    evt.waitUntil(
      caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
  );
    self.clients.claim();
  });
  
  self.addEventListener('fetch', (evt) => {
    console.log('[ServiceWorker] Fetch', evt.request.url);
    // CODELAB: Add fetch event handler here.
    if (evt.request.mode !== 'navigate') {
  // Not a page navigation, bail.
  
  evt.respondWith(
    fetch(evt.request)
        .catch(() => {
          return caches.open(CACHE_NAME)
              .then((cache) => {
                return cache.match('/offline.html');
              });
        })
  )}
});
