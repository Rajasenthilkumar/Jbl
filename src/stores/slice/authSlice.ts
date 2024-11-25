import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { GuestInfo, profileGuestDetails } from 'types/guest';
import type { HostInfo, profileDetails } from 'types/host';
import { api } from 'utilities/api';

interface AuthState {
  token: string | undefined;
  userId: number | undefined;
  mode: 'Host' | 'Guest';
  profileStatus: string | undefined;
  profileDetails?: profileDetails;
  profileGuestDetails?: profileGuestDetails;
  status: 'idle' | 'loading' | 'error' | 'success';
}

export const authInitialState = {
  token: undefined,
  userId: undefined,
  mode: 'Host',
  profileStatus: undefined,
  profileDetails: undefined,
  profileGuestDetails: undefined,
  status: 'idle',
} satisfies AuthState as AuthState;

export const fetchHostInfo = createAsyncThunk(
  'auth/fetchHost',
  async (userId: number) => {
    const response = await api.get<HostInfo>(`/api/host/${userId}`);
    return response.data;
  },
);

export const fetchGuestInfo = createAsyncThunk(
  'auth/fetchGuest',
  async (userId: number) => {
    const response = await api.get<GuestInfo>(`/api/guest/${userId}`);
    return response.data;
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    setAuthInfo(
      state,
      action: PayloadAction<{
        token: string;
        userId: number;
        mode: 'Host' | 'Guest';
      }>,
    ) {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.mode = action.payload.mode;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },

    cleanAuthInfo() {
      return authInitialState;
    },
    setProfileStatus(state, action: PayloadAction<string>) {
      state.profileStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHostInfo.fulfilled, (state, action) => {
        state.profileDetails = action.payload.result;
        state.profileStatus = action.payload.result.profile_status;
        state.status = 'success';
      })
      .addCase(fetchHostInfo.rejected, (state) => {
        state.profileStatus = 'error';
        state.status = 'error';
      })
      .addCase(fetchHostInfo.pending, (state) => {
        state.profileStatus = 'loading';
      })
      .addCase(fetchGuestInfo.fulfilled, (state, action) => {
        state.profileGuestDetails = action.payload.result;
        state.profileStatus = action.payload.result.profile_status;
        state.status = 'success';
      })
      .addCase(fetchGuestInfo.rejected, (state) => {
        state.profileStatus = 'error';
        state.status = 'error';
      })
      .addCase(fetchGuestInfo.pending, (state) => {
        state.profileStatus = 'loading';
      });
  },
});

export const { setAuthInfo, cleanAuthInfo, setToken, setProfileStatus } =
  authSlice.actions;

export default authSlice.reducer;
