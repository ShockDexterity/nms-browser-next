"use client";
import React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import {
  useDialogDispatch,
  useDialogReducer,
  useSnackbarDispatch,
  useSystemDispatch,
  useSystemReducer,
} from "@/lib/customHooks";
import { getSystemBorder } from "@/lib/customFunctions";

type Props = Readonly<{ children: React.ReactNode }>;

export default function SystemDialog({ children }: Props) {
  const { show, display, title } = useDialogReducer();
  const dialogDispatch = useDialogDispatch();

  const { system } = useSystemReducer();
  const systemDispatch = useSystemDispatch();

  const snackbarDispatch = useSnackbarDispatch();

  const updateSnackbar = (
    severity: "success" | "warning" | "error",
    message: string,
  ) => {
    snackbarDispatch({ type: "HIDE_SNACKBAR", payload: {} });

    snackbarDispatch({
      type: "SET_SNACKBAR_SEVERITY",
      payload: { severity },
    });

    snackbarDispatch({
      type: "SET_SNACKBAR_MESSAGE",
      payload: { message },
    });

    snackbarDispatch({ type: "SHOW_SNACKBAR", payload: {} });
  };

  const refreshSystems = () => {
    systemDispatch({ type: "REFRESH", payload: {} });
  };

  const handleClose = () => {
    dialogDispatch({ type: "CLOSE_DIALOG", payload: { _for: "" } });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (!form && display !== "DETAILS") {
      throw new Error("Cannot find form to submit");
    }

    switch (display) {
      case "ADD_FORM":
        handleAddSubmit(form, updateSnackbar, refreshSystems, handleClose);
        break;

      case "EDIT_FORM":
        handleEditSubmit(
          form,
          system._id,
          updateSnackbar,
          refreshSystems,
          handleClose,
        );
        break;

      case "DETAILS":
        // nothing should happen, but you shouldn't be here anyway
        // don't want/need to throw an error
        break;

      default:
        throw new Error(
          "You tried to submit from something that shouldn't be submitting",
        );
    }
  };

  if (display === "DETAILS") {
    return (
      <Dialog
        open={show}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="sm"
        PaperProps={{
          sx: getSystemBorder(system.atlas, system.blackhole, false),
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
        <DialogTitle textAlign="center">{title}</DialogTitle>

        <DialogContent>{children}</DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

async function handleAddSubmit(
  form: EventTarget & HTMLFormElement,
  updateSnackbar: (
    severity: "success" | "warning" | "error",
    message: string,
  ) => void,
  refreshSystems: () => void,
  handleClose: () => void,
) {
  const formData = Object.fromEntries(new FormData(form).entries());
  const stringifiedData = JSON.stringify(formData);

  try {
    const apiResponse = await fetch("./api/systems", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: stringifiedData,
    });

    const response = await apiResponse.json();

    // add failed
    if (response.error) {
      updateSnackbar("error", response.error);
      return; // don't want to go further
    }

    // add succeeded
    if (response.warn) {
      // add succeeded but has a warning
      updateSnackbar("warning", `${response.msg}`);
    } else {
      // add succeeded without a warning
      updateSnackbar("success", `${response.msg}`);
    }

    // refresh systems
    refreshSystems();
    // reset the form
    form.reset();
    // close the dialog
    handleClose();
  } catch (error: unknown) {
    console.error(error);
    updateSnackbar(
      "error",
      "Unable to add system. Check the console for more information",
    );
  }
}

async function handleEditSubmit(
  form: EventTarget & HTMLFormElement,
  _id: string,
  updateSnackbar: (
    severity: "success" | "warning" | "error",
    message: string,
  ) => void,
  refreshSystems: () => void,
  handleClose: () => void,
) {
  const formData = Object.fromEntries(new FormData(form).entries());
  const stringifiedData = JSON.stringify(formData);

  try {
    const apiResponse = await fetch(`./api/systems/${_id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: stringifiedData,
    });

    const response = await apiResponse.json();

    // edit failed
    if (response.error) {
      updateSnackbar("error", response.error);
      return; // don't want to go further
    }

    // edit succeeded
    if (response.warn) {
      // edit succeeded but has a warning
      updateSnackbar("warning", `${response.msg}`);
    } else {
      // edit succeeded without a warning
      updateSnackbar("success", `${response.msg}`);
    }

    // refresh systems
    refreshSystems();
    // reset the form
    form.reset();
    // close the dialog
    handleClose();
  } catch (error: unknown) {
    console.error(error);
    updateSnackbar(
      "error",
      "Unable to edit system. Check the console for more information",
    );
  }
}
