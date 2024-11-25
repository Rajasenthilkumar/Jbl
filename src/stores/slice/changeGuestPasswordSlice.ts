import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { api } from 'utilities/api';
import { toastErrorDisplay } from 'utilities/toastErrorDisplay';

type ChangePasswordStatus = 'idle' | 'pending' | 'success' | 'rejected';

type ChangeGuestPasswordState = {
  changePassword: {
    status: ChangePasswordStatus;
  };
  isChangePasswordVisible: boolean;
};

export const changeGuestPassword = createAsyncThunk(
  'changeGuestPasswordSlice/changeGuestPassword',
  async (payload: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      const response = await api.post('/api/guest/change-password', payload);
      toast.success('Password updated successfully');
      return response.data;
    } catch (error) {
      toastErrorDisplay(error);
      throw error;
    }
  },
);

const initialState: ChangeGuestPasswordState = {
  changePassword: {
    status: 'idle',
  },
  isChangePasswordVisible: false,
};

const changeGuestPasswordSlice = createSlice({
  name: 'changeGuestPasswordSlice',
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
      .addCase(changeGuestPassword.pending, (state) => {
        state.changePassword.status = 'pending';
      })
      .addCase(changeGuestPassword.fulfilled, (state) => {
        state.changePassword.status = 'success';
        state.isChangePasswordVisible = false;
      })
      .addCase(changeGuestPassword.rejected, (state) => {
        state.changePassword.status = 'rejected';
      });
  },
});

export const { toggleChangePasswordVisibility, closeChangePasswordModal } =
  changeGuestPasswordSlice.actions;
export default changeGuestPasswordSlice.reducer;
