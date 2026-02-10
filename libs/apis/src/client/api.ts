const BASE_URL = process.env.NEXT_API_URL ?? process.env.NEXT_PUBLIC_API_URL;
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

/** GET */
const get = <T>(url: string, params?: Record<string, any>, options?: FetchOptions): Promise<T> => {
  const query = buildQuery(params);
  return fetch(`${BASE_URL}${url}${query}`, {
    method: 'GET',
    headers: DEFAULT_HEADERS,
    ...options,
  }).then((res) => res.json());
};

/** POST */
const post = <T>(url: string, body?: Record<string, any>, params?: Record<string, any>, options?: FetchOptions): Promise<T> => {
  const query = buildQuery(params);
  return fetch(`${BASE_URL}${url}${query}`, {
    method: 'POST',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify(body ?? {}),
    ...options,
  }).then((res) => res.json());
};

const postFormdata = <T>(url: string, body?: FormData, params?: Record<string, any>, options?: FetchOptions): Promise<T> => {
  const query = buildQuery(params);
  return fetch(`${BASE_URL}${url}${query}`, {
    method: 'POST',
    body,
    ...options,
  }).then((res) => res.json());
};

const patchFormdata = <T>(url: string, body?: FormData, params?: Record<string, any>, options?: FetchOptions): Promise<T> => {
  const query = buildQuery(params);
  return fetch(`${BASE_URL}${url}${query}`, {
    method: 'PATCH',
    body,
    ...options,
  }).then((res) => res.json());
};

/** PATCH */
const patch = <T>(url: string, body?: Record<string, any>, params?: Record<string, any>, options?: FetchOptions): Promise<T> => {
  const query = buildQuery(params);
  return fetch(`${BASE_URL}${url}${query}`, {
    headers: DEFAULT_HEADERS,
    body: JSON.stringify(body ?? {}),
    ...options,
    method: 'PATCH',
  }).then((res) => res.json());
};

/** PUT */
const put = <T>(url: string, body?: Record<string, any>, params?: Record<string, any>, options?: FetchOptions): Promise<T> => {
  const query = buildQuery(params);
  return fetch(`${BASE_URL}${url}${query}`, {
    method: 'PUT',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify(body ?? {}),
    ...options,
  }).then((res) => res.json());
};

/** DELETE */
const del = <T>(url: string, params?: Record<string, any>, options?: FetchOptions): Promise<T> => {
  const query = buildQuery(params);
  return fetch(`${BASE_URL}${url}${query}`, {
    method: 'DELETE',
    headers: DEFAULT_HEADERS,
    ...options,
  }).then((res) => res.json());
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
