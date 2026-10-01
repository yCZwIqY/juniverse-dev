import { API_BASE_URL } from './env';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

const ENABLE_FETCH_LOG =
  process.env.API_FETCH_LOG === 'true' ||
  (process.env.NODE_ENV !== 'production' && process.env.API_FETCH_LOG !== 'false');

type FetchOptions = Omit<RequestInit, 'method' | 'body'> & {
  next?: { tags?: string[]; revalidate?: number };
};

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly url: string,
    message?: string,
  ) {
    super(message ?? `API request failed: ${status} ${url}`);
    this.name = 'ApiError';
  }
}

const buildQuery = (params?: Record<string, any>) => {
  if (!params) return '';

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    searchParams.append(key, String(value));
  });

  const query = searchParams.toString();
  return query ? `?${query}` : '';
};

const logFetch = (method: string, url: string, startedAt: number, status?: number) => {
  if (!ENABLE_FETCH_LOG) return;
  const durationMs = Date.now() - startedAt;
  const statusText = typeof status === 'number' ? ` ${status}` : '';
  console.log(`[api] ${method} ${url}${statusText} (${durationMs}ms)`);
};

const request = async <T>(method: string, requestUrl: string, init: RequestInit): Promise<T> => {
  const startedAt = Date.now();
  const res = await fetch(requestUrl, init);
  logFetch(method, requestUrl, startedAt, res.status);

  if (!res.ok) {
    throw new ApiError(res.status, requestUrl);
  }

  return res.json();
};

const get = <T>(url: string, params?: Record<string, any>, options?: FetchOptions): Promise<T> => {
  const requestUrl = `${API_BASE_URL}${url}${buildQuery(params)}`;
  return request<T>('GET', requestUrl, {
    method: 'GET',
    headers: DEFAULT_HEADERS,
    ...options,
  });
};

const post = <T>(url: string, body?: Record<string, any>, params?: Record<string, any>, options?: FetchOptions): Promise<T> => {
  const requestUrl = `${API_BASE_URL}${url}${buildQuery(params)}`;
  return request<T>('POST', requestUrl, {
    method: 'POST',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify(body ?? {}),
    ...options,
  });
};

const put = <T>(url: string, body?: Record<string, any>, params?: Record<string, any>, options?: FetchOptions): Promise<T> => {
  const requestUrl = `${API_BASE_URL}${url}${buildQuery(params)}`;
  return request<T>('PUT', requestUrl, {
    method: 'PUT',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify(body ?? {}),
    ...options,
  });
};

const patch = <T>(url: string, body?: Record<string, any>, params?: Record<string, any>, options?: FetchOptions): Promise<T> => {
  const requestUrl = `${API_BASE_URL}${url}${buildQuery(params)}`;
  return request<T>('PATCH', requestUrl, {
    method: 'PATCH',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify(body ?? {}),
    ...options,
  });
};

const del = <T>(url: string, params?: Record<string, any>, options?: FetchOptions): Promise<T> => {
  const requestUrl = `${API_BASE_URL}${url}${buildQuery(params)}`;
  return request<T>('DELETE', requestUrl, {
    method: 'DELETE',
    headers: DEFAULT_HEADERS,
    ...options,
  });
};

const postFormdata = <T>(url: string, body?: FormData, params?: Record<string, any>, options?: FetchOptions): Promise<T> => {
  const requestUrl = `${API_BASE_URL}${url}${buildQuery(params)}`;
  return request<T>('POST', requestUrl, {
    method: 'POST',
    body,
    ...options,
  });
};

const patchFormdata = <T>(url: string, body?: FormData, params?: Record<string, any>, options?: FetchOptions): Promise<T> => {
  const requestUrl = `${API_BASE_URL}${url}${buildQuery(params)}`;
  return request<T>('PATCH', requestUrl, {
    method: 'PATCH',
    body,
    ...options,
  });
};

const client = {
  get,
  post,
  put,
  patch,
  del,
  postFormdata,
  patchFormdata,
};

export default client;
