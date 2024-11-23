import { ActionReducerMapBuilder } from '@reduxjs/toolkit';

import { TariffConstructorState } from './actions';
import { servicesConfigApi } from '@services/servicesConfigApi';

const resetTariffConstructorState = (state: TariffConstructorState) => {
  state.tariff.basicServices = {};
  state.tariff.unlimitedApps = {};
  state.tariff.extraServices = {};
  state.tariff.price = 0;
  state.config = {
    basicServices: {},
    unlimitedApps: {},
    extraServices: {},
  };
};

export const extraReducers = (
  builder: ActionReducerMapBuilder<TariffConstructorState>
) => {
  builder
    .addMatcher(
      servicesConfigApi.endpoints.getConstructorConfig.matchPending,
      (state) => {
        resetTariffConstructorState(state);
      }
    )
    .addMatcher(
      servicesConfigApi.endpoints.getConstructorConfig.matchFulfilled,
      (state, action) => {
        state.config = action.payload[0];

        const basicServicesValuesArray = Object.values(
          state.config.basicServices
        );

        basicServicesValuesArray.forEach((item) => {
          state.tariff.basicServices[item.id] = item.values[0];
        });

        Object.values(state.config.unlimitedApps).forEach((item) => {
          state.tariff.unlimitedApps[item.id] = false;
        });

        Object.values(state.config.extraServices).forEach((item) => {
          state.tariff.extraServices[item.id] = false;
        });

        state.tariff.price = basicServicesValuesArray.reduce(
          (sum, currentService) =>
            sum +
            (currentService.values[0] / currentService.amount) *
              currentService.price,
          0
        );
      }
    )
    .addMatcher(
      servicesConfigApi.endpoints.getConstructorConfig.matchRejected,
      (state) => {
        resetTariffConstructorState(state);
      }
    );
};
