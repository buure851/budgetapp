const CACHE_NAME = 'budget-app-v1';

// Fichiers à sauvegarder dans le téléphone
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'
];

// Installation du Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Fichiers mis en cache avec succès');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Récupération des fichiers (Priorité au cache local pour la vitesse)
self.addEventListener('fetch', event => {
  // On ne met pas en cache les requêtes vers l'API Google Apps Script
  if (event.request.url.includes('script.google.com')) return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});
