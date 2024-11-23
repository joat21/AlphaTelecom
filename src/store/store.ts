import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import tariffConstructor from '../modules/TariffConstructor/store/slice';
import auth from './Auth/slice';
import { servicesConfigApi } from '../services/servicesConfigApi';
import { tariffsApi } from '../services/tariffsApi';
import { authApi } from '../services/authApi';
import cart from './Cart/slice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, cart);

export const store = configureStore({
  reducer: {
    tariffConstructor,
    auth,
    cart,
    [servicesConfigApi.reducerPath]: servicesConfigApi.reducer,
    [tariffsApi.reducerPath]: tariffsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(servicesConfigApi.middleware, tariffsApi.middleware, authApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
