'use client';

import { useEffect } from 'react';
import { trackVisit } from 'apis';

const TrafficTracker = () => {
  useEffect(() => {
    const win = globalThis as Window & typeof globalThis;

    const send = () => {
      void trackVisit().catch(() => {});
    };

    if (typeof win.requestIdleCallback === 'function') {
      const idleId = win.requestIdleCallback(send, { timeout: 2000 });
      return () => win.cancelIdleCallback?.(idleId);
    }

    const timerId = win.setTimeout(send, 1500);
    return () => win.clearTimeout(timerId);
  }, []);

  return null;
};

export default TrafficTracker;
