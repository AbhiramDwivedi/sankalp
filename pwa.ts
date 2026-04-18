/// <reference types="vite-plugin-pwa/client" />
// Service-worker registration helper.
// ------------------------------------------------------------------
// vite-plugin-pwa exposes a virtual module `virtual:pwa-register` that
// returns a `registerSW` function. In dev mode the plugin's `devOptions`
// are disabled, so importing the virtual module from a dev build is a
// no-op. In the production bundle this registers /sw.js with
// `registerType: 'autoUpdate'` semantics.
//
// Isolating the call here keeps the entry file (index.tsx) clean and
// makes the behavior easy to test in isolation.

export function registerServiceWorker(): void {
  if (typeof window === 'undefined') return;
  if (!('serviceWorker' in navigator)) return;

  // Dynamic import so a failed virtual resolution (e.g. during `tsc --noEmit`
  // with missing plugin types) never blocks app boot.
  import('virtual:pwa-register')
    .then(({ registerSW }) => {
      registerSW({ immediate: true });
    })
    .catch((err: unknown) => {
      // eslint-disable-next-line no-console
      console.warn('[pwa] registerSW failed:', err);
    });
}
