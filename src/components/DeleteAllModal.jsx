/* eslint-disable react/prop-types */
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

export default function DeleteAllModal({ showDeleteAllModal, handleClosingDeleteAllDialog }) {
    const handleClose = (Agree) => {
        handleClosingDeleteAllDialog(Agree);
    };

    return (
        <>
            <Dialog
                sx={{ color: "white" }}
                open={showDeleteAllModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogContent sx={{ backgroundColor: "red" }}>
                    <DialogContentText id="alert-dialog-description" sx={{ color: "white", fontWeight: "bold" }}>
                        Are you sure you want to delete all the allergies from this employee
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ backgroundColor: "red" }}>
                    <Button sx={{ color: "white" }} onClick={() => handleClose(false)}>
                        Disagree
                    </Button>
                    <Button sx={{ color: "white" }} onClick={() => handleClose(true)} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
