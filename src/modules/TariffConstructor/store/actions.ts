import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { extraReducers } from './thunks';
import {
  Tariff,
  BasicService,
  UnlimitedApp,
  ExtraService,
} from '../../../entities/model';
import { getPriceDifference } from '../helpers/getPriceDifference';

export interface TariffConstructorState {
  tariff: Tariff;
  config: TariffConstructorConfig;
}

export interface TariffConstructorConfig {
  basicServices: Record<string, BasicService>;
  unlimitedApps: Record<string, UnlimitedApp>;
  extraServices: Record<string, ExtraService>;
}

const initialState: TariffConstructorState = {
  tariff: {
    id: 0,
    title: 'constructor',
    basicServices: {},
    unlimitedApps: {},
    extraServices: {},
    price: 0,
  },
  config: { basicServices: {}, unlimitedApps: {}, extraServices: {} },
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
      }>
    ) {
      const { serviceName, newValue } = action.payload;

      state.tariff.price += getPriceDifference(
        newValue,
        state.config.basicServices[serviceName],
        state.tariff.basicServices[serviceName]
      );

      state.tariff.basicServices[serviceName] = newValue;
    },

    setUnlimitedApp(
      state,
      action: PayloadAction<{
        serviceName: string;
        newValue: boolean;
      }>
    ) {
      const { serviceName, newValue } = action.payload;
      state.tariff.unlimitedApps[serviceName] = newValue;
      state.tariff.price += getPriceDifference(
        newValue,
        state.config.unlimitedApps[serviceName]
      );
    },

    setExtraService(
      state,
      action: PayloadAction<{
        serviceName: string;
        newValue: boolean;
      }>
    ) {
      const { serviceName, newValue } = action.payload;
      state.tariff.extraServices[serviceName] = newValue;
      state.tariff.price += getPriceDifference(
        newValue,
        state.config.extraServices[serviceName]
      );
    },
  },
  extraReducers,
});
