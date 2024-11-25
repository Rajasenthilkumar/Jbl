import { useApiHandler } from 'hooks/useApiHandler';
import { api } from 'utilities/api';
import type { SignUpFormType } from './schema';

export const useSignUp = () => {
  const { loading, error, success, handleRequest } = useApiHandler(api.post);

  const signUp = async (signUpForm: SignUpFormType) => {
    return await handleRequest('/api/host/register', signUpForm);
  };

  return {
    loading,
    error,
    success,
    signUp,
  };
};

export const useEmailVerification = () => {
  const { loading, error, success, handleRequest } = useApiHandler(api.post);

  const verifyMail = async (body: { token: string }) => {
    return await handleRequest('/api/host/verification', body);
  };

  return {
    loading,
    error,
    success,
    verifyMail,
  };
};

export const useResendEmail = () => {
  const { loading, error, success, handleRequest } = useApiHandler(api.post);
  const resendEmail = async (body: { email: string }) => {
    return await handleRequest('/api/host/profile/resend-email', body);
  };
  return {
    loading,
    error,
    success,
    resendEmail,
  };
};
