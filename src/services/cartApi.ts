import { v4 as uuidv4 } from 'uuid';
import { CountryNames, generatePhoneNumber } from 'phone-number-generator-js';
import { api } from './api';
import { TariffWithImage } from '@entities/model';

export interface CartItem extends TariffWithImage {
  cartId: string;
  userId: number | string;
  phone: string;
}

interface AddItemRequest {
  tariff: TariffWithImage;
  userId: number | string;
}

export const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<CartItem[], number | string>({
      query: (userId) => '/cart?userId=' + userId,
      providesTags: ['Cart'],
    }),
    addItem: builder.mutation<CartItem, AddItemRequest>({
      query: ({ tariff, userId }) => {
        const body = {
          ...tariff,
          userId,
          cartId: uuidv4(),
          phone: generatePhoneNumber({
            countryName: CountryNames.Russian_Federation,
          }),
        };
        return { url: '/cart', method: 'POST', body };
      },
      invalidatesTags: ['Cart'],
    }),
    removeItem: builder.mutation<CartItem, string>({
      query: (id) => ({
        url: '/cart/' + id,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const {
  useGetCartQuery,
  useLazyGetCartQuery,
  useAddItemMutation,
  useRemoveItemMutation,
} = cartApi;
