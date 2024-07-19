import { createContext } from "react";
import { GeneralReducer, GeneralReducerAction } from "./types";

export const GeneralReducerContext = createContext<GeneralReducer>(null!);
export const GeneralDispatchContext = createContext<Function>(null!);

export const DEFAULT_GEN_REDUCER: GeneralReducer = {
  refreshPlanets: true,
  refreshSystems: true,
  savedPlanet: null,
  savedSystem: null,
  systemList: [],
};

export function generalReducer(
  state: GeneralReducer,
  action: GeneralReducerAction,
): GeneralReducer {
  switch (action.type) {
    case "REFRESH_PLANETS":
      return { ...state, refreshPlanets: true };

    case "REFRESH_SYSTEMS":
      return { ...state, refreshSystems: true };

    case "PLANETS_REFRESHED":
      return { ...state, refreshPlanets: false };

    case "SYSTEMS_REFRESHED":
      return { ...state, refreshSystems: false };

    case "SAVE_PLANET": {
      const { planet } = action.payload;
      if (!planet) {
        throw new Error("Cannot save null|undefined for a planet");
      }
      return { ...state, savedPlanet: planet };
    }

    case "SAVE_SYSTEM": {
      const { system } = action.payload;
      if (!system) {
        throw new Error("Cannot save null|undefined for a system");
      }
      return { ...state, savedSystem: system };
    }

    case "SET_SYSTEM_LIST": {
      const { systemList } = action.payload;
      if (!systemList) {
        throw new Error("Cannot save null|undefined for the system list");
      }
      return { ...state, systemList };
    }

    default:
      return { ...state };
  }
}
