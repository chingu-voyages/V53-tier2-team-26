/* eslint-disable react/prop-types */

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

export default function ModalA({onClose}) {

  return (
    <>
      <Dialog
        sx={{ color: "red" }}
        open="true"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent sx={{ backgroundColor: "red" }}>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ color: "white", fontWeight: "bold" }}
          >
            Menu not yet generated for selected week
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "red" }}>

          <Button
            sx={{ color: "white" }}
            onClick={onClose}
            autoFocus
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
