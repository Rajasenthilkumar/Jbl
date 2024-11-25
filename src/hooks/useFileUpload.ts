import type { RcFile } from 'antd/es/upload';
import envConfig from 'config/config';
import { useState } from 'react';
import store from 'stores/store';
import { type ApiError, api } from 'utilities/api';
import { useApiHandler } from './useApiHandler';

export interface FileUploadResponse {
  result: Result;
  sc: boolean;
  time: number;
}

export interface Result {
  key: string;
  fileUrl: string;
}

export interface Metadata {
  httpStatusCode: number;
  requestId: string;
  extendedRequestId: string;
  attempts: number;
  totalRetryDelay: number;
}

export const useFileUpload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const uploadFile = async (file: string | Blob | RcFile | File) => {
    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    setError(null);
    setSuccess(false);

    const userToken = store.getState().auth.token;
    const headers: HeadersInit = {};

    if (userToken) {
      headers.Authorization = userToken;
    }

    try {
      const response = await fetch(`${envConfig.apiUrl}/api/file/upload`, {
        method: 'POST',
        body: formData,
        headers: headers,
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data: FileUploadResponse = await response.json();
      setSuccess(true);
      return data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Unknown error occurred';

      const apiError: ApiError = {
        errorMessage,
        data: null,
        status: err instanceof Response ? err.status : null,
      };

      setError(errorMessage);
      return Promise.reject(apiError);
    } finally {
      setLoading(false);
    }
  };

  const uploadFileWithToken = async (
    file: string | Blob | RcFile | File,
    token: string,
  ) => {
    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    setError(null);
    setSuccess(false);

    const headers: HeadersInit = {};

    if (token) {
      headers.Authorization = token;
    }

    try {
      const response = await fetch(`${envConfig.apiUrl}/api/file/upload`, {
        method: 'POST',
        body: formData,
        headers: headers,
      });

      if (!response.ok) {
        console.error('Error response:', response);
      }

      const data: FileUploadResponse = await response.json();
      setSuccess(true);
      return data;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    uploadFile,
    uploadFileWithToken,
  };
};

export const useDeleteFile = () => {
  const { loading, error, success, handleRequest } =
    useApiHandler<FileUploadResponse>(api.post);

  const deleteFile = async (fileId: string) => {
    return await handleRequest('/api/file/delete', {
      id: fileId,
    });
  };

  return {
    loading,
    error,
    success,
    deleteFile,
  };
};

export const useDeleteFileWithToken = () => {
  const { loading, error, success, handleRequest } =
    useApiHandler<FileUploadResponse>(api.post);

  const deleteFileWithToken = async (
    fileId: string,
    token: string | undefined,
  ) => {
    const headers: HeadersInit = {};

    if (token) {
      headers.Authorization = token;
    }

    return await handleRequest(
      '/api/file/delete',
      {
        id: fileId,
      },
      {
        headers,
      },
    );
  };

  return {
    loading,
    error,
    success,
    deleteFileWithToken,
  };
};
