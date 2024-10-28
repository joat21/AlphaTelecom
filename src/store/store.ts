import { configureStore } from '@reduxjs/toolkit';
import tariffConstructor from '../modules/TariffConstructor/store/slice';
import auth from './Auth/slice';
import { servicesConfigApi } from './api/servicesConfigApi';
import { tariffsApi } from '../pages/TariffPage/api/tariffsApi';
import { authApi } from './api/authApi';

export const store = configureStore({
  reducer: {
    tariffConstructor,
    auth,
    [servicesConfigApi.reducerPath]: servicesConfigApi.reducer,
    [tariffsApi.reducerPath]: tariffsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      servicesConfigApi.middleware,
      tariffsApi.middleware,
      authApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
