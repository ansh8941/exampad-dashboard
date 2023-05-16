import { InitialState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setAuthToken, getAuthToken, removeAuthToken } from "@/utils/token";
const initialState: InitialState = {
  posts: [],
  post: null,
};

const slice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<any>) => {
      const { posts } = action.payload;
      state.posts = posts;
    },
  },
});

// Actions
export const { setPosts } = slice.actions;

// Slice
export default slice;
