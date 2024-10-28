import { configureStore } from '@reduxjs/toolkit';
import tariffConstructor from '../modules/TariffConstructor/store/slice';
import { servicesConfigApi } from './api/servicesConfigApi';
import { tariffsApi } from '../pages/TariffPage/api/tariffsApi';

export const store = configureStore({
  reducer: {
    tariffConstructor,
    [servicesConfigApi.reducerPath]: servicesConfigApi.reducer,
    [tariffsApi.reducerPath]: tariffsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      servicesConfigApi.middleware,
      tariffsApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
