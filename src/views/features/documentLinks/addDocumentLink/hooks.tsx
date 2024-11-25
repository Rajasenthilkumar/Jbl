import { useApiHandler } from 'hooks/useApiHandler';
import { api } from 'utilities/api';
import type { AddDocumentEntitySchema } from './schema';

export const useAddDocument = () => {
  const { loading, error, success, handleRequest } = useApiHandler(api.post);

  const AddingDocument = async (AddDocumentForm: AddDocumentEntitySchema) => {
    return await handleRequest('/api/documents/create', AddDocumentForm);
  };

  return {
    loading,
    error,
    success,
    AddingDocument,
  };
};
