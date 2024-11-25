import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { CustomerType } from 'types/getAllCustomers';
import type { HostInfo } from 'types/host';
import { api } from 'utilities/api';
import { toastErrorDisplay } from 'utilities/toastErrorDisplay';

export const fetchCustomer = createAsyncThunk(
  'customer/get-customer',
  async (userId: number) => {
    const response = await api.get<HostInfo>(`/api/host/${userId}`);
    return response.data;
  },
);

export const fetchCard = createAsyncThunk(
  'customer/get-cardDetails',
  async () => {
    try {
      const response = await api.get<CustomerType>(
        '/api/host/profile/get-customer',
      );
      return response.data;
    } catch (error) {
      toastErrorDisplay(error);
      throw error;
    }
  },
);

interface CustomerDetails<T> {
  status: 'idle' | 'pending' | 'success' | 'rejected';
  error: string | null;
  data?: T;
}

const initialState: {
  customerDetails: CustomerDetails<HostInfo>;
  cardDetails: CustomerDetails<CustomerType>;
} = {
  customerDetails: {
    status: 'idle',
    error: null,
    data: undefined,
  },
  cardDetails: {
    status: 'idle',
    error: null,
    data: undefined,
  },
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch customer
      .addCase(fetchCustomer.pending, (state) => {
        state.customerDetails.status = 'pending';
        state.customerDetails.error = null;
      })
      .addCase(fetchCustomer.fulfilled, (state, action) => {
        state.customerDetails.status = 'success';
        state.customerDetails.data = action.payload;
      })
      .addCase(fetchCustomer.rejected, (state, action) => {
        state.customerDetails.status = 'rejected';
        state.customerDetails.error =
          action.error.message || 'An error occurred';
      })
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

const customerReducer = customerSlice.reducer;
export default customerReducer;
