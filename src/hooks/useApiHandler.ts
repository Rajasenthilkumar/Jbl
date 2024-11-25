import { useState } from 'react';
import type { ApiError, ClientResponse } from 'utilities/api';

// Define the type for the API function signature
type ApiFunction<T> = (
  endpoint: string,
  // biome-ignore lint/suspicious/noExplicitAny: body is dynamic
  body?: any,
  customConfig?: Partial<RequestInit>,
) => Promise<ClientResponse<T>>;

export const useApiHandler = <T>(apiFunction: ApiFunction<T>) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [success, setSuccess] = useState(false);

  const handleRequest = async (
    endpoint: string,
    // biome-ignore lint/suspicious/noExplicitAny: body is dynamic
    body?: any,
    customConfig?: Partial<RequestInit>,
  ) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await apiFunction(endpoint, body, customConfig);
      setSuccess(true);
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      setError(apiError);
      throw apiError;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    handleRequest,
  };
};
