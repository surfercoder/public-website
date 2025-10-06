// Service Worker Registration
export function registerServiceWorker() {
  // Only register the service worker in production to avoid dev/prod cache mismatches
  if (process.env.NODE_ENV !== 'production') return;

  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(() => { /* no-op */ })
        .catch(() => { /* no-op */ });
    });
  }
}
