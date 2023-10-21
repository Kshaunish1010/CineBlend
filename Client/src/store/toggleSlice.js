import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  googleLogin: localStorage.getItem("gLogin") || true,
};

export const toggleSlice = createSlice({
  name: "check",
  initialState,
  reducers: {
    toggle(state, action) {
      state.googleLogin = action.payload;
      localStorage.setItem("gLogin", action.payload);
    },
  },
});

export const { toggle } = toggleSlice.actions;
export default toggleSlice.reducer;
