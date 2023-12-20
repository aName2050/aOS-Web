let cacheName = "offline-site";

let filesToCache = [
	"/",
	"/static/offline/offline.html",
	"/static/offline/offline.css",
	"/static/offline/offline.js",
];

self.addEventListener("install", function (e) {
	e.waitUntil(
		caches.open(cacheName).then(function (cache) {
			return cache.addAll(filesToCache);
		})
	);
});

self.addEventListener("fetch", function (e) {
	e.respondWith(
		caches.match(e.request).then(function (response) {
			return response || fetch(e.request);
		})
	);
});
