"use client";
import React from "react";

import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";

import { useSnackbarDispatch, useSnackbarReducer } from "@/lib/customHooks";

export default function AlertSnackbar() {
  const { show, severity, message } = useSnackbarReducer();
  const dispatch = useSnackbarDispatch();

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch({ type: "HIDE_SNACKBAR", payload: {} });
  };

  return (
    <Snackbar open={show} autoHideDuration={5000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
