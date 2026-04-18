self.addEventListener('install', (event) => {
    console.log('✅ Service Worker instalado. O App já pode funcionar offline ou ser salvo na tela inicial do celular.');
});

self.addEventListener('fetch', (event) => {
    // Para este MVP, não vamos cachear as requisições agressivamente, 
    // apenas permitir que o manifesto valide o PWA.
    event.respondWith(fetch(event.request).catch(() => new Response('Você está offline.')));
});
