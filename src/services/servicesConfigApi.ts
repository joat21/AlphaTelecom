import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Remainder, ServicesDataState } from '@entities/model';
import { TariffConstructorConfig } from '@store/TariffConstructor/actions';

export const servicesConfigApi = createApi({
  reducerPath: 'servicesConfigApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://16573c0696a6082f.mokky.dev',
  }),

  endpoints: (builder) => ({
    getServicesData: builder.query<ServicesDataState[], void>({
      query: () => '/services-data',
    }),
    getConstructorConfig: builder.query<TariffConstructorConfig[], void>({
      query: () => '/constructor-config',
    }),
    getClientRemains: builder.query<Remainder, number>({
      query: (id) => `remains/${id}`,
    }),
  }),
});

export const {
  useGetServicesDataQuery,
  useGetConstructorConfigQuery,
  useGetClientRemainsQuery,
} = servicesConfigApi;
