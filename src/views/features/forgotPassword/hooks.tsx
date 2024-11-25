import { useApiHandler } from 'hooks/useApiHandler';
import { api } from 'utilities/api';
import type { ForgetPasswordFormType } from './Form';

type ForgetPasswordResponse = {
  data: {
    result: {
      email: string;
      message: string;
      verificationToken: string;
    };
    sc: boolean;
    time: number;
  };
};

export const useForgertPassword = () => {
  const { loading, error, success, handleRequest } = useApiHandler(api.post);

  const forgetPassword = async (forgetPasswordForm: ForgetPasswordFormType) => {
    const endpoint =
      forgetPasswordForm.mode === 'Host'
        ? '/api/host/forgot-password'
        : '/api/guest/forgot-password';
    const response = await handleRequest(endpoint, forgetPasswordForm);
    return response as ForgetPasswordResponse;
  };

  return {
    loading,
    error,
    success,
    forgetPassword,
  };
};
