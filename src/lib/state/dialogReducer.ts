import { createContext, Dispatch } from "react";
import {
  DialogReducer,
  DialogReducerAction,
  SystemListReducerAction,
} from "./types";

export const DialogReducerContext = createContext<DialogReducer>(null!);
export const DialogDispatchContext = createContext<
  Dispatch<SystemListReducerAction>
>(null!);

export const DEFAULT_DLG_REDUCER: DialogReducer = {
  display: "",
  title: "",
};

export function dialogReducer(
  state: DialogReducer,
  action: DialogReducerAction,
): DialogReducer {
  switch (action.type) {
    case "SHOW_DETAILS_DIALOG": {
      const { _for, title } = action.payload;
      return { ...state, title, display: `${_for}_details` };
    }

    case "SHOW_ADD_DIALOG": {
      const { _for, title } = action.payload;
      return { ...state, title, display: `add_${_for}` };
    }

    case "SHOW_EDIT_DIALOG": {
      const { _for, title } = action.payload;
      return { ...state, title, display: `edit_${_for}` };
    }

    case "CLOSE_DIALOG":
      return { ...state, title: "", display: "" };

    default:
      return { ...state };
  }
}
