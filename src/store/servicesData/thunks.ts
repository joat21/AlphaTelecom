import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { ServicesDataState } from './actions';

const resetServicesDataState = (state: ServicesDataState) => {
  state.basicServicesData = {};
  state.unlimitedAppsData = {};
  state.extraServicesData = {};
  state.isLoading = true;
};

export const fetchServicesData = createAsyncThunk(
  'globalData/fetchGlobalDataStatus',
  async () => {
    const { data } = await axios.get(
      'https://16573c0696a6082f.mokky.dev/services-data'
    );

    return data;
  }
);

export const extraReducers = (
  builder: ActionReducerMapBuilder<ServicesDataState>
) => {
  builder
    .addCase(fetchServicesData.pending, (state) => {
      resetServicesDataState(state);
    })
    .addCase(
      fetchServicesData.fulfilled,
      (state, action: PayloadAction<ServicesDataState[]>) => {
        state.basicServicesData = action.payload[0].basicServicesData;
        state.unlimitedAppsData = action.payload[0].unlimitedAppsData;
        state.extraServicesData = action.payload[0].extraServicesData;
        state.isLoading = false;
      }
    )
    .addCase(fetchServicesData.rejected, (state) => {
      resetServicesDataState(state);
    });
};
