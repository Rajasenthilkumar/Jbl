import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { api } from 'utilities/api';
import { toastErrorDisplay } from 'utilities/toastErrorDisplay';

export const changeProfilePassword = createAsyncThunk(
  'changeProfilePasswordSlice/changeProfilePassword',
  async (payload: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      const response = await api.post(
        '/api/host/profile/change-password',
        payload,
      );
      toast.success('Password updated successfully');
      return response.data;
    } catch (error) {
      toastErrorDisplay(error);
      throw error;
    }
  },
);

const initialState = {
  changePassword: {
    status: 'idle',
  },
  isChangePasswordVisible: false,
};

const changeProfilePasswordSlice = createSlice({
  name: 'changeProfilePasswordSlice',
  initialState,
  reducers: {
    toggleChangePasswordVisibility(state) {
      state.isChangePasswordVisible = !state.isChangePasswordVisible;
    },
    closeChangePasswordModal(state) {
      state.isChangePasswordVisible = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changeProfilePassword.pending, (state) => {
        state.changePassword.status = 'pending';
      })
      .addCase(changeProfilePassword.fulfilled, (state) => {
        state.changePassword.status = 'success';
        state.isChangePasswordVisible = false;
      })
      .addCase(changeProfilePassword.rejected, (state) => {
        state.changePassword.status = 'rejected';
      });
  },
});

export const { toggleChangePasswordVisibility, closeChangePasswordModal } =
  changeProfilePasswordSlice.actions;
export default changeProfilePasswordSlice.reducer;
