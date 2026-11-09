/* GP3 Sports LATAM — service worker v2 (09-11-2026)
 *
 * Qué cambió y por qué:
 * La v1 se ponía en medio de CADA visita (escuchaba "fetch"): primero intentaba internet y, si fallaba,
 * mostraba una copia guardada. No tenía tiempo límite, así que con señal débil la página quedaba
 * "conectando" hasta que el navegador se rendía. Además, al instalarse descargaba en segundo plano
 * cav.html (~950 KB) y otros archivos, compitiendo con la propia carga de la portada.
 *
 * La v2 ya NO escucha "fetch": el navegador va directo a internet, como cualquier página normal.
 * Se mantiene registrado porque index.html lo sigue registrando y así se puede actualizar en el futuro;
 * la instalación como app depende de manifest.json, no de este archivo.
 * Al activarse borra todas las cachés del sitio (hoy solo existe "gp3-v1": copias de páginas e imágenes
 * públicas; no hay datos de nadie). Ya no hay modo sin conexión: sin señal se ve el aviso normal del navegador.
 */

self.addEventListener('install', function () {
  // Reemplaza a la v1 apenas se descarga, sin esperar a que se cierren las pestañas abiertas.
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (ks) {
        return Promise.all(ks.map(function (k) { return caches.delete(k); }));
      })
      .catch(function () {})
      .then(function () { return self.clients.claim(); })
  );
});

// Sin listener "fetch" a propósito (ver arriba).
