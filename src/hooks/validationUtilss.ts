// utils/validationUtils.ts (or any appropriate location)
import { useFormContext } from 'react-hook-form';

export const useFieldValidation = () => {
  const { trigger } = useFormContext();

  const validateField = async (fieldName: string) => {
    const isValid = await trigger(fieldName);
    return isValid;
  };

  return { validateField };
};
