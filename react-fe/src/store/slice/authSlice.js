import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../services/auth/login";
import { openAlertMessage } from "./snackbarSlice";

const initialState = {
  name: "",
  email: "",
  token: "",
  loading: false,
  error: null,
};

export const login = createAsyncThunk("loginuser", async (userDetails) => {
  return await api.LOGIN_API(userDetails);
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.token = null;
      localStorage.clear();
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [login.fulfilled]: (state, { payload }) => {
      const { token, name, email } = payload.data.data;
      state.loading = false;
      state.token = token;
      state.name = name;
      state.email = email;
      localStorage.setItem("token", token);
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
