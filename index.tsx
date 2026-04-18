
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { registerServiceWorker } from './pwa';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register the service worker after the initial render. The helper is a no-op
// in dev mode (vite-plugin-pwa ships `devOptions.enabled: false`) and only
// attaches a real worker in the production bundle.
registerServiceWorker();
