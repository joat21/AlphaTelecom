import { createSlice } from '@reduxjs/toolkit';
import { authApi, User } from '@services/authApi';
import { jwtDecode } from 'jwt-decode';

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

        const { id } = jwtDecode<{ id: number }>(action.payload.token);
        localStorage.setItem('token.' + id, action.payload.token);
        localStorage.setItem('activeUserId', id.toString());
      })
      .addMatcher(
        authApi.endpoints.fetchUserByToken.matchFulfilled,
        (state, action) => {
          // сейчас фейк апи в ответ на запрос с любым токеном
          // присылает первого юзера из списка
          // поэтому данные беру не из ответа сервера, а из токена (там они верные)
          // state.user = action.payload;
          const activeUserId = localStorage.getItem('activeUserId');
          state.user = jwtDecode(
            localStorage.getItem('token.' + activeUserId)!
          );
        }
      );
  },
});

export default authSlice.reducer;
