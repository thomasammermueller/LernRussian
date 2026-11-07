import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
import pkg from './package.json' with { type: 'json' };

// Relative base + HashRouter => works on GitHub Pages under any repo path.
export default defineConfig({
  base: './',
  define: { __APP_VERSION__: JSON.stringify(pkg.version) },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'LernRussian',
        short_name: 'Russisch',
        description: 'Russisch lernen von A1 bis A2 – offline, kostenlos.',
        lang: 'de',
        start_url: './',
        scope: './',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#f7f5f0',
        theme_color: '#1f3a5f',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2,json,m4a}'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        runtimeCaching: [
          {
            // Offline speech recognition (transformers.js + ONNX runtime from the CDN) – cached on first use.
            urlPattern: ({ url }) => url.hostname === 'cdn.jsdelivr.net',
            handler: 'CacheFirst',
            options: { cacheName: 'speech-runtime', expiration: { maxEntries: 20 }, cacheableResponse: { statuses: [0, 200] } },
          },
          {
            urlPattern: ({ url }) => url.pathname.includes('/audio/'),
            handler: 'CacheFirst',
            options: { cacheName: 'audio', expiration: { maxEntries: 5000 } },
          },
        ],
      },
    }),
  ],
  test: { environment: 'node' },
});
