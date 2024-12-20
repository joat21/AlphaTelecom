import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://16573c0696a6082f.mokky.dev',
    prepareHeaders: (headers) => {
      const activeUserId = localStorage.getItem('activeUserId');

      if (activeUserId) {
        headers.set(
          'Authorization',
          `Bearer ${localStorage.getItem('token.' + activeUserId)}`
        );
      }

      headers.set('Accept', 'application/json');

      return headers;
    },
  }),
  tagTypes: ['Tariff'],
  endpoints: () => ({}),
});
