import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConfigBasicService, ConfigService, TariffWithImage } from '@entities/model';

import { extraReducers } from './thunks';
import { getPriceDifference } from './helpers/getPriceDifference';

export interface TariffConstructorState {
  tariff: TariffWithImage;
  config: TariffConstructorConfig;
}

export interface TariffConstructorConfig {
  basicServices: Record<string, ConfigBasicService>;
  unlimitedApps: Record<string, ConfigService>;
  extraServices: Record<string, ConfigService>;
}

const initialState: TariffConstructorState = {
  tariff: {
    id: 0,
    title: 'Мой тариф',
    basicServices: {},
    unlimitedApps: {},
    extraServices: {},
    price: 0,
    isActive: false,
    imageUrl: '',
    overviewImageUrl: '',
  },
  config: {
    basicServices: {},
    unlimitedApps: {},
    extraServices: {},
  },
};

export const tariffConstructorSlice = createSlice({
  name: 'tariffConstructor',
  initialState,
  reducers: {
    setBasicService(
      state,
      action: PayloadAction<{
        serviceName: string;
        newValue: number;
      }>,
    ) {
      const { serviceName, newValue } = action.payload;

      state.tariff.price += getPriceDifference(
        newValue,
        state.config.basicServices[serviceName],
        state.tariff.basicServices[serviceName],
      );

      state.tariff.basicServices[serviceName] = newValue;
    },

    setUnlimitedApp(
      state,
      action: PayloadAction<{
        serviceName: string;
        newValue: boolean;
      }>,
    ) {
      const { serviceName, newValue } = action.payload;
      state.tariff.unlimitedApps[serviceName] = newValue;
      state.tariff.price += getPriceDifference(newValue, state.config.unlimitedApps[serviceName]);
    },

    setExtraService(
      state,
      action: PayloadAction<{
        serviceName: string;
        newValue: boolean;
      }>,
    ) {
      const { serviceName, newValue } = action.payload;
      state.tariff.extraServices[serviceName] = newValue;
      state.tariff.price += getPriceDifference(newValue, state.config.extraServices[serviceName]);
    },

    setTitle(state, action: PayloadAction<string>) {
      state.tariff.title = action.payload;
    },

    setPrice(state, action: PayloadAction<number>) {
      state.tariff.price = action.payload;
    },

    setIsActive(state, action: PayloadAction<boolean>) {
      state.tariff.isActive = action.payload;
    },

    setTariff(state, action: PayloadAction<TariffWithImage>) {
      state.tariff = action.payload;
    },
  },
  extraReducers,
});
