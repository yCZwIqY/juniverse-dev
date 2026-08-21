'use server';

import 'server-only';
import client from '../http/client';

export const trackVisit = async () => {
  try {
    await client.post('/api/traffic/visit');
  } catch (error) {
    console.error('[apis] trackVisit failed', error);
  }
};
