import { tariffConstructorSlice } from './actions';

export const { setBasicService, setUnlimitedApp, setExtraService } =
  tariffConstructorSlice.actions;

export default tariffConstructorSlice.reducer;
