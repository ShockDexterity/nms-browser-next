import React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { useDialogDispatch, useDialogReducer } from "@/lib/customHooks";
import { getBiomeBorder } from "@/lib/customFunctions";

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function CustomDialog({ children }: Props) {
  const reducer = useDialogReducer();
  const { show, display, planet, title } = reducer;
  const dispatch = useDialogDispatch();

  const handleAddSubmit = (event: React.FormEvent<HTMLFormElement>) => {};

  const handleEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {};

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (display === "ADD_FORM") {
      handleAddSubmit(event);
    } else if (display === "EDIT_FORM") {
      handleEditSubmit(event);
    } else if (display === "DETAILS") {
      // nothing should happen, but you shouldn't be here anyway
    } else {
      // you shouldn't be here
      throw new Error(
        "You tried to submit from something that shouldn't be submitting",
      );
    }
  };

  const handleClose = () => {
    dispatch({ type: "CLOSE_DIALOG", payload: { _for: "" } });
  };

  if (display === "DETAILS") {
    return (
      <Dialog
        open={show}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="sm"
        PaperProps={{
          sx: getBiomeBorder(
            planet.extreme,
            planet.infested,
            planet.exotic,
            false,
          ),
        }}
      >
        <DialogTitle>{title}</DialogTitle>

        <DialogContent>{children}</DialogContent>
      </Dialog>
    );
  } else {
    return (
      <Dialog
        open={show}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="sm"
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>{title}</DialogTitle>

        <DialogContent>{children}</DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    );
  }
}
