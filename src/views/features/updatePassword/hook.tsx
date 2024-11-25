import { useApiHandler } from 'hooks/useApiHandler';
import { api } from 'utilities/api';
import type { ResetGuestPasswordFormType } from './GuestPassForm';

export const useGuestUpdatePassword = () => {
  const { loading, error, success, handleRequest } = useApiHandler(api.post);

  const updatePassword = async (
    UpdatePasswordForm: ResetGuestPasswordFormType & { token: string },
  ) => {
    return await handleRequest('/api/guest/reset-password', UpdatePasswordForm);
  };

  return {
    loading,
    error,
    success,
    updatePassword,
  };
};
