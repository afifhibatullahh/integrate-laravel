import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showAlertMessage: false,
  alertMessageContent: null,
  severity: "info",
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    openAlertMessage(state, action) {
      const { payload } = action;
      state.showAlertMessage = true;
      state.alertMessageContent = payload.message;
      state.severity = payload.severity;
    },
    closeAlertMessage(state, action) {
      state.showAlertMessage = false;
      state.alertMessageContent = null;
    },
  },
});

export const { openAlertMessage, closeAlertMessage } = snackbarSlice.actions;

export default snackbarSlice.reducer;
