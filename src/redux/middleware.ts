import { isRejectedWithValue, Middleware } from "@reduxjs/toolkit";
import { logout } from "@/redux/features/auth/slice";

export const rtkQueryErrorLogger: Middleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action)) {
      dispatch(logout());
      return Promise.reject(action.payload);
    }

    return next(action);
  };
