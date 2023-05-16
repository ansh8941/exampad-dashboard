import { InitialState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: InitialState = {
  authProfile: {
    bio: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  },
};

const slice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    authProfileSuccess: (state, action: PayloadAction<any>) => {
      const { profileCurrentUser } = action.payload;
      state.authProfile = {
        bio: profileCurrentUser?.bio,
        firstName: profileCurrentUser?.firstName,
        lastName: profileCurrentUser?.lastName,
        username: profileCurrentUser?.username,
        email: profileCurrentUser?.user?.email,
      };
    },
  },
});

// Actions
export const { authProfileSuccess } = slice.actions;

// Slice
export default slice;
