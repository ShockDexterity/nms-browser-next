"use client";
import React from "react";

import {
  DEFAULT_SYL_REDUCER,
  SystemListDispatchContext,
  systemListReducerFunction,
  SystemListReducerContext,
} from "@/lib/state/systemListReducer";
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
  const [systemListReducer, systemListDispatch] = React.useReducer(
    systemListReducerFunction,
    DEFAULT_SYL_REDUCER,
  );

  const [snackbarReducer, snackbarDispatch] = React.useReducer(
    snackbarReducerFunction,
    DEFAULT_SNK_REDUCER,
  );

  return (
    <SystemListReducerContext.Provider value={systemListReducer}>
      <SystemListDispatchContext.Provider value={systemListDispatch}>
        <SnackbarReducerContext.Provider value={snackbarReducer}>
          <SnackbarDispatchContext.Provider value={snackbarDispatch}>
            {children}
          </SnackbarDispatchContext.Provider>
        </SnackbarReducerContext.Provider>
      </SystemListDispatchContext.Provider>
    </SystemListReducerContext.Provider>
  );
}
