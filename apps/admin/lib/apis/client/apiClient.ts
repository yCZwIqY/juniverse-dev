import ky from 'ky';

const apiUrl = process.env.NEXT_API_URL ?? process.env.NEXT_PUBLIC_API_URL;

export const apiClient = ky.create({
  prefixUrl: `${apiUrl}/api`, // 기본 API URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
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

export const get = async <T>(url: string, params = {}): Promise<T> => {
  const res = await apiClient.get(url, params);
  return res.json<T>();
};
export const post = async <T, R = unknown>(url: string, body?: T): Promise<R> => {
  const res = await apiClient.post(url, {
    ...(body && { body: JSON.stringify(body) }),
  });

  return res.json<R>();
};
export const put = async <T, R = unknown>(url: string, body?: T): Promise<R> => {
  const res = await apiClient.put(url, {
    ...(body && { body: JSON.stringify(body) }),
  });

  return res.json<R>();
};
export const remove = async <T>(url: string, params = {}): Promise<T> => {
  const res = await apiClient.delete(url, params);
  return res.json<T>();
};
