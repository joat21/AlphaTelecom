import { createSlice } from '@reduxjs/toolkit';
import { authApi, User } from '../api/authApi';

interface AuthState {
  user: User | null;
  token: string;
}

const initialState: AuthState = {
  user: null,
  token: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      }
    );
  },
});

export default authSlice.reducer;
