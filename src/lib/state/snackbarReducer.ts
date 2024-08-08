import { createContext, Dispatch } from "react";
import { SnackbarReducer, SnackbarReducerAction } from "./types";

export const SnackbarReducerContext = createContext<SnackbarReducer>(null!);
export const SnackbarDispatchContext = createContext<
  Dispatch<SnackbarReducerAction>
>(null!);

export const DEFAULT_SNK_REDUCER: SnackbarReducer = {
  show: false,
  severity: "warning",
  message: "Snackbar message not set",
};

export function snackbarReducerFunction(
  state: SnackbarReducer,
  action: SnackbarReducerAction,
): SnackbarReducer {
  switch (action.type) {
    case "SHOW_SNACKBAR":
      return { ...state, show: true };

    case "HIDE_SNACKBAR":
      return { ...state, show: false };

    case "SET_SNACKBAR_SEVERITY": {
      const { severity } = action.payload;
      if (!severity) {
        throw new Error("Must provide snackbar severity level");
      }
      return { ...state, severity };
    }

    case "SET_SNACKBAR_MESSAGE": {
      const { message } = action.payload;
      if (!message || message === "") {
        throw new Error("Must provide snackbar message");
      }
      return { ...state, message };
    }

    default:
      return { ...state };
  }
}
