import toast from 'react-hot-toast';
import { cleanAuthInfo } from 'stores/slice/authSlice';
import { resetPropertySlice } from 'stores/slice/propertiesSlice';
import store from 'stores/store';
import { removeLoginData } from './auth.storage';

export const logout = () => {
  // clean the auth redux
  store.dispatch(cleanAuthInfo());
  // clean the property redux
  store.dispatch(resetPropertySlice());
  // clean the local storage
  removeLoginData();
  toast.success('Logout successfully', {
    duration: 1000,
  });
};
