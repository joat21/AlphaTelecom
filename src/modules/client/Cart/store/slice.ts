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
      state.totalCount = state.items.length;
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items.splice(action.payload, 1);
      state.totalCount = state.items.length;
      state.totalPrice = calcTotalPrice(state.items);
    },
    deleteAll(state) {
      state.items = [];
      state.totalCount = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, deleteAll } = cartSlice.actions;

export default cartSlice.reducer;
