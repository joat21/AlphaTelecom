import { configureStore } from '@reduxjs/toolkit';
import tariffConstructor from './TariffConstructor/slice';
import auth from './Auth/slice';
import { servicesConfigApi } from '../services/servicesConfigApi';
import { tariffsApi } from '../services/tariffsApi';
import { authApi } from '../services/authApi';
import { clientsApi } from '../services/clientsApi';

export const store = configureStore({
  reducer: {
    tariffConstructor,
    auth,
    [servicesConfigApi.reducerPath]: servicesConfigApi.reducer,
    [tariffsApi.reducerPath]: tariffsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [clientsApi.reducerPath]: clientsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      servicesConfigApi.middleware,
      tariffsApi.middleware,
      authApi.middleware,
      clientsApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
