//sw.js
//registers serviceWorker
var version = 'v1::';

this.addEventListener('install', function(event) {
  console.log('WORKER: install event in progress.');
  event.waitUntil(
    caches
      .open(version).then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/css/',
        '/js/',
        '/assets/'
        ]);
    })
    .then(function() {
        console.log('WORKER: install completed');
      })
  );
});

self.addEventListener('activate', async () => {
  // This will be called only once when the service worker is activated.
  console.log('service worker activated');
})
