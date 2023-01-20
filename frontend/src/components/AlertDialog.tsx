import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { alerDialogOpen } from "../store/reducers/usersSlice";

interface AlertDialogProps {
  cancelFunc?: () => void;
  okFunc?: () => void;
}

export function AlertDialog({ cancelFunc, okFunc }: AlertDialogProps) {
  const dispatch = useAppDispatch();

  const { isAlertDialogOpen, alertDialogText } = useAppSelector(
    (state) => state.userReducer
  );

  const handleCloseOk = () => {
    const alertData = {
      isAlertDialogOpen: false,
      alertDialogText: "",
    };
    dispatch(alerDialogOpen(alertData));
    if (okFunc) {
      okFunc();
    }
  };

  const handleCloseCancel = () => {
    const alertData = {
      isAlertDialogOpen: false,
      alertDialogText: "",
    };
    dispatch(alerDialogOpen(alertData));
    if (cancelFunc) {
      cancelFunc();
    }
  };

  return (
    <div>
      <Dialog
        open={isAlertDialogOpen}
        onClose={handleCloseCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
      >
        <DialogTitle id="alert-dialog-title">{alertDialogText}</DialogTitle>
        <DialogActions>
          {cancelFunc && <Button onClick={handleCloseCancel}>Cancel</Button>}
          {okFunc && (
            <Button onClick={handleCloseOk} autoFocus>
              Ok
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
