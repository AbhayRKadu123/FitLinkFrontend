import { configureStore } from '@reduxjs/toolkit';
import { WorkoutApi } from '../features/api/WorkoutApi';
import { authApi } from '../features/api/AuthApi';
import { UserApi } from '../features/api/UserApi';
import { WeightTrackingApi } from '../features/api/WeightTrackingApi';

export const store = configureStore({
  reducer: {
    // add both API slices
    [WorkoutApi.reducerPath]: WorkoutApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [UserApi.reducerPath]:UserApi.reducer,
    [WeightTrackingApi.reducerPath]:WeightTrackingApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(WorkoutApi.middleware)
      .concat(authApi.middleware)
      .concat(UserApi.middleware)
      .concat(WeightTrackingApi.middleware)
});
