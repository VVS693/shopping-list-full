import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

interface AlertDialogProps {
  isOpen: boolean;
  text: string;
  cancelFunc?: () => void;
  okFunc?: () => void;
}

export function AlertDialog({
  isOpen,
  text,
  cancelFunc,
  okFunc,
}: AlertDialogProps) {
  const handleCloseOk = () => {
    if (okFunc) {
      okFunc();
    }
  };

  const handleCloseCancel = () => {
    if (cancelFunc) {
      cancelFunc();
    }
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleCloseCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
      >
        <DialogTitle id="alert-dialog-title">{text}</DialogTitle>
        <DialogActions>
          {cancelFunc && (
            <Button
              onClick={handleCloseCancel}
              autoFocus={!(Boolean(okFunc) && Boolean(cancelFunc)) || !Boolean(okFunc) ? true : false}
            >
              Cancel
            </Button>
          )}
          {okFunc && (
            <Button
              onClick={handleCloseOk}
              autoFocus={(Boolean(okFunc) && Boolean(cancelFunc)) || !Boolean(cancelFunc) ? true : false}
            >
              Ok
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
