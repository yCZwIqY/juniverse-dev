const BASE_URL = process.env.NEXT_API_URL;
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

type FetchOptions = Omit<RequestInit, 'method' | 'body'> & {
  next?: { tags?: string[]; revalidate?: number };
};

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
  const durationMs = Date.now() - startedAt;
  const statusText = typeof status === 'number' ? ` ${status}` : '';
  console.log(`[api] ${method} ${url}${statusText} (${durationMs}ms)`);
};

/** GET */
const get = <T>(url: string, params?: Record<string, any>, options?: FetchOptions): Promise<T> => {
  const query = buildQuery(params);
  const requestUrl = `${BASE_URL}${url}${query}`;
  const startedAt = Date.now();
  return fetch(requestUrl, {
    method: 'GET',
    headers: DEFAULT_HEADERS,
    ...options,
  }).then((res) => {
    logFetch('GET', requestUrl, startedAt, res.status);
    return res.json();
  });
};

/** POST */
const post = <T>(url: string, body?: Record<string, any>, params?: Record<string, any>, options?: FetchOptions): Promise<T> => {
  const query = buildQuery(params);
  const requestUrl = `${BASE_URL}${url}${query}`;
  const startedAt = Date.now();
  return fetch(requestUrl, {
    method: 'POST',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify(body ?? {}),
    ...options,
  }).then((res) => {
    logFetch('POST', requestUrl, startedAt, res.status);
    return res.json();
  });
};

const postFormdata = <T>(url: string, body?: FormData, params?: Record<string, any>, options?: FetchOptions): Promise<T> => {
  const query = buildQuery(params);
  const requestUrl = `${BASE_URL}${url}${query}`;
  const startedAt = Date.now();
  return fetch(requestUrl, {
    method: 'POST',
    body,
    ...options,
  }).then((res) => {
    logFetch('POST', requestUrl, startedAt, res.status);
    return res.json();
  });
};

const patchFormdata = <T>(url: string, body?: FormData, params?: Record<string, any>, options?: FetchOptions): Promise<T> => {
  const query = buildQuery(params);
  const requestUrl = `${BASE_URL}${url}${query}`;
  const startedAt = Date.now();
  return fetch(requestUrl, {
    method: 'PATCH',
    body,
    ...options,
  }).then((res) => {
    logFetch('PATCH', requestUrl, startedAt, res.status);
    return res.json();
  });
};

/** PATCH */
const patch = <T>(url: string, body?: Record<string, any>, params?: Record<string, any>, options?: FetchOptions): Promise<T> => {
  const query = buildQuery(params);
  const requestUrl = `${BASE_URL}${url}${query}`;
  const startedAt = Date.now();
  return fetch(requestUrl, {
    headers: DEFAULT_HEADERS,
    body: JSON.stringify(body ?? {}),
    ...options,
    method: 'PATCH',
  }).then((res) => {
    logFetch('PATCH', requestUrl, startedAt, res.status);
    return res.json();
  });
};

/** PUT */
const put = <T>(url: string, body?: Record<string, any>, params?: Record<string, any>, options?: FetchOptions): Promise<T> => {
  const query = buildQuery(params);
  const requestUrl = `${BASE_URL}${url}${query}`;
  const startedAt = Date.now();
  return fetch(requestUrl, {
    method: 'PUT',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify(body ?? {}),
    ...options,
  }).then((res) => {
    logFetch('PUT', requestUrl, startedAt, res.status);
    return res.json();
  });
};

/** DELETE */
const del = <T>(url: string, params?: Record<string, any>, options?: FetchOptions): Promise<T> => {
  const query = buildQuery(params);
  const requestUrl = `${BASE_URL}${url}${query}`;
  const startedAt = Date.now();
  return fetch(requestUrl, {
    method: 'DELETE',
    headers: DEFAULT_HEADERS,
    ...options,
  }).then((res) => {
    logFetch('DELETE', requestUrl, startedAt, res.status);
    return res.json();
  });
};

const api = {
  get,
  patch,
  put,
  post,
  del,
  postFormdata,
  patchFormdata,
};

export default api;
