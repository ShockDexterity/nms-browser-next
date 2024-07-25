"use client";
import React from "react";

import {
  DEFAULT_SYL_REDUCER,
  SystemListDispatchContext,
  systemListReducer,
  SystemListReducerContext,
} from "@/lib/state/systemListReducer";

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function SystemListProvider({ children }: Props) {
  const [reducer, dispatch] = React.useReducer(
    systemListReducer,
    DEFAULT_SYL_REDUCER,
  );

  return (
    <SystemListReducerContext.Provider value={reducer}>
      <SystemListDispatchContext.Provider value={dispatch}>
        {children}
      </SystemListDispatchContext.Provider>
    </SystemListReducerContext.Provider>
  );
}
