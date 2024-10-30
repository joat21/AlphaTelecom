import { createApi } from '@reduxjs/toolkit/query/react';
import { TariffWithImage } from '../entities/model';
import { commonBaseQuery } from './commonBaseQuery';

export const tariffsApi = createApi({
  reducerPath: 'tariffsApi',
  baseQuery: commonBaseQuery('https://16573c0696a6082f.mokky.dev/tariffs'),
  endpoints: (builder) => ({
    getTariffs: builder.query<TariffWithImage[], void>({
      query: () => '',
    }),
    getTariff: builder.query<TariffWithImage, string>({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { useGetTariffsQuery, useGetTariffQuery } = tariffsApi;
