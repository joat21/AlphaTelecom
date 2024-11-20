import { createApi } from '@reduxjs/toolkit/query/react';
import { TariffWithImage } from '@entities/model';
import { commonBaseQuery } from './commonBaseQuery';
import { User } from './authApi';

export const clientsApi = createApi({
  reducerPath: 'clientsApi',
  baseQuery: commonBaseQuery('https://16573c0696a6082f.mokky.dev'),
  endpoints: (builder) => ({
    getClients: builder.query<User[], void>({
      query: () => '/users',
    }),
    getTariff: builder.query<TariffWithImage, string>({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { useGetClientsQuery, useGetTariffQuery } = clientsApi;
