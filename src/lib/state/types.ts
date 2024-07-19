import { Planet, PlanetFilters, System, SystemFilters } from "../types";

export type GeneralReducer = {
  savedPlanet: Planet | null;
  savedSystem: System | null;
  systemList: System[];
  refreshPlanets: boolean;
  refreshSystems: boolean;
};

export type GeneralReducerAction = {
  type: string;
  payload: {
    planet?: Planet;
    system?: System;
    systemList?: System[];
    refreshPlanets: boolean;
    refreshSystems: boolean;
  };
};

export type DialogReducer = {
  display: string;
  title: string;
};

export type DialogReducerAction = {
  type: string;
  payload: {
    _for: string;
    title: string;
  };
};

export type SnackbarReducer = {
  show: boolean;
  severity: string;
  message: string;
};

export type SnackbarReducerAction = {
  type: string;
  payload: {
    severity: string;
    message: string;
  };
};
