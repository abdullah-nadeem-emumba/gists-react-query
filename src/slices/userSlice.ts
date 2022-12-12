import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../types/types";
import { USER } from "../constants/constants";
import { getUserFromStorage } from "../utils/utils";

const initialState: UserType = getUserFromStorage() || {
  username: "",
  token: "",
  url: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      state.username = USER.username;
      state.token = USER.token;
      state.url = USER.url;
    },
    logout: (state) => {
      state.username = "";
      state.token = "";
      state.url = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
