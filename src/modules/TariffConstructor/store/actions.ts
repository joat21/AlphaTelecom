import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { extraReducers } from './thunks';
import {
  Service,
  BasicServices,
  UnlimitedApps,
  ExtraServices,
  Tariff,
} from '../../../entities/model';

export interface TariffConstructorState {
  tariff: Tariff;
  config: TariffConstructorConfig[];
}

export type TariffConstructorConfig = {
  basicServices: Record<
    string,
    {
      id: keyof BasicServices;
      label: string;
      values: number[];
      amount: number;
      price: number;
    }
  >;
  unlimitedApps: Record<
    string,
    {
      id: keyof UnlimitedApps;
      label: string;
      price: number;
    }
  >;
  extraServices: Record<
    string,
    {
      id: keyof ExtraServices;
      label: string;
      price: number;
    }
  >;
};

const getPriceDifference = (
  newValue: number | boolean,
  service: Service,
  value?: number
): number => {
  if (typeof newValue === 'boolean') {
    return newValue ? service.price : -service.price;
  }

  if (
    typeof value === 'number' &&
    typeof newValue === 'number' &&
    service.amount
  ) {
    const amountDifference = newValue - value;
    return (amountDifference / service.amount) * service.price;
  }

  return 0;
};

const initialState: TariffConstructorState = {
  tariff: {
    id: 0,
    title: 'constructor',
    basicServices: {
      internet: 0,
      minutes: 0,
      sms: 0,
    },
    unlimitedApps: {
      unlimitedSocials: false,
      unlimitedVideo: false,
      unlimitedMusic: false,
    },
    extraServices: {
      intercityCalls: false,
    },
    price: 0,
  },
  config: [],
};

export const tariffConstructorSlice = createSlice({
  name: 'tariffConstructor',
  initialState,
  reducers: {
    setBasicService(
      state,
      action: PayloadAction<{
        serviceName: keyof BasicServices;
        newValue: number;
      }>
    ) {
      const { serviceName, newValue } = action.payload;

      state.tariff.price += getPriceDifference(
        newValue,
        state.config[0].basicServices[serviceName],
        state.tariff.basicServices[serviceName]
      );

      state.tariff.basicServices[serviceName] = newValue;
    },

    setUnlimitedApp(
      state,
      action: PayloadAction<{
        serviceName: keyof UnlimitedApps;
        newValue: boolean;
      }>
    ) {
      const { serviceName, newValue } = action.payload;
      state.tariff.unlimitedApps[serviceName] = newValue;
      state.tariff.price += getPriceDifference(
        newValue,
        state.config[0].unlimitedApps[serviceName]
      );
    },

    setExtraService(
      state,
      action: PayloadAction<{
        serviceName: keyof ExtraServices;
        newValue: boolean;
      }>
    ) {
      const { serviceName, newValue } = action.payload;
      state.tariff.extraServices[serviceName] = newValue;
      state.tariff.price += getPriceDifference(
        newValue,
        state.config[0].extraServices[serviceName]
      );
    },
  },
  extraReducers,
});
