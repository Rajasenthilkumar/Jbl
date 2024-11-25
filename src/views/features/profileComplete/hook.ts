import { useAppSelector } from 'hooks/redux';
import { useApiHandler } from 'hooks/useApiHandler';
import { ProfileStatus } from 'types/host';
import { api } from 'utilities/api';
import type { IndividualApiSchema } from './individual/IndividualSchema';
import type { JuristicEntityApiSchema } from './juristicEntity/JuristicEntitySchema';

export const useHostProfileIndividual = () => {
  const { loading, error, success, handleRequest } = useApiHandler(api.post);

  const postProfileIndividual = async (payload: IndividualApiSchema) => {
    return await handleRequest('/api/host/profile/individual', payload);
  };

  return {
    loading,
    error,
    success,
    postProfileIndividual,
  };
};

export const useHostProfileJuristic = () => {
  const { loading, error, success, handleRequest } = useApiHandler(api.post);

  const postProfileJuristic = async (payload: JuristicEntityApiSchema) => {
    return await handleRequest('/api/host/profile/juristic', payload);
  };

  return {
    loading,
    error,
    success,
    postProfileJuristic,
  };
};

export const useSkipProfile = () => {
  const { loading, error, success, handleRequest } = useApiHandler(api.post);
  const userId = useAppSelector((state) => state.auth.userId);

  const skipProfile = async () => {
    return await handleRequest(`/api/host/profile/update-status/${userId}`, {
      profile_status: ProfileStatus.SKIP,
    });
  };

  return {
    loading,
    error,
    success,
    skipProfile,
  };
};

export const useCompleteProfile = () => {
  const { loading, error, success, handleRequest } = useApiHandler(api.post);
  const userId = useAppSelector((state) => state.auth.userId);

  const completeProfile = async () => {
    return await handleRequest(`/api/host/profile/update-status/${userId}`, {
      profile_status: ProfileStatus.COMPLETED,
    });
  };

  return {
    loading,
    error,
    success,
    completeProfile,
  };
};
