import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { CustomerType } from 'types/getAllCustomers';
import { api } from 'utilities/api';
import { toastErrorDisplay } from 'utilities/toastErrorDisplay';
import type {
  AddCardDetailsSchema,
  EditCompanySchema,
  EditEmergencyDetailsSchema,
  EditWebsiteDetailsSchema,
} from './schema';

export const editCompanyDetails = createAsyncThunk(
  'company/edit',
  async ({
    profileData,
    profileType,
  }: {
    profileData: EditCompanySchema;
    profileType: string;
  }) => {
    const response = await api.put(
      `/api/host/profile/${profileType === 'Juristic' ? 'juristic' : 'individual'}`,
      profileData,
    );
    return response.data;
  },
);

export const fetchCard = createAsyncThunk('card/get-cardDetails', async () => {
  try {
    const response = await api.post<CustomerType>(
      '/api/guest/get-customer',
      {},
    );
    return response.data;
  } catch (error) {
    toastErrorDisplay(error);
    throw error;
  }
});

export const deleteCard = createAsyncThunk(
  'card/delete',
  async (authorization_code: string) => {
    try {
      const response = await api.get(
        `/api/host/profile/deactivateCard/${authorization_code}`,
      );
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
    const response = await api.post('/api/host/profile/add-card', cardDetails);
    return response.data;
  },
);

export const editEmergencydetails = createAsyncThunk(
  'emergency/edit',
  async ({
    emergencyDetails,
    profileType,
  }: {
    emergencyDetails: EditEmergencyDetailsSchema;
    profileType: string;
  }) => {
    const response = await api.put(
      `/api/host/profile/${profileType === 'Juristic' ? 'juristic' : 'individual'}`,
      {
        profile: {
          other_details: {
            alternative_contact_number:
              emergencyDetails.alternative_contact_number,
          },
        },
      },
    );
    return response.data;
  },
);

export const editWebsitedetails = createAsyncThunk(
  'link/edit',
  async ({
    websiteDetails,
    profileType,
  }: {
    websiteDetails: EditWebsiteDetailsSchema;
    profileType: string;
  }) => {
    const response = await api.put(
      `/api/host/profile/${profileType === 'Juristic' ? 'juristic' : 'individual'}`,
      {
        profile: {
          other_details: {
            company_website: websiteDetails.company_website,
          },
        },
      },
    );
    return response.data;
  },
);

interface CustomerDetails<T> {
  status: 'idle' | 'pending' | 'success' | 'rejected';
  error: string | null;
  data?: T;
}

const initialState: {
  cardDetails: CustomerDetails<CustomerType>;
} = {
  cardDetails: {
    status: 'idle',
    error: null,
    data: undefined,
  },
};

const GuestCardSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch card
      .addCase(fetchCard.pending, (state) => {
        state.cardDetails.status = 'pending';
        state.cardDetails.error = null;
      })
      .addCase(fetchCard.fulfilled, (state, action) => {
        state.cardDetails.status = 'success';
        state.cardDetails.data = action.payload;
      })
      .addCase(fetchCard.rejected, (state, action) => {
        state.cardDetails.status = 'rejected';
        state.cardDetails.error = action.error.message || 'An error occurred';
      });
  },
});

const guestCardReducer = GuestCardSlice.reducer;
export default guestCardReducer;
