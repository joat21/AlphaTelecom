import { RootState } from '@store/store';

export const selectTariff = (state: RootState) =>
  state.tariffConstructor.tariff;

export const selectBasicServices = (state: RootState) =>
  state.tariffConstructor.tariff.basicServices;

export const selectUnlimitedApps = (state: RootState) =>
  state.tariffConstructor.tariff.unlimitedApps;

export const selectExtraServices = (state: RootState) =>
  state.tariffConstructor.tariff.extraServices;

export const selectPrice = (state: RootState) =>
  state.tariffConstructor.tariff.price;

export const selectConfig = (state: RootState) =>
  state.tariffConstructor.config;
