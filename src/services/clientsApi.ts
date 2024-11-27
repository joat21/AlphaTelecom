import { api } from './api';
import { User } from './authApi';
import { Remainder } from '@entities/model';

export interface GetClientsUrlParams {
  surname?: string;
  name?: string;
  patronymic?: string;
  phone?: string;
  contractNumber?: string;
  tariffId?: string;
}

export const clientsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getClients: builder.query<User[], GetClientsUrlParams>({
      query: (urlParams) => {
        const params = new URLSearchParams();

        Object.entries(urlParams).forEach(([key, value]) =>
          params.append(key, '*' + value + '*')
        );

        return `/users?${params.toString()}`;
      },
    }),
    getClientRemains: builder.query<Remainder, number>({
      query: (id) => `/remains/${id}`,
    }),
  }),
});

export const { useGetClientsQuery, useGetClientRemainsQuery } = clientsApi;
