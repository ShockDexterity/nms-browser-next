"use client";
import React from "react";

import {
  DEFAULT_DLG_REDUCER,
  DialogDispatchContext,
  DialogReducerContext,
  dialogReducerFunction,
} from "@/lib/state/dialogReducer";

import {
  DEFAULT_SYL_REDUCER,
  SystemListDispatchContext,
  systemListReducerFunction,
  SystemListReducerContext,
} from "@/lib/state/systemListReducer";

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function UniversalProviders({ children }: Props) {
  const [systemListReducer, systemListDispatch] = React.useReducer(
    systemListReducerFunction,
    DEFAULT_SYL_REDUCER,
  );

  const [dialogReducer, dialogDispatch] = React.useReducer(
    dialogReducerFunction,
    DEFAULT_DLG_REDUCER,
  );

  return (
    <SystemListReducerContext.Provider value={systemListReducer}>
      <SystemListDispatchContext.Provider value={systemListDispatch}>
        <DialogReducerContext.Provider value={dialogReducer}>
          <DialogDispatchContext.Provider value={dialogDispatch}>
            {children}
          </DialogDispatchContext.Provider>
        </DialogReducerContext.Provider>
      </SystemListDispatchContext.Provider>
    </SystemListReducerContext.Provider>
  );
}
