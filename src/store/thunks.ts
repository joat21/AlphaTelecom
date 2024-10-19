import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { GlobalDataState } from './actions';

export const fetchMeasureUnits = createAsyncThunk(
  'globalData/fetchMeasureUnitsStatus',
  async () => {
    const { data } = await axios.get(
      'https://16573c0696a6082f.mokky.dev/measure-units'
    );

    return data;
  }
);

export const extraReducers = (
  builder: ActionReducerMapBuilder<GlobalDataState>
) => {
  builder
    .addCase(fetchMeasureUnits.pending, (state) => {
      state.measureUnits = {};
    })
    .addCase(
      fetchMeasureUnits.fulfilled,
      (state, action: PayloadAction<Record<string, string>[]>) => {
        state.measureUnits = action.payload[0];
      }
    )
    .addCase(fetchMeasureUnits.rejected, (state) => {
      state.measureUnits = {};
    });
};
