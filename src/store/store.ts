import { configureStore } from '@reduxjs/toolkit';
import tariffConstructor from '../modules/TariffConstructor/store/slice';

export const store = configureStore({
  reducer: { tariffConstructor },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
