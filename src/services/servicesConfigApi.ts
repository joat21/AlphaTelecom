import { api } from './api';
import { ServicesDataState } from '@entities/model';
import { TariffConstructorConfig } from '@store/TariffConstructor/actions';

export interface PriceList {
  id?: number;
  basicServices: Record<
    string,
    {
      price: number;
      amount: number;
    }
  >;
  unlimitedApps: Record<string, number>;
  extraServices: Record<string, number>;
}

export const servicesConfigApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getServicesData: builder.query<ServicesDataState[], void>({
      query: () => '/services-data',
    }),
    getConstructorConfig: builder.query<TariffConstructorConfig[], void>({
      query: () => '/constructor-config',
    }),
    getPriceList: builder.query<PriceList[], void>({
      query: () => '/price-list',
    }),
    updatePriceList: builder.mutation<void, Partial<PriceList>>({
      query: (config) => ({
        url: '/price-list/1',
        method: 'PATCH',
        body: config,
      }),
    }),
  }),
});

export const {
  useGetServicesDataQuery,
  useGetConstructorConfigQuery,
  useGetPriceListQuery,
  useUpdatePriceListMutation,
} = servicesConfigApi;
