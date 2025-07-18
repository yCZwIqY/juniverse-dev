import ky from 'ky';
import { SuccessResponse } from 'shared-types';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const apiClient = ky.create({
  prefixUrl: `${apiUrl}/api`, // 기본 API URL
  timeout: 10000,
  hooks: {
    afterResponse: [
      async (request, options, response) => {
        const contentType = response.headers.get('content-type');
        if (contentType?.includes('application/json')) {
          const json = await response.clone().json();

          if ('errorCode' in json) {
            throw new Error(`${json.errorCode}: ${json.errorMsg}`);
          }
        }

        return response;
      },
    ],
  },
});

export const authApiClient = apiClient.create({
  prefixUrl: apiUrl,
  hooks: {
    beforeRequest: [
      (request) => {
        const token = localStorage.getItem('access_token');
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
  },
});

export const get = async <T>(url: string, params = {}): Promise<SuccessResponse<T>> => {
  const res = await apiClient.get(url, { searchParams: params });
  return res.json<SuccessResponse<T>>();
};

export const post = async <T, R = unknown>(url: string, body?: T): Promise<SuccessResponse<R>> => {
  const res = await apiClient.post(url, {
    headers: {
      'content-type': 'application/json',
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  return res.json<SuccessResponse<R>>();
};

export const postForm = async <T>(url: string, body?: FormData): Promise<SuccessResponse<T>> => {
  const res = await apiClient.post(url, {
    body,
  });

  return res.json<SuccessResponse<T>>();
};

export const put = async <T, R = unknown>(url: string, body?: T): Promise<SuccessResponse<R>> => {
  const res = await apiClient.put(url, {
    headers: {
      'content-type': 'application/json',
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  return res.json<SuccessResponse<R>>();
};
export const putForm = async <T>(url: string, body?: FormData): Promise<SuccessResponse<T>> => {
  const res = await apiClient.put(url, {
    body,
  });

  return res.json<SuccessResponse<T>>();
};

export const remove = async <T>(url: string, params = {}): Promise<SuccessResponse<T>> => {
  const res = await apiClient.delete(url, params);
  return res.json<SuccessResponse<T>>();
};

export const getAuth = async <T>(url: string, params = {}): Promise<SuccessResponse<T>> => {
  const res = await authApiClient.get(url, params);
  return res.json<SuccessResponse<T>>();
};

export const postAuth = async <T, R = unknown>(url: string, body?: T): Promise<SuccessResponse<R>> => {
  const res = await authApiClient.post(url, {
    headers: {
      'content-type': 'application/json',
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  return res.json<SuccessResponse<R>>();
};

export const putAuth = async <T, R = unknown>(url: string, body?: T): Promise<SuccessResponse<R>> => {
  const res = await authApiClient.put(url, {
    headers: {
      'content-type': 'application/json',
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  return res.json<SuccessResponse<R>>();
};

export const removeAuth = async <T>(url: string, params = {}): Promise<SuccessResponse<T>> => {
  const res = await authApiClient.delete(url, params);
  return res.json<SuccessResponse<T>>();
};
