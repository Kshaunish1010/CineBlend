import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
};

export const authSlice = createSlice({
  name: "log",
  initialState,
  reducers: {
    googleSignIn: (state, action) => {
      const newUser = action.payload;
      localStorage.setItem("user", JSON.stringify(newUser));
      state.user = action.payload;
    },
    googleSignOut: (state) => {
      localStorage.removeItem("user");
      state.user = null;
    },
  },
});

export const { googleSignIn, googleSignOut } = authSlice.actions;
export default authSlice.reducer;
