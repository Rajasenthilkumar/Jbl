import { combineReducers } from '@reduxjs/toolkit';
import guestCardReducer from 'views/features/profile/GuestCardSlice';
import authSlice from './slice/authSlice';
import bookingSlice from './slice/bookingSlice';
import counterSlice from './slice/counterSlice';
import customerReducer from './slice/customerSlice';
import damageWaiverReducer from './slice/damageWaiverSlice';
import documentSlice from './slice/documentsSlice';
import guestBookingVerificationSlice from './slice/guestBookingVerificationSlice';
import profileGuestSlice from './slice/profileGuestSlice';
import profileSlice from './slice/profileSlice';
import propertiesSlice from './slice/propertiesSlice';
const rootReducer = {
  counter: counterSlice,
  auth: authSlice,
  fetchDocuments: documentSlice,
  booking: bookingSlice,
  properties: propertiesSlice,
  profile: profileSlice,
  guestProfile: profileGuestSlice,
  guestCardDetails: guestCardReducer,
  customerDetails: customerReducer,
  guestBookingVerification: guestBookingVerificationSlice,
  damageWaiver: damageWaiverReducer,
};

export const reducers = combineReducers(rootReducer);
