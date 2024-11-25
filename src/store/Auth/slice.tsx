import { createSlice } from '@reduxjs/toolkit';
import { authApi, User } from '@services/authApi';

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        state.user = action.payload.data;
        localStorage.setItem('token', action.payload.token);
      })
      .addMatcher(
        authApi.endpoints.fetchUserByToken.matchFulfilled,
        (state, action) => {
          state.user = action.payload;
        }
      );
  },
});

export default authSlice.reducer;
