import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { TariffConstructorConfig, TariffConstructorState } from './actions';

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

      state.tariff.basicServices.internet = 0;
      state.tariff.basicServices.minutes = 0;
      state.tariff.basicServices.sms = 0;
    })

    .addCase(
      fetchConstructorConfig.fulfilled,
      (state, action: PayloadAction<TariffConstructorConfig[]>) => {
        state.config = action.payload;

        state.tariff.basicServices.internet =
          action.payload[0].basicServices.internet.values[0];

        state.tariff.basicServices.minutes =
          action.payload[0].basicServices.minutes.values[0];

        state.tariff.basicServices.sms =
          action.payload[0].basicServices.sms.values[0];
      }
    )

    .addCase(fetchConstructorConfig.rejected, (state) => {
      state.config = [];

      state.tariff.basicServices.internet = 0;
      state.tariff.basicServices.minutes = 0;
      state.tariff.basicServices.sms = 0;
    });
};
