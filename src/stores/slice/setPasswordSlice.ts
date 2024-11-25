import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { api } from 'utilities/api';
import { toastErrorDisplay } from 'utilities/toastErrorDisplay';

export const guestSetPassword = createAsyncThunk(
  'setPasswordSlice/guestSetPassword',
  async (payload: {
    identificationNumber: string;
  }) => {
    try {
      const response = await api.post('/api/guest/send-otp', payload);
      toast.success('OTP sent successfully');
      return response.data;
    } catch (error) {
      toastErrorDisplay(error);
      throw error;
    }
  },
);

export const guestVerifyOtp = createAsyncThunk(
  'setPasswordSlice/guestVerifyOtp',
  async (payload: {
    identificationNumber: string;
    otp: string;
  }) => {
    try {
      const response = await api.post('/api/guest/verify-otp', payload);
      toast.success('OTP VERIFIED');
      return response.data;
    } catch (error) {
      toastErrorDisplay(error);
      throw error;
    }
  },
);

export const guestUpdatePasssword = createAsyncThunk(
  'setPasswordSlice/guestUpdatePasssword',
  async (payload: {
    token: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      const response = await api.post('/api/guest/updatepassword', payload);

      // const response = await api.post(`/api/guest/updatepassword?token=${payload.token}`, payload);

      toast.success('PASSWORD UPDATED');
      return response.data;
    } catch (error) {
      toastErrorDisplay(error);
      throw error;
    }
  },
);
