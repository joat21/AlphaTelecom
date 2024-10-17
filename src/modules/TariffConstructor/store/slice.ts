import { tariffConstructorSlice } from './actions';

export const {
  setInternet,
  setMinutes,
  setSms,
  setUnlimitedSocials,
  setUnlimitedMusic,
  setUnlimitedVideo,
  setIntercityCalls,
} = tariffConstructorSlice.actions;

export default tariffConstructorSlice.reducer;
