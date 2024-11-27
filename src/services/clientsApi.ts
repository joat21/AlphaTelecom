import { createApi } from '@reduxjs/toolkit/query/react';
import { commonBaseQuery } from './commonBaseQuery';
import { User } from './authApi';

export interface GetClientsUrlParams {
  surname?: string;
  name?: string;
  patronymic?: string;
  phone?: string;
  contractNumber?: string;
  tariffId?: string;
}

export const clientsApi = createApi({
  reducerPath: 'clientsApi',
  baseQuery: commonBaseQuery('https://16573c0696a6082f.mokky.dev'),
  endpoints: (builder) => ({
    getClients: builder.query<User[], GetClientsUrlParams>({
      query: (urlParams) => {
        const params = new URLSearchParams();

        Object.entries(urlParams).forEach(([key, value]) =>
          params.append(key, value)
        );

        return `/users?${params.toString()}`;
      },
    }),
  }),
});

export const { useGetClientsQuery } = clientsApi;
