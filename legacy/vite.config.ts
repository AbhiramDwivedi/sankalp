import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        VitePWA({
          registerType: 'autoUpdate',
          // We register the SW ourselves from pwa.ts via the virtual module —
          // do not let the plugin inject its own registration script. This
          // keeps the behavior identical in dev and prod.
          injectRegister: false,
          // The manifest is authored as public/manifest.webmanifest and linked
          // from index.html. Passing manifest: false tells the plugin to use
          // the existing file rather than regenerate one.
          manifest: false,
          includeAssets: [
            'manifest.webmanifest',
            'icon-192.png',
            'icon-512.png',
          ],
          workbox: {
            globPatterns: ['**/*.{js,css,html,svg,woff2,png,jpg,jpeg,json,webmanifest}'],
            // The app ships its full content library (26 packs, 10 capstones,
            // ~850 flashcards) bundled into index-*.js which reaches ~2.6 MB.
            // Bump the precache size ceiling so the app shell actually works
            // offline. Default is 2 MiB.
            maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
            // Content is bundled into the JS chunks so no JSON runtime cache is
            // needed today. Google Fonts are loaded from fonts.googleapis.com /
            // fonts.gstatic.com — cache both for offline use.
            runtimeCaching: [
              {
                urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                handler: 'StaleWhileRevalidate',
                options: {
                  cacheName: 'google-fonts-stylesheets',
                },
              },
              {
                urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
                handler: 'CacheFirst',
                options: {
                  cacheName: 'google-fonts-webfonts',
                  expiration: {
                    maxEntries: 32,
                    maxAgeSeconds: 60 * 60 * 24 * 365,
                  },
                  cacheableResponse: { statuses: [0, 200] },
                },
              },
              {
                urlPattern: /^https:\/\/cdn\.tailwindcss\.com\/?.*/i,
                handler: 'StaleWhileRevalidate',
                options: {
                  cacheName: 'tailwind-cdn',
                },
              },
              {
                urlPattern: /^https:\/\/esm\.sh\/.*/i,
                handler: 'StaleWhileRevalidate',
                options: {
                  cacheName: 'esm-sh',
                  expiration: {
                    maxEntries: 64,
                    maxAgeSeconds: 60 * 60 * 24 * 30,
                  },
                },
              },
            ],
            navigateFallback: '/index.html',
            // Gemini API calls are runtime-only and must not be cached.
            navigateFallbackDenylist: [/^\/api\//],
          },
          devOptions: {
            // Keep the service worker off during `npm run dev` and Playwright
            // smoke runs. A dev-mode SW noticeably slows the webServer lane
            // Playwright boots for each stage, and the production bundle is
            // where offline behavior actually matters. Smoke asserts on the
            // manifest link instead; a manual Lighthouse run against
            // `npm run build && npm run preview` verifies the SW surface.
            enabled: false,
          },
        }),
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
