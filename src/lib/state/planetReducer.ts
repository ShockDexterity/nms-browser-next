import { createContext, Dispatch } from "react";
import { PlanetReducer, PlanetReducerAction } from "./types";

export const PlanetReducerContext = createContext<PlanetReducer>(null!);
export const PlanetDispatchContext = createContext<
  Dispatch<PlanetReducerAction>
>(null!);

export const DEFAULT_PLN_REDUCER: PlanetReducer = {
  refresh: true,
  planet: null,
};

export function planetReducerFunction(
  state: PlanetReducer,
  action: PlanetReducerAction,
): PlanetReducer {
  switch (action.type) {
    case "REFRESH":
      return { ...state, refresh: true };

    case "REFRESHED":
      return { ...state, refresh: false };

    case "SAVE": {
      if (!action.payload) {
        throw new Error("Action payload must be defined");
      }
      const { planet } = action.payload;
      if (!planet) {
        throw new Error("Cannot save null|undefined for a planet");
      }
      return { ...state, planet };
    }

    default:
      return { ...state };
  }
}
