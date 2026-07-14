import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface AuthState {
  authState: "authenticated" | "loading" | null;
  token: string | null;
}

const initialState: AuthState = {
  authState: null,
  token: null,
};

export const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: () => ({
    setAuthState(
      state,
      action: PayloadAction<"authenticated" | "loading" | null>,
    ) {
      state.authState = action.payload;
    },

    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  }),
});

export const { setAuthState, setToken } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
