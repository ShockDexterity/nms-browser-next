import { useContext } from "react";

import {
  GeneralDispatchContext,
  GeneralReducerContext,
} from "./state/generalReducer";
import {
  DialogDispatchContext,
  DialogReducerContext,
} from "./state/dialogReducer";
import {
  SnackbarDispatchContext,
  SnackbarReducerContext,
} from "./state/snackbarReducer";

export const useGeneralReducer = () => {
  const reducer = useContext(GeneralReducerContext);

  if (!reducer) {
    throw new Error(
      "General reducer has to be used withing <GeneralReducerContext.Provider>",
    );
  }

  return reducer;
};

export const useGeneralDispatch = () => {
  const dispatch = useContext(GeneralDispatchContext);

  if (!dispatch) {
    throw new Error(
      "General dispatch has to be used within <GeneralDispatchContext.Provider>",
    );
  }

  return dispatch;
};

export const useDialogReducer = () => {
  const reducer = useContext(DialogReducerContext);

  if (!reducer) {
    throw new Error(
      "Dialog reducer has to be used withing <DialogReducerContext.Provider>",
    );
  }

  return reducer;
};

export const useDialogDispatch = () => {
  const dispatch = useContext(DialogDispatchContext);

  if (!dispatch) {
    throw new Error(
      "Dialog dispatch has to be used within <DialogDispatchContext.Provider>",
    );
  }

  return dispatch;
};

export const useSnackbarReducer = () => {
  const reducer = useContext(SnackbarReducerContext);

  if (!reducer) {
    throw new Error(
      "Snackbar reducer has to be used withing <SnackbarReducerContext.Provider>",
    );
  }

  return reducer;
};

export const useSnackbarDispatch = () => {
  const dispatch = useContext(SnackbarDispatchContext);

  if (!dispatch) {
    throw new Error(
      "Snackbar dispatch has to be used within <SnackbarDispatchContext.Provider>",
    );
  }

  return dispatch;
};
