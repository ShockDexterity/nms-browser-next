import { createContext } from "react";
import { Reducer, ReducerAction } from "./types";

export const ReducerContext = createContext<Object>(null!);
export const DispatchContext = createContext<Function>(null!);

export const DEFAULT_REDUCER: Reducer = {
  savedPlanet: null,
  savedSystem: null,
  systemList: [],
  refreshPlanets: true,
  refreshSystems: true,
  dialog: {
    display: "",
    title: "",
    showDialog: "",
  },
  snackbar: {
    showSnackbar: false,
    snackbarSeverity: "warning",
    snackbarMessage: "Snackbar message not set",
  },
};

// export function generalReducer(state: Reducer, action: ReducerAction) {
//   switch (action.type) {
//   }
// }
