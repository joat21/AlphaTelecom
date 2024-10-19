import { configureStore } from '@reduxjs/toolkit';
import tariffConstructor from '../modules/TariffConstructor/store/slice';
import servicesData from './servicesData/slice';

export const store = configureStore({
  reducer: {
    servicesData,
    tariffConstructor,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
