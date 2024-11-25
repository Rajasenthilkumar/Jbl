import {
  type PayloadAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import type { RootState } from 'stores/types';
import { api } from 'utilities/api';
import { toastErrorDisplay } from 'utilities/toastErrorDisplay';
import type {
  ApiResponse,
  BookingDetails,
  DamageProtection,
  GetYourDetails,
  GuestBookingVerificationState,
  ManualPropertyDetails,
  UpdateGuestPayload,
} from 'views/features/bookingVerification/type';

export const getBookingDetails = createAsyncThunk<
  BookingDetails,
  { token: string }
>('guestBookingVerification/getBookingDetails', async ({ token }) => {
  try {
    const response = await api.post<ApiResponse>(
      `/api/guest/guest-booking-property?token=${token}`,
      {},
    );
    const { booking, property, guestDetails } = response.data.result;
    const propertyDocuments = property.propertyDocuments || [];
    const documentUrls = propertyDocuments
      .filter((doc) => doc.document_id.is_visible)
      .map((doc) => doc.document_id.document_url)
      .filter((url) => url !== null);

    return {
      bookingDate: booking.createdAt,
      protectionReference: booking.protectionRef,
      bookingReference: booking.bookingReference,
      checkIn: booking.CheckInDate,
      checkOut: booking.CheckOutDate,
      guests: booking.TotalGuest,
      nights:
        (new Date(booking.CheckOutDate).getTime() -
          new Date(booking.CheckInDate).getTime()) /
        (1000 * 3600 * 24),
      propertyImage: property.manualProperty.propertyImage,
      propertyName: property.manualProperty.propertyName,
      propertyLocation: property.manualProperty.propertyLocation,
      damage_protection_id: property.manualProperty.damage_protection_id,
      refundAmount: property.manualProperty.refundAmount,
      refundCurrencyType: property.manualProperty.refundCurrencyType,
      nonRefundCurrencyType: property.manualProperty.nonRefundCurrencyType,
      nonRefundAmount: property.manualProperty.nonRefundAmount,
      name: property.host.name,
      host_created_at: property.host.created_at,
      propertyDocuments_url: documentUrls,
      id_number: guestDetails.id_number,
      first_name: guestDetails.first_name,
      last_name: guestDetails.last_name,
      phone: guestDetails.phone,
      email: guestDetails.email,
      id_document: guestDetails.id_document,
      // guestDetails_country: guestDetails.country,
      // guestDetails_select_type: guestDetails.select_type,
      country_code: guestDetails.country_code,
      created_at: guestDetails.created_at,
      updated_at: guestDetails.updated_at,
    } as unknown as BookingDetails;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

// export const fetchDamageProtection = createAsyncThunk<
//   DamageProtection,
//   { guestToken: string }
// >('guestBookingVerification/fetchDamageProtection', async ({ guestToken }) => {
//   try {
//     const response = await api.get('/api/properties/get-damage-protection', {
//       headers: {
//         Authorization: guestToken,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     // biome-ignore lint/suspicious/noConsoleLog: <explanation>
//     console.log(error);
//   }
// });

export const fetchDamageProtection = createAsyncThunk<
  DamageProtection,
  { guestToken: string }
>('guestBookingVerification/fetchDamageProtection', async ({ guestToken }) => {
  try {
    const response = await api.get('/api/properties/get-damage-protection', {
      headers: {
        Authorization: guestToken,
      },
    });
    return response.data as DamageProtection;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch damage protection data');
  }
});

export const updateGuestDetails = createAsyncThunk(
  'guestbookingverfication/getYourDetails',
  async ({
    token,
    payload,
  }: { token: string; payload: UpdateGuestPayload }) => {
    try {
      const response = await api.put<GetYourDetails>(
        `/api/guest/update-guest?token=${token}`,
        payload,
      );

      toast.success('Details updated successfully');
      return response.data;
    } catch (error) {
      toastErrorDisplay(error);
      throw error;
    }
  },
);

const initialState: GuestBookingVerificationState = {
  updateGuest: {
    status: 'idle',
    error: null,
  },
  getBooking: {
    status: 'idle',
    error: null,
    data: null,
  },
  getYourDetails: {
    status: 'idle',
    error: null,
    data: null,
    token: '',
  },
  manualPropertyDetails: null,
  damageProtection: {
    status: 'idle',
    error: null,
    data: null,
  },
  documentUrl: [] as Document[],
  // selectedDocumentLoading: false,
  // selectedDocument: {
  //   id: 0,
  //   document_title: '',
  //   is_visible: false,
  //   is_terms_accepted: false,
  //   is_deleted: false,
  //   document_url: null,
  //   document_link: null,
  //   document_type_id: 0,
  //   documentType: {
  //     id: 0,
  //     name: '',
  //     created_at: '',
  //     updated_at: '',
  //   },
  //   propertyDocuments: [],
  // },
  error: null,
};

const guestBookingVerificationSlice = createSlice({
  name: 'guestBookingVerification',
  initialState,
  reducers: {
    setManualPropertyDetails(
      state,
      action: PayloadAction<ManualPropertyDetails>,
    ) {
      state.manualPropertyDetails = action.payload;
    },
    clearManualPropertyDetails(state) {
      state.manualPropertyDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBookingDetails.pending, (state) => {
        state.getBooking.status = 'pending';
      })
      .addCase(
        getBookingDetails.fulfilled,
        (state, action: PayloadAction<BookingDetails>) => {
          state.getBooking.status = 'succeeded';
          state.getBooking.data = action.payload;
          state.getBooking.error = null;
        },
      )
      .addCase(getBookingDetails.rejected, (state, action) => {
        state.getBooking.status = 'rejected';
        state.getBooking.error =
          action.error.message || 'Failed to load property details';
      })
      .addCase(fetchDamageProtection.pending, (state) => {
        state.damageProtection.status = 'pending';
      })
      .addCase(fetchDamageProtection.fulfilled, (state, action) => {
        state.damageProtection.status = 'succeeded';
        state.damageProtection.data = action.payload;
      })
      .addCase(fetchDamageProtection.rejected, (state, action) => {
        state.damageProtection.status = 'rejected';
        state.damageProtection.error = action.error.message ?? 'Unknown Error';
      })

      .addCase(updateGuestDetails.pending, (state) => {
        state.getYourDetails.status = 'pending';
      })
      .addCase(updateGuestDetails.fulfilled, (state, action) => {
        state.getYourDetails.status = 'succeeded';
        state.getYourDetails.data = action.payload;
        state.getYourDetails.error = null;
      })
      .addCase(updateGuestDetails.rejected, (state, action) => {
        state.getYourDetails.status = 'rejected';
        state.getYourDetails.error =
          action.error.message || 'Failed to update guest details';
      });
  },
});

// Export the actions
export const { setManualPropertyDetails, clearManualPropertyDetails } =
  guestBookingVerificationSlice.actions;

export const addDamageProtection = (state: RootState) =>
  state.properties.damageProtection.data?.result;

// Export the reducer
export default guestBookingVerificationSlice.reducer;
