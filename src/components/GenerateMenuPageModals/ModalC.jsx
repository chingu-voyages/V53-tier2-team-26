/* eslint-disable react/prop-types */

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

export default function ModalC({onAgree, onDisagree}) {

  return (
    <>
      <Dialog
        sx={{ color: "rgb(0,82,204)" }}
        open="true"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent sx={{ backgroundColor: "rgb(0,82,204)" }}>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ color: "white", fontWeight: "bold" }}
          >
            Regenerate menu for selected week?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "rgb(0,82,204)" }}>
          <Button sx={{ color: "white" }} onClick={onDisagree}>
            Disagree
          </Button>
          <Button
            sx={{ color: "white" }}
            onClick={onAgree}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
