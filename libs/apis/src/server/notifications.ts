import 'server-only';
import { API_BASE_URL } from '../http/env';

export const getNotificationsStreamUpstreamUrl = () => `${API_BASE_URL}/api/notifications/stream`;
