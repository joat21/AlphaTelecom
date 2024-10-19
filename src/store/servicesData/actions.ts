import { createSlice } from '@reduxjs/toolkit';
import { extraReducers } from './thunks';
import {
  BasicServiceData,
  ExtraServiceData,
  UnlimitedAppData,
} from '../../entities/model';

export interface ServicesDataState {
  basicServices: Record<string, BasicServiceData>;
  unlimitedApps: Record<string, UnlimitedAppData>;
  extraServices: Record<string, ExtraServiceData>;
  isLoading: boolean;
}

const initialState: ServicesDataState = {
  basicServices: {},
  unlimitedApps: {},
  extraServices: {},
  isLoading: true,
};

export const servicesDataSlice = createSlice({
  name: 'servicesData',
  initialState,
  reducers: {},
  extraReducers,
});
