import { RootState } from './store';

export const selectMeasureUnits = (state: RootState) =>
  state.globalDataSlice.measureUnits;
