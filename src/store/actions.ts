import { createSlice } from '@reduxjs/toolkit';
import { extraReducers } from './thunks';

export interface GlobalDataState {
  measureUnits: Record<string, string>;
}

const initialState: GlobalDataState = {
  measureUnits: {},
};

export const globalDataSlice = createSlice({
  name: 'globalData',
  initialState,
  reducers: {},
  extraReducers,
});
