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

import { api } from '@services/api';
import { cloudinaryApi } from '@services/cloudinaryApi';
import tariffConstructor from './TariffConstructor/slice';
import auth from './Auth/slice';

const authPersistConfig = {
  key: 'auth',
  storage,
};

export const store = configureStore({
  reducer: combineReducers({
    tariffConstructor,
    auth: persistReducer(authPersistConfig, auth),
    [api.reducerPath]: api.reducer,
    [cloudinaryApi.reducerPath]: cloudinaryApi.reducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware, cloudinaryApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
