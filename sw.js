// sw.js - High-Performance Service Worker for Faadhil Digital
const CACHE_NAME = 'faadhil-digital-cache-v1';

// Daftar aset statis utama yang akan di-cache saat instalasi pertama
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/pricing.html',
    '/portfolio.html',
    '/blog.html',
    '/faq.html',
    '/contact.html',
    '/manifest.json',
    
    // Core Stylesheets[cite: 7, 8, 9, 10, 11, 12, 13, 14]
    '/css/global.css',
    '/css/navbar.css',
    '/css/hero.css',
    '/css/cards.css',
    '/css/animations.css',
    '/css/contact.css',
    '/css/faq.css',
    '/css/footer.css',
    
    // Core JavaScripts[cite: 15, 16, 17, 18, 19]
    '/js/script.js',
    '/js/navbar.js',
    '/js/animations.js',
    '/js/language.js',
    '/js/pricing.js',
    '/js/contact.js'
];

// 1. Event Install: Mengunci dan menyimpan semua aset inti ke dalam cache lokal browser
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        }).then(() => {
            return self.skipWaiting(); // Memaksa SW baru langsung aktif
        })
    );
});

// 2. Event Activate: Membersihkan cache versi lama jika Anda melakukan update berkala
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => {
            return self.clients.claim(); // Mengambil kendali penuh atas semua tab halaman yang terbuka
        })
    );
});

// 3. Event Fetch: Strategi Stale-While-Revalidate (Sajikan instan dari cache, update dari jaringan)
self.addEventListener('fetch', (event) => {
    // Abaikan permintaan di luar skema HTTP/HTTPS (seperti ekstensi chrome atau API Formspree)
    if (!event.request.url.startsWith(self.location.origin)) {
        return;
    }

    event.respondWith(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.match(event.request).then((cachedResponse) => {
                // Buat request ke jaringan untuk mendapatkan versi terbaru di latar belakang
                const fetchPromise = fetch(event.request).then((networkResponse) => {
                    // Jika respons valid, simpan salinan terbarunya ke dalam cache
                    if (networkResponse.status === 200) {
                        cache.put(event.request, networkResponse.clone());
                    }
                    return networkResponse;
                }).catch(() => {
                    // Menangani error jaringan secara senyap jika offline
                });

                // Kembalikan respons dari cache jika ada (Instant Load), jika tidak ada tunggu jaringan
                return cachedResponse || fetchPromise;
            });
        })
    );
});