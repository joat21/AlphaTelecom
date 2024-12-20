import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@store/store';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://16573c0696a6082f.mokky.dev',
    prepareHeaders: (headers, { getState }) => {
      const { activeUserId, tokens } = (getState() as RootState).auth;

      if (activeUserId) {
        headers.set('Authorization', `Bearer ${tokens[activeUserId]}`);
      }

      headers.set('Accept', 'application/json');

      return headers;
    },
  }),
  tagTypes: ['Tariff'],
  endpoints: () => ({}),
});
