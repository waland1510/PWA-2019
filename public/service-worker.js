var dataCacheName = 'template-pwa';
var cacheName = 'template-pwa';
var filesToCache = [
  '/',
//  "./fonts",
//  "./fonts/fontawesome-webfont.eot",
//  ".fonts/fontawesome-webfont.svg",
//  "./fonts/fontawesome-webfont.ttf",
//  "./fonts/fontawesome-webfont.woff",
//  "./fonts/fontawesome-webfont.woff2",
//  "./fonts/FontAwesome.otf",
//  "./images",
//  "./images/icons",
//  "./images/icons/icon-128x128.png",
//  "./images/icons/icon-144x144.png",
//  "./images/icons/icon-152x152.png",
//  "./images/icons/icon-192x192.png",
//  "./images/icons/icon-256x256.png",
//  "./images/about-iphone.png",
//  "./images/client-01.jpg",
//  "./images/client-02.jpg",
//  "./images/client-03.jpg",
//  "./images/download-screen.png",
//  "./images/counter-bg.jpg",
//  "./images/favicon.png",
//  "./images/header-bg.jpg",
//  "./images/iphone-header.png",
//  "./images/iphone-02.png",
//  "./images/logo-small.png",
//  "./images/logo.png",
//  "./images/testimonial-bg.jpg",
//  "./images/screen-01.png",
//  "./images/screen-02.png",
//  "./images/screen-03.png",
//  "./images/screen-04.png",
//  "./index.html",
//  "./manifest.json",
//  "./js",
//  "./js/bootstrap.min.js",
//  "./js/custom.js",
//  "./js/script.js",
//  "./js/jquery.js",
//  "./js/jquery.bxslider.min.js",
//  "./js/jquery.counterup.min.js",
//  "./js/jquery.waypoints.min.js",
//  "./js/jwow.min.js",
//  "./css",
//  "./css/animate.css",
//  "./css/bootstrap.min.css",
//  "./css/font-awesome.min.css",
//  "./css/jquery.bxslider.css",
//  "./css/responsive.css",
 "./css/style.css"
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
