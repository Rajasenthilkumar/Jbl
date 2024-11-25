import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { BookingIncident } from 'types/damageWaiver';
import { api } from 'utilities/api';

type PayloadIncident = {
  guest_id: number;
  booking_id: number;
  incident_reports: {
    description: string;
    amount: string;
    curency_type: string;
    covered_by_dw: boolean;
    claim_type_id: number;
    incident_report_images: { image_url: string }[];
  }[];
};

interface DamageWaiverState {
  data: BookingIncident[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DamageWaiverState = {
  data: [],
  status: 'idle',
  error: null,
};

export const createIncidentReport = createAsyncThunk<
  BookingIncident[],
  PayloadIncident
>('damageWaiver/createIncidentReport', async (payload: PayloadIncident) => {
  const response = await api.post<BookingIncident[]>(
    '/incident-report/create',
    payload,
  );
  return response.data;
});

const damageWaiverSlice = createSlice({
  name: 'damageWaiver',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createIncidentReport.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createIncidentReport.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(createIncidentReport.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

const damageWaiverReducer = damageWaiverSlice.reducer;
export default damageWaiverReducer;
