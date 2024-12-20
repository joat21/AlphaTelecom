import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi, User } from '@services/authApi';
import { jwtDecode } from 'jwt-decode';

interface AuthState {
  activeUserId: number | null;
  tokens: Record<number, string>;
  user: User | null;
}

const initialState: AuthState = {
  activeUserId: null,
  tokens: {},
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    removeToken(state, action: PayloadAction<number>) {
      delete state.tokens[action.payload];
      state.activeUserId = Number(Object.keys(state.tokens)[0]);
    },

    changeActiveUserId(state, action: PayloadAction<number>) {
      state.activeUserId = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        state.user = action.payload.data;

        const { id } = jwtDecode<{ id: number }>(action.payload.token);
        state.tokens[id] = action.payload.token;
        state.activeUserId = id;
      })
      .addMatcher(
        authApi.endpoints.fetchUserByToken.matchFulfilled,
        (state) => {
          // сейчас фейк апи в ответ на запрос с любым токеном
          // присылает первого юзера из списка
          // поэтому данные беру не из ответа сервера, а из токена (там они верные)
          // state.user = action.payload;
          state.user = jwtDecode(state.tokens[state.activeUserId!]);
        }
      );
  },
});

export const { removeToken, changeActiveUserId } = authSlice.actions;

export default authSlice.reducer;
