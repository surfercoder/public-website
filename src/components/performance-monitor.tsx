"use client";

import { useEffect } from 'react';
import { registerServiceWorker } from '@/lib/sw-register';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Register service worker
    registerServiceWorker();

    /* istanbul ignore next -- SSR guard */
    if (typeof window === 'undefined' || !('performance' in window) || !('PerformanceObserver' in window)) {
      return;
    }

    let observer: PerformanceObserver | undefined;
    try {
      observer = new PerformanceObserver(/* istanbul ignore next */ () => { /* no-op */ });
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    } catch {
      /* no-op */
    }

    const handleLoad = /* istanbul ignore next */ () => { /* no-op */ };
    window.addEventListener('load', handleLoad);

    return () => {
      observer?.disconnect?.();
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return null;
}
