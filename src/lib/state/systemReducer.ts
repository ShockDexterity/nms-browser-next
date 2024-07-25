import { createContext, Dispatch } from "react";
import { SystemReducer, SystemReducerAction } from "./types";

export const SystemReducerContext = createContext<SystemReducer>(null!);
export const SystemDispatchContext = createContext<
  Dispatch<SystemReducerAction>
>(null!);

export const DEFAULT_SYS_REDUCER: SystemReducer = {
  refresh: true,
  system: null,
};

export function systemReducer(
  state: SystemReducer,
  action: SystemReducerAction,
): SystemReducer {
  switch (action.type) {
    case "REFRESH":
      return { ...state, refresh: true };

    case "REFRESHED":
      return { ...state, refresh: false };

    case "SAVE": {
      const { system } = action.payload;
      if (!system) {
        throw new Error("Cannot save null|undefined for a system");
      }
      return { ...state, system };
    }

    default:
      return { ...state };
  }
}
