import { Planet, PlanetFilters, System, SystemFilters } from "../types";

export type Reducer = {
  savedPlanet: Planet | null;
  savedSystem: System | null;
  systemList: System[];
  refreshPlanets: boolean;
  refreshSystems: boolean;
  dialog: DialogReducer;
  snackbar: SnackbarReducer;
};

export type DialogReducer = {
  display: string;
  title: string;
  showDialog: string;
};

export type SnackbarReducer = {
  showSnackbar: boolean;
  snackbarSeverity: string;
  snackbarMessage: string;
};

export type ReducerAction = {
  type: string;
  payload: {
    snackbar?: {
      severity: string;
      message: string;
    };
    dialog?: {
      for: string;
      title: string;
      show: string;
    };
    planet?: Planet;
    system?: System;
    systemList?: System[];
  };
};
