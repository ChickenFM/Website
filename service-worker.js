'use strict';

// CODELAB: Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v1';

// CODELAB: Update cache names any time any of the cached files change.
const FILES_TO_CACHE = [
    '/offline.html',
    '/index.html',
    '/style.css',
    '/popup.html'
  ];


  self.addEventListener('install', (evt) => {
    console.log('[ServiceWorker] Install');
    // CODELAB: Precache static resources here.
  
    self.skipWaiting();
  });
  
  self.addEventListener('activate', (evt) => {
    console.log('[ServiceWorker] Activate');
    // CODELAB: Remove previous cached data from disk.
  
    self.clients.claim();
  });
  
  self.addEventListener('fetch', (evt) => {
    //console.log('[ServiceWorker] Fetch', evt.request.url);
    // CODELAB: Add fetch event handler here.
  
  });