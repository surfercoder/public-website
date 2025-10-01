"use client";

import { useEffect } from 'react';
import { registerServiceWorker } from '@/lib/sw-register';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Register service worker
    registerServiceWorker();

    // Performance monitoring (disabled logs)
    if (typeof window !== 'undefined' && 'performance' in window && 'PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver(() => { /* no-op */ });
        observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
      } catch {
        /* no-op */
      }

      // Attach listener without logging to avoid console noise
      window.addEventListener('load', () => {
        /* no-op */
      });
    }
  }, []);

  return null;
}
