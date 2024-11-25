import { useApiHandler } from 'hooks/useApiHandler';
import { api } from 'utilities/api';
import type { ResetPasswordFormType } from './Form';

export const useUpdatePassword = () => {
  const { loading, error, success, handleRequest } = useApiHandler(api.post);

  const updatePassword = async (
    UpdatePasswordForm: ResetPasswordFormType & { token: string },
  ) => {
    return await handleRequest('/api/host/update-password', UpdatePasswordForm);
  };

  return {
    loading,
    error,
    success,
    updatePassword,
  };
};
