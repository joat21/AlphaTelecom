import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { TariffConstructorConfig, TariffConstructorState } from './actions';

const resetTariffState = (state: TariffConstructorState) => {
  state.tariff.basicServices.internet = 0;
  state.tariff.basicServices.minutes = 0;
  state.tariff.basicServices.sms = 0;
  state.tariff.price = 0;
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
      state.config = [];
      resetTariffState(state);
    })

    .addCase(
      fetchConstructorConfig.fulfilled,
      (state, action: PayloadAction<TariffConstructorConfig[]>) => {
        const internet = action.payload[0].basicServices.internet;
        const minutes = action.payload[0].basicServices.minutes;
        const sms = action.payload[0].basicServices.sms;

        state.config = action.payload;
        state.tariff.basicServices.internet = internet.values[0];
        state.tariff.basicServices.minutes = minutes.values[0];
        state.tariff.basicServices.sms = sms.values[0];

        state.tariff.price =
          (internet.values[0] / internet.amount) * internet.price +
          (minutes.values[0] / minutes.amount) * minutes.price +
          (sms.values[0] / sms.amount) * sms.price;
      }
    )

    .addCase(fetchConstructorConfig.rejected, (state) => {
      state.config = [];
      resetTariffState(state);
    });
};
