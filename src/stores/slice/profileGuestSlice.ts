import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import type { RootState } from 'stores/types';
import type { DashboardType } from 'types/guest';
import { api } from 'utilities/api';
import { toastErrorDisplay } from 'utilities/toastErrorDisplay';
import type {
  AddCardDetailsSchema,
  EditCardDetailsSchema,
  EditGuestNameSchema,
} from 'views/features/guestProfile/schema';

interface ProfileGuestState<T> {
  changePassword: {
    status: 'idle' | 'pending' | 'success' | 'rejected';
  };
  guestDashboard: {
    status: 'idle' | 'pending' | 'success' | 'rejected';
    error: string | null;
    data?: T;
  };
  isChangePasswordVisible: boolean;
}

export const guestDashboard = createAsyncThunk(
  'guest-profile/guestDashboard',
  async () => {
    const response = await api.post<DashboardType>(
      '/api/guest/guest-details',
      {},
    );
    return response.data;
  },
);

export const editGuestNameDetails = createAsyncThunk(
  'guest-profile/editNameDetails',
  async (
    { profileData }: { profileData: EditGuestNameSchema },
    { getState },
  ) => {
    const state = getState() as RootState;
    const userId = state.auth.userId;

    if (!userId) {
      throw new Error('User ID is undefined.');
    }

    try {
      const response = await api.put(`/api/guest/${userId}`, {
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        email: profileData.email,
        phone: profileData.phone,
        country_code: profileData.country_code,
        image_url: profileData.image_url,
        bio: profileData.bio,
      });
      return response.data;
    } catch (error) {
      toastErrorDisplay(error);
      throw error;
    }
  },
);

export const editGuestCardDetails = createAsyncThunk(
  'guest-profile/editCardDetails',
  async ({ profileData }: { profileData: EditCardDetailsSchema }) => {
    try {
      const response = await api.post('api/guest/edit-card', {
        card_holder_name: profileData.card_holder_name,
        card_number: profileData.card_number,
        expiration_date: profileData.expiration_date,
        cvv: profileData.cvv,
      });
      return response.data;
    } catch (error) {
      toastErrorDisplay(error);
      throw error;
    }
  },
);

export const addCardDetails = createAsyncThunk(
  'card/add',
  async (cardDetails: AddCardDetailsSchema) => {
    const response = await api.post('/api/guest/add-card', cardDetails);
    return response.data;
  },
);

export const changeGuestPassword = createAsyncThunk(
  'guest-profile/changeGuestPassword',
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

const initialState: ProfileGuestState<DashboardType> = {
  changePassword: {
    status: 'idle',
  },
  guestDashboard: {
    status: 'idle',
    error: null,
    data: {
      result: {
        upcomingBookings: [],
        pastBookings: [],
        totalBookings: 0,
        rating: 0,
        totalReviews: 0,
      },
      sc: false,
      time: 0,
    },
  },
  isChangePasswordVisible: false,
};

const profileGuestSlice = createSlice({
  name: 'guestProfile',
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
      })

      .addCase(guestDashboard.pending, (state) => {
        state.guestDashboard.status = 'pending';
      })
      .addCase(guestDashboard.fulfilled, (state, action) => {
        state.guestDashboard.status = 'success';
        state.guestDashboard.data = action.payload;
      })

      .addCase(guestDashboard.rejected, (state, action) => {
        state.guestDashboard.status = 'rejected';
        state.guestDashboard.error =
          action.error.message || 'An error occurred';
      });
  },
});

export const { toggleChangePasswordVisibility, closeChangePasswordModal } =
  profileGuestSlice.actions;
export default profileGuestSlice.reducer;
