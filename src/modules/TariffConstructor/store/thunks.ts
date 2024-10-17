import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { TariffConstructorState } from './actions';

export const fetchConstructorConfig = createAsyncThunk(
  'tariffConstructor/fetchConfigStatus',
  async () => {
    const { data } = await axios.get(
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
    })

    .addCase(fetchConstructorConfig.fulfilled, (state, action) => {
      state.config = action.payload;
    })

    .addCase(fetchConstructorConfig.rejected, (state) => {
      state.config = [];
    });
};
