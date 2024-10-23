import { createSlice } from '@reduxjs/toolkit';
import { extraReducers } from './thunks';
import {
  BasicServiceData,
  ExtraServiceData,
  UnlimitedAppData,
} from '../../entities/model';

export interface ServicesDataState {
  basicServicesData: Record<string, BasicServiceData>;
  unlimitedAppsData: Record<string, UnlimitedAppData>;
  extraServicesData: Record<string, ExtraServiceData>;
  isLoading: boolean;
}

const initialState: ServicesDataState = {
  basicServicesData: {},
  unlimitedAppsData: {},
  extraServicesData: {},
  isLoading: true,
};

export const servicesDataSlice = createSlice({
  name: 'servicesData',
  initialState,
  reducers: {},
  extraReducers,
});
