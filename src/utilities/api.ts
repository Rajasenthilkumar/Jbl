import envConfig from 'config/config';
import { getLoginData } from './auth.storage';

export interface ClientResponse<T> {
  status: number;
  data: T;
}

export interface ApiError {
  errorMessage: string;
  // biome-ignore lint/suspicious/noExplicitAny: data can be anything is not predictable
  data: any;
  status: number | null;
}

export async function api<T>(
  endpoint: string,
  { body, method, ...customConfig }: Partial<RequestInit> = {},
): Promise<ClientResponse<T>> {
  // API headers
  const headers: HeadersInit = { 'Content-Type': 'application/json' };

  // get user token from the store;
  const userData = getLoginData();
  // append the user token to the headers if it exists
  if (userData) {
    // biome-ignore lint/complexity/useLiteralKeys: <explanation>
    headers['Authorization'] = userData.token;
  }

  const config: RequestInit = {
    method: method,
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  // biome-ignore lint/suspicious/noImplicitAnyLet: its a type assertion
  let data;
  let status: number | null = null;
  const url = endpoint.startsWith('http')
    ? endpoint
    : `${envConfig.apiUrl}${endpoint}`;
  try {
    const response = await window.fetch(url, config);
    try {
      data = await response.json();
    } catch {
      data = null;
    }
    status = response.status;

    if (response.ok) {
      return {
        status,
        data,
      };
    }
    throw new Error(response.statusText);
    // biome-ignore lint/suspicious/noExplicitAny: its a type assertion
  } catch (err: any) {
    const error: ApiError = {
      errorMessage: err.message ?? '',
      data: data ?? null,
      status: status ?? null,
    };
    return Promise.reject(error);
  }
}

// Adding the GET method
api.get = <T>(endpoint: string, customConfig: Partial<RequestInit> = {}) =>
  api<T>(endpoint, { ...customConfig, method: 'GET' });

// Adding the POST method
api.post = <T>(
  endpoint: string,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  body: any,
  customConfig: Partial<RequestInit> = {},
) => api<T>(endpoint, { ...customConfig, body, method: 'POST' });

// Adding the PUT method
api.put = <T>(
  endpoint: string,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  body: any,
  customConfig: Partial<RequestInit> = {},
) => api<T>(endpoint, { ...customConfig, body, method: 'PUT' });

// Adding the DELETE method
api.delete = <T>(
  endpoint: string,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  body?: any,
  customConfig: Partial<RequestInit> = {},
) => api<T>(endpoint, { ...customConfig, body, method: 'DELETE' });
