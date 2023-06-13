import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import snackbarSlice from "./slice/snackbarSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    snackbar: snackbarSlice,
  },
});

export default store;
