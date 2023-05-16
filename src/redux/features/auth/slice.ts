import { InitialState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setAuthToken, getAuthToken, removeAuthToken } from "@/utils/token";
const initialState: InitialState = {
  isAuthanticate: !!getAuthToken() ? !!getAuthToken() : false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<any>) => {
      const { accessToken } = action.payload;
      setAuthToken(accessToken);
      state.isAuthanticate = true;
    },
    logout: (state) => {
      removeAuthToken();
      state.isAuthanticate = false;
    },
  },
});

// Actions
export const { loginSuccess, logout } = slice.actions;

// Slice
export default slice;
