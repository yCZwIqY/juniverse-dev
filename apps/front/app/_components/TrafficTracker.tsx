'use client';

import { useEffect } from 'react';

const TrafficTracker = () => {
  useEffect(() => {
    fetch('/api/traffic/visit', { method: 'POST' }).catch(() => {});
  }, []);

  return null;
};

export default TrafficTracker;
