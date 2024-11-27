import { api } from './api';
import { UserRole } from '@entities/model';

export interface User {
  id: number;
  login: string;
  role: UserRole;
  name: string;
  surname: string;
  patronymic: string;
  phone: string;
  balance: number;
  tariffId: number;
  contractNumber: string;
}

export interface UserResponse {
  data: User;
  token: string;
}

export interface LoginRequest {
  login: string;
  password: string;
}

export const authApi = api.injectEndpoints({
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
