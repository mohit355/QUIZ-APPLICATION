import { createSlice } from "@reduxjs/toolkit";
import { isEmailValid } from "../utils/utils";

let initialState = {
  email: "",
  inValidEmail: false,
  redirect: false,
};

export const homeSlice = createSlice({
  name: "home",
  initialState: initialState,
  reducers: {
    onChangeEmail: (state, action) => {
      state.inValidEmail = false;
      state.email = action.payload;
    },
    setInValidErrorMsg: (state, action) => {
      state.inValidEmail = true;
    },
  },
});

export const { onChangeEmail, setInValidErrorMsg } = homeSlice.actions;
export default homeSlice.reducer;
