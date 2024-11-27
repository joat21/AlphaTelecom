import { api } from './api';
import { ServicesDataState } from '@entities/model';
import { TariffConstructorConfig } from '@store/TariffConstructor/actions';

export const servicesConfigApi = api.injectEndpoints({
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
