const registerServiceWorker = async () => {
	if ("serviceWorker" in navigator) {
		try {
			const registration = await navigator.serviceWorker.register(
				"/static/offline/sw.js",
				{ scope: "/static/offline/" }
			);
			if (registration.installing) {
				console.info("Service worker is installing...");
			} else if (registration.waiting) {
				console.info("Service worker is installed");
			} else if (registration.active) {
				console.info("Service woker is active");
			}
		} catch (error) {
			console.error("Failed to register service worker");
			console.error(error);
		}
	}
};

registerServiceWorker();
