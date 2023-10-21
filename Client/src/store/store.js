import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import toggleReducer from "./toggleSlice";
import { customReducer } from "./Reducers";
import { otpReducer } from "./OteReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    toggle: toggleReducer,
    customReducer: customReducer,
    otpReducer: otpReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
