const cacheResources = async (resources) => {
	const cache = await caches.open("v1");
	await cache.addAll(resources);
};

self.addEventListener("install", (event) => {
	event.waitUntil(
		cacheResources([
			"/en/",
			"/es/",
			"/static/CSS/home.css",
			"/static/CSS/main.css",
			"/static/JS/home.js",
			"/static/JS/styles.js",
			"/static/JS/system-integrity.js",
			"/static/offline/offline.html",
		])
	);
});

const cacheResourceAtRequest = async (req, res) => {
	const cache = await caches.open("v1");
	await cache.put(req, res);
};

const checkCache = async ({ request, fallbackURL }) => {
	const cacheRes = await caches.match(request);
	if (cacheRes) {
		return cacheRes;
	}

	try {
		const networkRes = await fetch(request);
		cacheResourceAtRequest(request, networkRes.clone());
		return networkRes;
	} catch (error) {
		const fallbackRes = await caches.match(fallbackURL);
		if (fallbackRes) {
			return fallbackRes;
		}

		return new Response(
			"A network error occurred and a cached version is unavailable",
			{
				status: 408,
				headers: { "Content-Type": "text/plain" },
			}
		);
	}
};

self.addEventListener("fetch", (event) => {
	event.respondWith(
		checkCache({
			request: event.request,
			fallbackURL: "/static/offline/offline.html",
		})
	);
});

const deleteCache = async (key) => {
	await caches.delete(key);
};

const deleteOldCaches = async () => {
	const cacheKeepList = ["v2"];
	const keyList = await caches.keys();
	const cachesToDelete = keyList.filter(
		(key) => !cacheKeepList.includes(key)
	);
	await Promise.all(cachesToDelete.map(deleteCache));
};

self.addEventListener("activate", (event) => {
	event.waitUntil(deleteOldCaches());
});
