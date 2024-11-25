import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { api } from 'utilities/api';
import { toastErrorDisplay } from 'utilities/toastErrorDisplay';
import type { EditProfileNameSchema } from 'views/features/profile/schema';

export const editNameDetails = createAsyncThunk(
  'profile/editNameDetails',
  async ({
    profileData,
    profileType,
  }: { profileData: EditProfileNameSchema; profileType: string }) => {
    const response = await api.put(
      `/api/host/profile/${profileType === 'Juristic' ? 'juristic' : 'individual'}`,
      {
        profile: {
          other_details: {
            name: profileData.profile.other_details.name,
            sur_name: profileData.profile.other_details.sur_name,
            phone: profileData.profile.other_details.phone,
            country_code: profileData.profile.other_details.country_code,
            profile_image_url:
              profileData.profile.other_details.profile_image_url,
          },
        },
      },
    );
    return response.data;
  },
);

export const changeProfilePassword = createAsyncThunk(
  'profile/changeProfilePassword',
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

const profileSlice = createSlice({
  name: 'profile',
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
  profileSlice.actions;
export default profileSlice.reducer;
