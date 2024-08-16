"use client";
import React from "react";

import {
  DEFAULT_SNK_REDUCER,
  SnackbarDispatchContext,
  SnackbarReducerContext,
  snackbarReducerFunction,
} from "@/lib/state/snackbarReducer";

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function UniversalProviders({ children }: Props) {
  const [snackbarReducer, snackbarDispatch] = React.useReducer(
    snackbarReducerFunction,
    DEFAULT_SNK_REDUCER,
  );

  return (
    <SnackbarReducerContext.Provider value={snackbarReducer}>
      <SnackbarDispatchContext.Provider value={snackbarDispatch}>
        {children}
      </SnackbarDispatchContext.Provider>
    </SnackbarReducerContext.Provider>
  );
}
