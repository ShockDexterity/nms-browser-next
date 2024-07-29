import { createContext, Dispatch } from "react";
import { SystemListReducer, SystemListReducerAction } from "./types";

export const SystemListReducerContext = createContext<SystemListReducer>(null!);
export const SystemListDispatchContext = createContext<
  Dispatch<SystemListReducerAction>
>(null!);

export const DEFAULT_SYL_REDUCER: SystemListReducer = {
  systemList: [],
};

export function systemListReducerFunction(
  state: SystemListReducer,
  action: SystemListReducerAction,
): SystemListReducer {
  switch (action.type) {
    case "SET_LIST":
      const { systemList } = action.payload;
      if (!systemList) {
        throw new Error("Cannot provide null|undefined for the system list");
      }
      return { ...state, systemList: [...systemList] };

    default:
      return { ...state };
  }
}
