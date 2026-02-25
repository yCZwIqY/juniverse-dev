'use client';

import { useEffect } from 'react';
import { trackVisit } from 'apis';

const TrafficTracker = () => {
  useEffect(() => {
    const send = () => {
      void trackVisit().catch(() => {});
    };

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(send, { timeout: 2000 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timerId = window.setTimeout(send, 1500);
    return () => window.clearTimeout(timerId);
  }, []);

  return null;
};

export default TrafficTracker;
