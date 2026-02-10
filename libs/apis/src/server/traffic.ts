'use server';

import 'server-only';
import api from '../client/api';

export const trackVisit = async () => {
  try {
    await api.post('/api/traffic/visit');
  } catch {}
};
