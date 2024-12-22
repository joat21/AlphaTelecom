import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { v4 as uuidv4 } from 'uuid';
import { authApi, User } from '@services/authApi';

interface AuthState {
  guestId: string | null;
  activeUserId: number | null;
  tokens: Record<number, string>;
  user: User | null;
}

const initialState: AuthState = {
  guestId: null,
  activeUserId: null,
  tokens: {},
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    removeToken(state, action: PayloadAction<number>) {
      const newTokens = { ...state.tokens };
      delete newTokens[action.payload];

      state.tokens = newTokens;
      state.activeUserId = Number(Object.keys(state.tokens)[0]);

      if (!state.activeUserId) {
        state.guestId = uuidv4();
      }
    },

    changeActiveUserId(state, action: PayloadAction<number>) {
      state.activeUserId = action.payload;
    },

    setGuestId(state, action: PayloadAction<string | null>) {
      state.guestId = action.payload;
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

export const { removeToken, changeActiveUserId, setGuestId } =
  authSlice.actions;

export default authSlice.reducer;
