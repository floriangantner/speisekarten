//sw.js
//registers serviceWorker
/*var version = 'v1::';

this.addEventListener('install', function(event) {
  console.log('WORKER: install event in progress.');
  event.waitUntil(
    caches
      .open(version).then(function(cache) {
      return cache.addAll([
        '/spider-app/',
        '/spider-app/index.html',
        '/spider-app/app.css',
        '/spider-app/js/',
        '/spider-app/assets/UniB.svg',
        '/spider-app/assets/Erzaehlcafe_ERBA.jpg',
        '/spider-app/assets/SpiderBold.png'
      ]);
    })
    .then(function() {
        console.log('WORKER: install completed');
      })
  );
});
*/
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/js/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
