import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { ServicesDataState } from './actions';

const resetServicesDataState = (state: ServicesDataState) => {
  state.basicServices = {};
  state.unlimitedApps = {};
  state.extraServices = {};
  state.isLoading = true;
};

export const fetchServicesData = createAsyncThunk(
  'globalData/fetchGlobalDataStatus',
  async () => {
    const { data } = await axios.get(
      'https://16573c0696a6082f.mokky.dev/services-global-data'
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
        state.basicServices = action.payload[0].basicServices;
        state.unlimitedApps = action.payload[0].unlimitedApps;
        state.extraServices = action.payload[0].extraServices;
        state.isLoading = false;
      }
    )
    .addCase(fetchServicesData.rejected, (state) => {
      resetServicesDataState(state);
    });
};
