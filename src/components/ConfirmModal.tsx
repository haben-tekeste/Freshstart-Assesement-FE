import React from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { TransitionProps } from "@mui/material/transitions";
import {
  Typography,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  IconButton,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmModal({
  open,
  setOpen,
  handleDelete,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  handleDelete: () => void;
}) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <Box position="absolute" top={0} right={0}>
          <IconButton onClick={handleClose}>
            <IoIosCloseCircle />
          </IconButton>
        </Box>
        <DialogContent>
          <Typography>Are you sure you want to delete this item?</Typography>
        </DialogContent>
        <DialogActions>
          <Button color="info" variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              handleDelete();
              handleClose();
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
