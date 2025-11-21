const { cache } = require("react")

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('calc-cache').then((cache) =>{
            return cache.addAll([
                "./",
                "./index.html",
                "./style.css",
                "./script.js",
                "./manifest.json",
                "./icons/images.jpg",
            ]);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.responWith(
        caches.match(event.request).then((cached) => {
            return cached || fetch(event.request);
        })
    );
});