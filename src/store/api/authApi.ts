import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface User {
  login: string;
}

export interface UserResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  login: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://16573c0696a6082f.mokky.dev' }),
  endpoints: (build) => ({
    login: build.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
