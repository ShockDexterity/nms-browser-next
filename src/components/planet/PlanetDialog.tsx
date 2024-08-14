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
} from "@/lib/customHooks";
import { getBiomeBorder } from "@/lib/customFunctions";

import { APIFailure, APISuccess } from "@/lib/types";

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function PlanetDialog({ children }: Props) {
  const { show, display, planet, title } = useDialogReducer();
  const dialogDispatch = useDialogDispatch();

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const rawFormData = new FormData(form);
    const formData = Object.fromEntries(rawFormData.entries());

    if (display === "ADD_FORM") {
      await handleAddSubmit(formData, updateSnackbar);
      form.reset();
    } else if (display === "EDIT_FORM") {
      await handleEditSubmit(planet._id, formData, updateSnackbar);
      form.reset();
    } else if (display === "DETAILS") {
      // nothing should happen, but you shouldn't be here anyway
    } else {
      // you REALLY shouldn't be here
      throw new Error(
        "You tried to submit from something that shouldn't be submitting",
      );
    }
  };

  const handleClose = () => {
    dialogDispatch({ type: "CLOSE_DIALOG", payload: { _for: "" } });
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

async function handleAddSubmit(
  formData: Object,
  updateSnackbar: (
    severity: "success" | "warning" | "error",
    message: string,
  ) => void,
) {
  const stringifiedData = JSON.stringify(formData);
  try {
    const apiResponse = await fetch("./api/planets", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: stringifiedData,
    });

    const response: APISuccess | APIFailure = await apiResponse.json();

    if (response.error) {
      // edit failed
      updateSnackbar("error", response.msg);
    } else if (response.success) {
      // edit succeeded
      if (response.warn) {
        // edit succeeded but has a warning
        updateSnackbar("warning", response.msg);
      } else {
        // edit succeeded without a warning
        updateSnackbar("success", response.msg);
      }
    }
  } catch (error: unknown) {
    console.error(error);
    updateSnackbar(
      "error",
      "Unable to add planet. Check the console for more information",
    );
  }
}

async function handleEditSubmit(
  _id: string,
  formData: Object,
  updateSnackbar: (
    severity: "success" | "warning" | "error",
    message: string,
  ) => void,
) {
  const stringifiedData = JSON.stringify({ _id, ...formData });
  try {
    const apiResponse = await fetch(`./api/planets/${_id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: stringifiedData,
    });

    const response: APISuccess | APIFailure = await apiResponse.json();

    if (response.error) {
      // edit failed
      updateSnackbar("error", response.msg);
    } else if (response.success) {
      // edit succeeded
      if (response.warn) {
        // edit succeeded but has a warning
        updateSnackbar("warning", response.msg);
      } else {
        // edit succeeded without a warning
        updateSnackbar("success", response.msg);
      }
    }
  } catch (error: unknown) {
    console.error(error);
    updateSnackbar(
      "error",
      "Unable to edit planet. Check the console for more information",
    );
  }
}
