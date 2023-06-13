import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeAlertMessage } from "../../store/slice/snackbarSlice";

const SnackbarNotification = () => {
  const dispatch = useDispatch();
  const { alertMessageContent, severity, showAlertMessage } = useSelector(
    (state) => state.snackbar
  );

  function handleClose() {
    dispatch(closeAlertMessage());
  }
  return (
    <Snackbar
      anchorOrigin={{ vertical: "botom", horizontal: "center" }}
      open={showAlertMessage}
      onClose={handleClose}
      autoHideDuration={5000}
    >
      <Alert severity={severity}>{alertMessageContent ?? ""}</Alert>
    </Snackbar>
  );
};

export default SnackbarNotification;
