import {
  LOGIN_STORAGE_KEY,
  REMEMBER_ME_GUEST_STORAGE_KEY,
  REMEMBER_ME_HOST_STORAGE_KEY,
} from 'constants/localStorageKeys';
import { z } from 'zod';

const LoginSchema = z.object({
  token: z.string(),
  id: z.number(),
  mode: z.string(),
});

const RememberMeSchema = z.object({
  email: z.string().optional(),
  remember_me: z.boolean(),
});
const RememberGuestSchema = z.object({
  id_number: z.string().optional(),
  remember_me: z.boolean(),
});

type Login = z.infer<typeof LoginSchema>;
type RememberMe = z.infer<typeof RememberMeSchema>;
type RememberGuest = z.infer<typeof RememberGuestSchema>;

export const saveLoginDataToLocal = (value: Login) => {
  try {
    LoginSchema.parse(value);
    localStorage.setItem(LOGIN_STORAGE_KEY, JSON.stringify(value));
  } catch (error) {
    console.error('Failed to save login data:', error);
  }
};

export const saveRememberMeDataToLocal = (value: RememberMe) => {
  try {
    RememberMeSchema.parse(value);
    localStorage.setItem(REMEMBER_ME_HOST_STORAGE_KEY, JSON.stringify(value));
  } catch (error) {
    console.error('Failed to save Remember-Me data', error);
  }
};
export const getRememberMeData = (): RememberMe | null => {
  let storedValue = sessionStorage.getItem(LOGIN_STORAGE_KEY);

  if (!storedValue) {
    storedValue = localStorage.getItem(REMEMBER_ME_HOST_STORAGE_KEY);
  }

  if (storedValue) {
    try {
      const parsedValue = JSON.parse(storedValue);
      return RememberMeSchema.parse(parsedValue);
    } catch (error) {
      console.error('Failed to retrieve or validate remember-me data:', error);
      return null;
    }
  }

  return null;
};

export const saveRememberGuestDataToLocal = (value: RememberGuest) => {
  try {
    RememberGuestSchema.parse(value);
    localStorage.setItem(REMEMBER_ME_GUEST_STORAGE_KEY, JSON.stringify(value));
  } catch (error) {
    console.error('Failed to save Remember-Me data', error);
  }
};
export const getRememberGuestData = (): RememberGuest | null => {
  let storedValue = sessionStorage.getItem(LOGIN_STORAGE_KEY);

  if (!storedValue) {
    storedValue = localStorage.getItem(REMEMBER_ME_GUEST_STORAGE_KEY);
  }

  if (storedValue) {
    try {
      const parsedValue = JSON.parse(storedValue);
      return RememberGuestSchema.parse(parsedValue);
    } catch (error) {
      console.error('Failed to retrieve or validate remember-me data:', error);
      return null;
    }
  }

  return null;
};

export const getLoginData = (): Login | null => {
  let storedValue = sessionStorage.getItem(LOGIN_STORAGE_KEY);

  if (!storedValue) {
    storedValue = localStorage.getItem(LOGIN_STORAGE_KEY);
  }

  if (storedValue) {
    try {
      const parsedValue = JSON.parse(storedValue);
      return LoginSchema.parse(parsedValue);
    } catch (error) {
      console.error('Failed to retrieve or validate login data:', error);
      return null;
    }
  }

  return null;
};

export const removeLoginData = () => {
  localStorage.removeItem(LOGIN_STORAGE_KEY);
};
