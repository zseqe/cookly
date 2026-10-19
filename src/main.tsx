import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { CooklyProvider } from './context/CooklyContext';
import './index.css';

// In development, unregister any active service worker and clear cache to avoid stale bundle caching
if (import.meta.env.DEV) {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const reg of registrations) {
        reg.unregister();
      }
    });
  }
  if ('caches' in window) {
    caches.keys().then((names) => {
      for (const name of names) {
        caches.delete(name);
      }
    });
  }
} else if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CooklyProvider>
      <App />
    </CooklyProvider>
  </React.StrictMode>
);
