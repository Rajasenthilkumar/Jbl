import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DEFAULT_PAGE_LIMIT } from 'constants/pageLimit';
import { createAppAsyncThunk } from 'hooks/redux';
import { api } from 'utilities/api';
import { toastErrorDisplay } from 'utilities/toastErrorDisplay';
import type {
  AllProperties,
  BookingFormType,
  Data,
  GetAllPropertiesResponse,
  GetBookingsResponse,
  MetaData,
  PropertyFormType,
  PropertyType,
  Result,
  SortByOrder,
} from 'views/features/bookings/types';

interface BookingState {
  upcomingBookingData: Data[];
  currentBookingData: Data[];
  pastBookingData: Data[];
  totalUpcomingData: number;
  totalPastData: number;
  totalCurrentData: number;
  currentPaginationData: MetaData;
  pastPaginationData: MetaData;
  upcomingPaginationData: MetaData;
  propertiesData: PropertyType[];
  status: 'idle' | 'pending' | 'succeeded' | 'rejected';
  propertyStatus: 'idle' | 'pending' | 'succeeded' | 'rejected';
  error: string | null;
  sortByOrder: SortByOrder;
  lastUpdated: string | null;
  openNewBooking: boolean;
  openNewBookingSuccessModal: boolean;
}

const initialState: BookingState = {
  upcomingBookingData: [],
  currentBookingData: [],
  pastBookingData: [],
  propertiesData: [],
  totalUpcomingData: 0,
  totalPastData: 0,
  totalCurrentData: 0,
  currentPaginationData: {
    total: 1,
    totalPages: 1,
    pageNumber: 1,
    pageLimit: DEFAULT_PAGE_LIMIT,
  },
  pastPaginationData: {
    total: 1,
    totalPages: 1,
    pageNumber: 1,
    pageLimit: DEFAULT_PAGE_LIMIT,
  },
  upcomingPaginationData: {
    total: 1,
    totalPages: 1,
    pageNumber: 1,
    pageLimit: DEFAULT_PAGE_LIMIT,
  },

  status: 'idle',
  propertyStatus: 'idle',
  error: null,
  sortByOrder: {},
  lastUpdated: null,
  openNewBooking: false,
  openNewBookingSuccessModal: false,
};

// Async thunk for fetching bookings
export const fetchBookings = createAppAsyncThunk(
  'bookings/fetchBookings',
  async (
    {
      page,
      status = 'current',
      isInitialLoad = true,
    }: { page: number; status: string; isInitialLoad?: boolean },
    { getState },
  ) => {
    const state = getState();
    const currentSortOrder = state.booking.sortByOrder;
    const response = await api.post<GetBookingsResponse>(
      '/api/booking/get-all',
      {
        pageLimit: DEFAULT_PAGE_LIMIT,
        pageNumber: page,
        sortByOrder: currentSortOrder,
        status: status,
      },
    );
    return { result: response.data.result, status, isInitialLoad };
  },
);

// Async thunk for adding new bookings
export const addNewBooking = createAppAsyncThunk(
  'bookings/addNewBooking',
  async (bookingForm: BookingFormType) => {
    try {
      const response = await api.post<Result>('/api/booking', bookingForm);
      return response.data;
    } catch (error) {
      toastErrorDisplay(error);
      throw error;
    }
  },
);

//Async thunk for fetching and searching properties
export const getProperties = createAppAsyncThunk(
  'propeties/getAllProperties',
  async (propertiesForm: PropertyFormType) => {
    const response = await api.post<GetAllPropertiesResponse>(
      '/api/properties/get-all',
      {
        ...propertiesForm,
        propertyStatus: 'Publish',
      },
    );
    return response.data;
  },
);

const addBookingInitialLoad = (
  stateData: Data[],
  data: Data[],
  isInitialLoad: boolean,
) => {
  if (isInitialLoad) {
    return data;
  }
  return [...stateData, ...data];
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    resetUpcomingData(state) {
      state.upcomingBookingData = [];
    },
    resetPastData(state) {
      state.pastBookingData = [];
    },
    resetCurrentData(state) {
      state.currentBookingData = [];
    },
    updateSortOrder(state, action: PayloadAction<string>) {
      state.sortByOrder[action.payload] =
        state.sortByOrder[action.payload] === 'ASC' ? 'DESC' : 'ASC';
    },
    handleBookingSuccessModal(state, action: PayloadAction<boolean>) {
      state.openNewBookingSuccessModal = action.payload;
    },
    handleBookingCreationModal(state, action: PayloadAction<boolean>) {
      state.openNewBooking = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const data = action.payload.result.bookings.map((booking: Data) => {
          return {
            ...booking,
            propertyName: booking.property.manualProperty.propertyName,
          };
        });

        if (action.payload.status === 'current') {
          state.currentBookingData = addBookingInitialLoad(
            state.currentBookingData,
            data,
            action.payload.isInitialLoad,
          );
          state.totalCurrentData = action.payload.result.metaData.total;
          state.currentPaginationData = action.payload.result.metaData;
        } else if (action.payload.status === 'past') {
          state.pastBookingData = addBookingInitialLoad(
            state.pastBookingData,
            data,
            action.payload.isInitialLoad,
          );
          state.totalPastData = action.payload.result.metaData.total;
          state.pastPaginationData = action.payload.result.metaData;
        } else {
          state.upcomingBookingData = addBookingInitialLoad(
            state.upcomingBookingData,
            data,
            action.payload.isInitialLoad,
          );
          state.totalUpcomingData = action.payload.result.metaData.total;
          state.upcomingPaginationData = action.payload.result.metaData;
        }
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message ?? 'Failed to fetch bookings';
      })
      .addCase(addNewBooking.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(addNewBooking.fulfilled, (state) => {
        state.status = 'succeeded';
        state.lastUpdated = new Date().toISOString();
        state.openNewBooking = false;
        state.openNewBookingSuccessModal = true;
      })
      .addCase(addNewBooking.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message ?? 'Failed to add bookings';
      })
      .addCase(getProperties.pending, (state) => {
        state.propertyStatus = 'pending';
      })
      .addCase(getProperties.fulfilled, (state, action) => {
        state.propertyStatus = 'succeeded';
        state.propertiesData = action.payload.result.properties
          ?.filter(
            (property: AllProperties) =>
              property.propertyStatus.name === 'Publish',
          )
          .map((property: AllProperties) => {
            return {
              value: property.id,
              label: property.manualProperty.propertyName,
            };
          });
      })
      .addCase(getProperties.rejected, (state, action) => {
        state.propertyStatus = 'rejected';
        state.error = action.error.message ?? 'Failed to fetch properties';
      });
  },
});

export const {
  resetCurrentData,
  resetPastData,
  resetUpcomingData,
  updateSortOrder,
  handleBookingCreationModal,
  handleBookingSuccessModal,
} = bookingSlice.actions;
export default bookingSlice.reducer;
