// Font files
var fontFiles = [
    '/static/css/iosevka/iosevka-aile-regular.woff2',
    '/static/css/iosevka/iosevka-aile-italic.woff2',
    '/static/css/iosevka/iosevka-curly-regular.woff2',
    '/static/css/iosevka/iosevka-etoile-regular.woff2',
    '/static/css/iosevka/iosevka-etoile-italic.woff2',
];

// On install, cache some stuff
addEventListener('install', function (event) {
	event.waitUntil(caches.open('core').then(function (cache) {
		cache.add(new Request('/static/css/index.css'));
		fontFiles.forEach(function (file) {
			cache.add(new Request(file));
		});
		return;
	}));
});


// listen for requests
addEventListener('fetch', function (event) {

	// Get the request
	var request = event.request;

	// Bug fix
	// https://stackoverflow.com/a/49719964
	if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') return;

	// HTML files
	// Network-first
	if (request.headers.get('Accept').includes('text/html')) {
		event.respondWith(
			fetch(request).then(function (response) {

				// Save the response to cache
				if (response.type !== 'opaque') {
					var copy = response.clone();
					event.waitUntil(caches.open('pages').then(function (cache) {
						return cache.put(request, copy);
					}));
				}

				// Then return it
				return response;

			}).catch(function (error) {
				return caches.match(request).then(function (response) {
					return response;
				});
			})
		);
	}

	// Images & Fonts
	if (request.headers.get('Accept').includes('image') || request.url.includes('/static/css/index.css')) {
		event.respondWith(
			caches.match(request).then(function (response) {
				return response || fetch(request).then(function (response) {

					// If an image, stash a copy of this image in the images cache
					if (request.headers.get('Accept').includes('image')) {
						var copy = response.clone();
						event.waitUntil(caches.open('images').then(function (cache) {
							return cache.put(request, copy);
						}));
					}

					// Return the requested file
					return response;

				});
			})
		);
	}
});
