import { configureStore } from '@reduxjs/toolkit';
import config from 'config/config';
import { Environments } from 'config/environments';
import { reducers } from './rootReducer';

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: config.environment === Environments.DEVELOPMENT,
});

export default store;
