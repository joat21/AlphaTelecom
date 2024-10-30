import { createApi } from '@reduxjs/toolkit/query/react';
import { UserRole } from '../entities/model';
import { commonBaseQuery } from './commonBaseQuery';

export interface User {
  id: number;
  login: string;
  role: UserRole;
}

export interface UserResponse {
  data: User;
  token: string;
}

export interface LoginRequest {
  login: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: commonBaseQuery('https://16573c0696a6082f.mokky.dev'),
  endpoints: (build) => ({
    login: build.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth',
        method: 'POST',
        body: credentials,
      }),
    }),
    fetchUserByToken: build.query<User, void>({
      query: () => '/auth_me',
    }),
  }),
});

export const { useLoginMutation, useLazyFetchUserByTokenQuery } = authApi;
