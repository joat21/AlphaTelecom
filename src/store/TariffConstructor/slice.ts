import { tariffConstructorSlice } from './actions';

export const {
  setBasicService,
  setUnlimitedApp,
  setExtraService,
  setTitle,
  setPrice,
  setIsActive,
  setTariff,
  setImageUrl,
} = tariffConstructorSlice.actions;

export default tariffConstructorSlice.reducer;
