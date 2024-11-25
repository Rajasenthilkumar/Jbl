import { useApiHandler } from 'hooks/useApiHandler';
import { api } from 'utilities/api';
import type { LoginFormType } from './Form';
import type { LoginResponse } from './types';

export const useLogin = () => {
  const { loading, error, success, handleRequest } =
    useApiHandler<LoginResponse>(api.post);

  const login = async (loginForm: LoginFormType) => {
    const endpoint =
      loginForm.mode === 'Host' ? '/api/host/login' : '/api/guest/login';
    return await handleRequest(endpoint, loginForm);
  };

  return {
    loading,
    error,
    success,
    login,
  };
};
