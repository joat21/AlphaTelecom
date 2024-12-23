import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { v4 as uuidv4 } from 'uuid';
import { authApi } from '@services/authApi';

interface AuthState {
  guestId: string | null;
  activeUserId: number | null;
  tokens: Record<number, string>;
}

const initialState: AuthState = {
  guestId: null,
  activeUserId: null,
  tokens: {},
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
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        const { id } = jwtDecode<{ id: number }>(action.payload.token);
        state.tokens[id] = action.payload.token;
        state.activeUserId = id;
      }
    );
  },
});

export const { removeToken, changeActiveUserId, setGuestId } =
  authSlice.actions;

export default authSlice.reducer;
