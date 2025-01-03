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
export interface UserData {
  surname: string;
  name: string;
  patronymic: string;
  passportData: string;
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

    register: build.mutation<UserResponse, UserData>({
      query: (credentials) => ({
        url: '/reg',
        method: 'POST',
        body: credentials,
      }),
    }),

    fetchUserByToken: build.query<User, string>({
      query: (token) => ({
        url: '/auth_me',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }),
    }),

    fetchUserById: build.query<User, string>({
      query: (id) => `/users/${id}`,
    }),

    changeUser: build.mutation<User, User>({
      query: (user) => ({
        url: `/users/${user.id}`,
        method: 'PATCH',
        body: user,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLazyFetchUserByTokenQuery,
  useRegisterMutation,
  useFetchUserByIdQuery,
  useChangeUserMutation,
} = authApi;
