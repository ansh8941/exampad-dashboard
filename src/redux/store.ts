import { Action, configureStore, combineReducers, Reducer } from "@reduxjs/toolkit";
import { api as authApi, slice as authSlice } from "./features/auth";
import { api as profileApi, slice as profileSlice } from "./features/profile";
import { api as blogApi, slice as blogSlice } from "./features/blog";

import { rtkQueryErrorLogger } from "./middleware";

export interface RootState {
  [authSlice.name]: ReturnType<typeof authSlice.reducer>;
  [blogSlice.name]: ReturnType<typeof blogSlice.reducer>;
  [authApi.reducerPath]: ReturnType<typeof authApi.reducer>;
  [blogApi.reducerPath]: ReturnType<typeof blogApi.reducer>;
  [profileSlice.name]: ReturnType<typeof profileSlice.reducer>;
  [profileApi.reducerPath]: ReturnType<typeof profileApi.reducer>;
}

const reducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [blogSlice.name]: blogSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [blogApi.reducerPath]: blogApi.reducer,
  [profileSlice.name]: profileSlice.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
});

const rootReducer: Reducer<RootState, Action> = (state, action) => {
  if (action.type === "auth/logout") {
    state = undefined;
  }
  return reducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authApi.middleware, profileApi.middleware, blogApi.middleware, rtkQueryErrorLogger]),
});

export type AppDispatch = typeof store.dispatch;
