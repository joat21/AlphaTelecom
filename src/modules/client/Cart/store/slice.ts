import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalPrice } from './utils/calcTotalPrice';
import { getCartFromLS } from './utils/getCartFromLS';
import { CartSliceState } from './types';
import { TariffWithImage } from '@entities/model';

const initialState: CartSliceState = getCartFromLS();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<TariffWithImage>) {
      state.items.push({
        ...action.payload,
      });

      state.totalPrice = calcTotalPrice(state.items);
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);

      state.totalPrice = calcTotalPrice(state.items);
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
