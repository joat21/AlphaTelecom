import { api } from './api';
import { TariffWithImage } from '@entities/model';

export interface GetTariffsUrlParams {
  sortBy?: string;
}

export const tariffsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTariffs: builder.query<TariffWithImage[], GetTariffsUrlParams>({
      query: (urlParams) => {
        const params = new URLSearchParams();

        Object.entries(urlParams).forEach(([key, value]) =>
          params.append(key, value)
        );

        return `/tariffs?${params.toString()}`;
      },
      providesTags: ['Tariff'],
    }),
    getTariff: builder.query<TariffWithImage, string>({
      query: (id) => `/tariffs/${id}`,
    }),
    createTariff: builder.mutation<TariffWithImage, TariffWithImage>({
      query: (tariff) => ({
        url: '/tariffs',
        method: 'POST',
        body: tariff,
      }),
      invalidatesTags: ['Tariff'],
    }),
    updateTariff: builder.mutation<TariffWithImage, TariffWithImage>({
      query: (tariff) => ({
        url: `/tariffs/${tariff.id}`,
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
