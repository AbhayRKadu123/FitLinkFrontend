import { configureStore } from '@reduxjs/toolkit';
import { WorkoutApi } from '../features/api/WorkoutApi';
import { authApi } from '../features/api/AuthApi';

export const store = configureStore({
  reducer: {
    // add both API slices
    [WorkoutApi.reducerPath]: WorkoutApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(WorkoutApi.middleware)
      .concat(authApi.middleware),
});
