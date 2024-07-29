import { createContext, Dispatch } from "react";
import { DialogReducer, DialogReducerAction } from "./types";

export const DialogReducerContext = createContext<DialogReducer>(null!);
export const DialogDispatchContext = createContext<
  Dispatch<DialogReducerAction>
>(null!);

export const DEFAULT_DLG_REDUCER: DialogReducer = {
  display: "",
  title: "",
  planet: null!,
  system: null!,
};

export function dialogReducerFunction(
  state: DialogReducer,
  action: DialogReducerAction,
): DialogReducer {
  switch (action.type) {
    case "SHOW_DETAILS_DIALOG": {
      const { _for, title } = action.payload;
      if (!title) {
        throw new Error("You must specify the title for the dialog");
      }
      return { ...state, title, display: `${_for}_details` };
    }

    case "SHOW_ADD_DIALOG": {
      const { _for, title } = action.payload;
      if (!title) {
        throw new Error("You must specify the title for the dialog");
      }
      return { ...state, title, display: `add_${_for}` };
    }

    case "SHOW_EDIT_DIALOG": {
      const { _for, title } = action.payload;
      if (!title) {
        throw new Error("You must specify the title for the dialog");
      }
      return { ...state, title, display: `edit_${_for}` };
    }

    case "CLOSE_DIALOG":
      return { ...state, title: "", display: "" };

    case "SAVE":
      const { _for, planet, system } = action.payload;
      if (_for === "planet") {
        if (!planet) {
          throw new Error("Must provide a planet to save");
        }
        return { ...state, planet };
      } else if (_for === "system") {
        if (!system) {
          throw new Error("Must provide a system to save");
        }
        return { ...state, system };
      } else {
        throw new Error("Can only save a planet or system at this time");
      }

    default:
      return { ...state };
  }
}
