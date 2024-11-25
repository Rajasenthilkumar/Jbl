import { useAppDispatch, useAppSelector } from 'hooks/redux';
import {
  addNewBooking,
  fetchBookings,
  getProperties,
} from 'stores/slice/bookingSlice';
import type { BookingFormType, PropertyFormType } from './types';

export const useGetBookings = () => {
  const dispatch = useAppDispatch();
  const {
    upcomingBookingData,
    currentBookingData,
    pastBookingData,
    totalCurrentData,
    totalUpcomingData,
    totalPastData,
    currentPaginationData,
    upcomingPaginationData,
    pastPaginationData,
    status,
    error,
    sortByOrder,
    lastUpdated,
    openNewBooking,
    openNewBookingSuccessModal,
  } = useAppSelector((state) => state.booking);

  const getBookings = (
    page: number,
    status: string,
    isInitialLoad?: boolean,
  ) => {
    dispatch(fetchBookings({ page, status, isInitialLoad }));
  };

  return {
    upcomingBookingData,
    currentBookingData,
    pastBookingData,
    currentPaginationData,
    pastPaginationData,
    upcomingPaginationData,
    status,
    error,
    totalCurrentData,
    totalUpcomingData,
    totalPastData,
    sortByOrder,
    getBookings,
    lastUpdated,
    openNewBooking,
    openNewBookingSuccessModal,
  };
};

export const useAddBookings = () => {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.booking);

  const addBooking = (bookingForm: BookingFormType) => {
    dispatch(addNewBooking(bookingForm));
  };

  return {
    status,
    error,
    addBooking,
  };
};

export const useGetProperties = () => {
  const dispatch = useAppDispatch();
  const {
    propertyStatus: status,
    error,
    propertiesData,
  } = useAppSelector((state) => state.booking);

  const getAllProperties = (propertiesForm: PropertyFormType) => {
    dispatch(getProperties(propertiesForm));
  };

  return {
    status,
    error,
    propertiesData,
    getAllProperties,
  };
};
