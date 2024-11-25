import { configureStore } from '@reduxjs/toolkit';
import { reducers } from './rootReducer';
import type { RootState } from './types';

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: reducers,
    preloadedState,
  });
};
