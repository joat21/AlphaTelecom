import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TariffWithImage } from '../../../entities/model';

export const tariffsApi = createApi({
  reducerPath: 'tariffsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://16573c0696a6082f.mokky.dev/tariffs',
  }),

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
