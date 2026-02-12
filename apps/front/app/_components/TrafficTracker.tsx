'use client';

import { useEffect } from 'react';

const TrafficTracker = () => {
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/traffic/visit`, { method: 'POST' }).catch(() => {
    });
  }, []);

  return null;
};

export default TrafficTracker;
