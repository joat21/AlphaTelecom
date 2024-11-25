import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalPrice } from './utils/calcTotalPrice';
import { getCartFromLS } from './utils/getCartFromLS';
import { CartSliceState } from './types';
<<<<<<<< HEAD:src/modules/client/Cart/store/slice.ts
import { TariffWithImage } from '@entities/model';
========
import { TariffWithImage } from '../../../entities/model';
>>>>>>>> 119fbb6d354b77d56bf5325142acde9c615a58c3:src/modules/Cart/store/slice.ts

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
<<<<<<<< HEAD:src/modules/client/Cart/store/slice.ts
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
========
    removeItem(state, action: PayloadAction<TariffWithImage>) {
      state.items = state.items.filter((obj) => obj !== action.payload);
>>>>>>>> 119fbb6d354b77d56bf5325142acde9c615a58c3:src/modules/Cart/store/slice.ts
      state.totalPrice = calcTotalPrice(state.items);
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
