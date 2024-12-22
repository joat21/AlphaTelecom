import { api } from './api';
import { TariffWithImage } from '@entities/model';

export interface CartItem extends TariffWithImage {
  cartId: string;
  userId: number;
  phone: string;
}

export const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<CartItem[], number | string>({
      query: (userId) => '/cart?userId=' + userId,
    }),
    addItem: builder.mutation<CartItem, CartItem>({
      query: (item) => ({
        url: '/cart',
        method: 'POST',
        body: item,
      }),
    }),
    removeItem: builder.mutation<CartItem, number>({
      query: (id) => ({
        url: '/cart/' + id,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetCartQuery,
  useLazyGetCartQuery,
  useAddItemMutation,
  useRemoveItemMutation,
} = cartApi;
