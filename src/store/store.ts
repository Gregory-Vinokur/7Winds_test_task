import { configureStore } from '@reduxjs/toolkit';
import { api } from './api/apiSlice';
import rowsReducer from './rowSlice/rowSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    rows: rowsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
