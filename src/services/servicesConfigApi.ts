import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TariffConstructorConfig } from '../modules/TariffConstructor/store/actions';
import { ServicesDataState } from '../entities/model';

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
  }),
});

export const { useGetServicesDataQuery, useGetConstructorConfigQuery } =
  servicesConfigApi;
