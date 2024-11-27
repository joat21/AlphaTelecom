import { createApi } from '@reduxjs/toolkit/query/react';
import { TariffWithImage } from '@entities/model';
import { commonBaseQuery } from './commonBaseQuery';

export interface GetTariffsUrlParams {
  sortBy?: string;
}

export const tariffsApi = createApi({
  reducerPath: 'tariffsApi',
  baseQuery: commonBaseQuery('https://16573c0696a6082f.mokky.dev/tariffs'),
  tagTypes: ['Tariff'],
  endpoints: (builder) => ({
    getTariffs: builder.query<TariffWithImage[], GetTariffsUrlParams>({
      query: (urlParams) => {
        const params = new URLSearchParams();

        Object.entries(urlParams).forEach(([key, value]) =>
          params.append(key, value)
        );

        return `?${params.toString()}`;
      },
      providesTags: ['Tariff'],
    }),
    getTariff: builder.query<TariffWithImage, string>({
      query: (id) => `/${id}`,
    }),
    createTariff: builder.mutation<TariffWithImage, TariffWithImage>({
      query: (tariff) => ({
        url: '',
        method: 'POST',
        body: tariff,
      }),
      invalidatesTags: ['Tariff'],
    }),
    updateTariff: builder.mutation<TariffWithImage, TariffWithImage>({
      query: (tariff) => ({
        url: `/${tariff.id}`,
        method: 'PATCH',
        body: tariff,
      }),
      invalidatesTags: ['Tariff'],
    }),
  }),
});

export const {
  useGetTariffsQuery,
  useGetTariffQuery,
  useCreateTariffMutation,
  useLazyGetTariffQuery,
  useUpdateTariffMutation,
} = tariffsApi;
