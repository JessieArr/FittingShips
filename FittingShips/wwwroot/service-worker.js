var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = ['/', '/images/test.png'];

self.addEventListener('activate', function (event) {
    console.log('Activating!');
});

self.addEventListener('install', function (event) {
    self.skipWaiting();
    // Perform install steps
    console.log('Installing service worker.');
    event.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
    }));
});

self.addEventListener('fetch', function (event) {
    console.log("Fetch event fired: " + event.request.url);
    event.respondWith(
        caches.open(CACHE_NAME).then(function (cache) {
          return cache.match(event.request).then(function (response) {
            var fetchPromise = fetch(event.request)
                .then(function (networkResponse) {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                })
                .catch(error => 
                {
                    console.log("No new content found for " + event.request.url)
                });
            return response || fetchPromise;
          });
        }),
      );
    // event.respondWith(
    //     fetch(event.request)
    //         .then(result => {
    //             console.log("Loaded live content for " + event.request.url);
    //             return result;
    //         }).catch(function() {
    //             console.log("Loading cached content for " + event.request.url);
    //             return caches.match(event.request);
    //     })
    // );
    
    // event.respondWith(caches.match(event.request).then(function (response) {
    //     if (response) {
    //         console.log("Cache hit: " + event.request.url);
    //     }
    //     return fetch(event.request.url)
    //         .then(liveContent => 
    //         {
    //             if(liveContent.ok)
    //             {
    //                 console.log("Loaded live content for: " + event.request.url);
    //                 cache.put(event.request, response.clone());
    //                 return liveContent;
    //             }
    //             if (response) {
    //                 return response;
    //             }
    //             console.log("Cache miss and no live content available: " + event.request.url);
    //         })
    //         .catch(error => {
    //             if (response) {
    //                 return response;
    //             }
    //             console.log("Cache miss and no live content available: " + event.request.url);
    //         });
    // }));
});