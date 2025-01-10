import { api } from './api';
import { TariffWithImage } from '@entities/model';

export interface GetTariffsUrlParams {
  sortBy?: string;
  title?: string;
  isActive?: boolean;
  price?: string;
  internet?: string;
  minutes?: string;
  sms?: string;
  unlimitedSocials?: boolean;
  unlimitedVideo?: boolean;
  unlimitedMusic?: boolean;
  intercityCalls?: boolean;
}

export const tariffsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTariffs: builder.query<TariffWithImage[], GetTariffsUrlParams>({
      query: (urlParams) => {
        const params = new URLSearchParams();

        Object.entries(urlParams).forEach(([key, value]) => params.append(key, value));

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
    deleteTariff: builder.mutation<void, string>({
      query: (id) => ({
        url: `/tariffs/${id}`,
        method: 'DELETE',
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
  useDeleteTariffMutation,
} = tariffsApi;
