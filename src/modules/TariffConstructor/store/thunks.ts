import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';

import { TariffConstructorConfig, TariffConstructorState } from './actions';

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

export const fetchConstructorConfig = createAsyncThunk(
  'tariffConstructor/fetchConfigStatus',
  async () => {
    const { data } = await axios.get<TariffConstructorConfig[]>(
      'https://16573c0696a6082f.mokky.dev/constructor-config'
    );

    return data;
  }
);

export const extraReducers = (
  builder: ActionReducerMapBuilder<TariffConstructorState>
) => {
  builder
    .addCase(fetchConstructorConfig.pending, (state) => {
      resetTariffConstructorState(state);
    })

    .addCase(
      fetchConstructorConfig.fulfilled,
      (state, action: PayloadAction<TariffConstructorConfig[]>) => {
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

    .addCase(fetchConstructorConfig.rejected, (state) => {
      resetTariffConstructorState(state);
    });
};
