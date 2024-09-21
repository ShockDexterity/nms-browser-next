import { useContext } from "react";

import {
  DialogDispatchContext,
  DialogReducerContext,
} from "./state/dialogReducer";

import {
  PlanetDispatchContext,
  PlanetReducerContext,
} from "./state/planetReducer";

import {
  SnackbarDispatchContext,
  SnackbarReducerContext,
} from "./state/snackbarReducer";

import {
  SystemDispatchContext,
  SystemReducerContext,
} from "./state/systemReducer";

export function useDialogReducer() {
  const reducer = useContext(DialogReducerContext);

  if (!reducer) {
    throw new Error(
      "Dialog reducer has to be used withing <DialogReducerContext.Provider>",
    );
  }

  return reducer;
}

export function useDialogDispatch() {
  const dispatch = useContext(DialogDispatchContext);

  if (!dispatch) {
    throw new Error(
      "Dialog dispatch has to be used within <DialogDispatchContext.Provider>",
    );
  }

  return dispatch;
}

export function usePlanetReducer() {
  const reducer = useContext(PlanetReducerContext);

  if (!reducer) {
    throw new Error(
      "General reducer has to be used withing <PlanetReducerContext.Provider>",
    );
  }

  return reducer;
}

export function usePlanetDispatch() {
  const dispatch = useContext(PlanetDispatchContext);

  if (!dispatch) {
    throw new Error(
      "General dispatch has to be used within <PlanetDispatchContext.Provider>",
    );
  }

  return dispatch;
}

export function useSnackbarReducer() {
  const reducer = useContext(SnackbarReducerContext);

  if (!reducer) {
    throw new Error(
      "Snackbar reducer has to be used withing <SnackbarReducerContext.Provider>",
    );
  }

  return reducer;
}

export function useSnackbarDispatch() {
  const dispatch = useContext(SnackbarDispatchContext);

  if (!dispatch) {
    throw new Error(
      "Snackbar dispatch has to be used within <SnackbarDispatchContext.Provider>",
    );
  }

  return dispatch;
}

export function useSystemReducer() {
  const reducer = useContext(SystemReducerContext);

  if (!reducer) {
    throw new Error(
      "General reducer has to be used withing <SystemReducerContext.Provider>",
    );
  }

  return reducer;
}

export function useSystemDispatch() {
  const dispatch = useContext(SystemDispatchContext);

  if (!dispatch) {
    throw new Error(
      "General dispatch has to be used within <SystemDispatchContext.Provider>",
    );
  }

  return dispatch;
}
