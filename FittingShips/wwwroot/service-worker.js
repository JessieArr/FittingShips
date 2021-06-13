var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    '/',
    '/images/test.png',
];

self.addEventListener('activate', function (event) {
    console.log('Activating!');
});

self.addEventListener('install', function (event) {
    self.skipWaiting();
    // Perform install steps
    console.log('Installing service worker.')
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function (event) {
    console.log("Fetch event fired.");
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if (response) {
                    console.log("Cache hit: " + event.request.url);
                    return response;
                }
                console.log("Cache miss: " + event.request.url);
                return fetch(event.request.url);
            }
        )
    );
});

