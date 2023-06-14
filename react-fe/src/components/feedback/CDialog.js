import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";

export default function useDialogConfirm() {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState("");
  const [data, setData] = React.useState(null);

  const dialogConfirmOpen = (text, data) => {
    setOpen(true);
    setText(text);
    setData(data);
  };

  function DialogConfirmComponent({
    processing = false,
    handleConfirm,
    value = "OK",
  }) {
    return (
      <div>
        <Dialog
          fullWidth
          maxWidth="xs"
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Konfirmasi</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {text}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button disabled={processing} onClick={() => setOpen(false)}>
              Batal
            </Button>
            <Button
              disabled={processing}
              variant="contained"
              onClick={() => {
                handleConfirm(data);
                setOpen(false);
              }}
            >
              {value}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  return {
    DialogConfirmComponent,
    dialogConfirmOpen,
  };
}
