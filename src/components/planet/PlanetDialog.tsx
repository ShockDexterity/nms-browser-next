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
  usePlanetDispatch,
  usePlanetReducer,
  useSnackbarDispatch,
} from "@/lib/customHooks";
import { getBiomeBorder } from "@/lib/customFunctions";

import { APIFailure, APISuccess } from "@/lib/types";

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function PlanetDialog({ children }: Props) {
  const { show, display, title } = useDialogReducer();
  const dialogDispatch = useDialogDispatch();

  const { planet } = usePlanetReducer();
  const planetDispatch = usePlanetDispatch();

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

  const refreshPlanets = () => {
    planetDispatch({ type: "REFRESH", payload: {} });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (!form && display !== "DETAILS") {
      throw new Error("Cannot find form to submit");
    }

    if (display === "ADD_FORM") {
      if (await handleAddSubmit(form, updateSnackbar, refreshPlanets)) {
        handleClose();
      }
    } else if (display === "EDIT_FORM") {
      if (
        await handleEditSubmit(form, planet._id, updateSnackbar, refreshPlanets)
      ) {
        handleClose();
      }
    } else if (display === "DETAILS") {
      // nothing should happen, but you shouldn't be here anyway
      // don't want/need to throw an error
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
  refreshPlanets: () => void,
) {
  const formData = Object.fromEntries(new FormData(form).entries());
  // console.log(formData);
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

    const response = await apiResponse.json();

    if (response.error) {
      // add failed
      updateSnackbar("error", response.error);
      return false; // bad
    }

    // add succeeded
    if (response.warn) {
      // add succeeded but has a warning
      updateSnackbar("warning", `${response.msg}`);
    } else {
      // add succeeded without a warning
      updateSnackbar("success", `${response.msg}`);
    }
    refreshPlanets();
    form.reset();
    return true; // good
  } catch (error: unknown) {
    console.error(error);
    updateSnackbar(
      "error",
      "Unable to add planet. Check the console for more information",
    );
  }
  return false; // bad
}

async function handleEditSubmit(
  form: EventTarget & HTMLFormElement,
  _id: string,
  updateSnackbar: (
    severity: "success" | "warning" | "error",
    message: string,
  ) => void,
  refreshPlanets: () => void,
) {
  const formData = Object.fromEntries(new FormData(form).entries());
  // console.log(formData);
  const stringifiedData = JSON.stringify(formData);

  try {
    const apiResponse = await fetch(`./api/planets/${_id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: stringifiedData,
    });

    const response = await apiResponse.json();

    if (response.error) {
      // add failed
      updateSnackbar("error", response.error);
      return false; // bad
    }

    // add succeeded
    if (response.warn) {
      // add succeeded but has a warning
      updateSnackbar("warning", `${response.msg}`);
    } else {
      // add succeeded without a warning
      updateSnackbar("success", `${response.msg}`);
    }
    refreshPlanets();
    form.reset();
    return true; // good
  } catch (error: unknown) {
    console.error(error);
    updateSnackbar(
      "error",
      "Unable to add planet. Check the console for more information",
    );
  }
  return false; // bad
}
