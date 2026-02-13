'use client';

import { useEffect } from 'react';
import { trackVisit } from 'apis';

const TrafficTracker = () => {
  useEffect(() => {
    trackVisit();
  }, []);

  return null;
};

export default TrafficTracker;
