import { Planet, PlanetFilters, System, SystemFilters } from "../types";

export type DialogReducer = {
  show: boolean;
  display: "" | "DETAILS" | "ADD_FORM" | "EDIT_FORM";
  title: string;
  planet: Planet;
  system: System;
};

export type DialogReducerAction = {
  type:
    | "SHOW_DETAILS_DIALOG"
    | "SHOW_ADD_DIALOG"
    | "SHOW_EDIT_DIALOG"
    | "CLOSE_DIALOG"
    | "SAVE";
  payload: {
    _for: "" | "planet" | "system";
    title?: string;
    planet?: Planet;
    system?: System;
  };
};

export type PlanetReducer = {
  refresh: boolean;
  planet: Planet | null;
};

export type PlanetReducerAction = {
  type: "REFRESH" | "REFRESHED" | "SAVE";
  payload: {
    planet?: Planet;
  };
};

export type SystemReducer = {
  refresh: boolean;
  system: System | null;
};

export type SystemReducerAction = {
  type: "REFRESH" | "REFRESHED" | "SAVE";
  payload: {
    system?: System;
  };
};

export type SystemListReducer = {
  systemList: string[];
};

export type SystemListReducerAction = {
  type: "SET_LIST";
  payload: {
    systemList?: string[];
  };
};

export type SnackbarReducer = {
  show: boolean;
  severity: "success" | "warning" | "error";
  message: string;
};

export type SnackbarReducerAction = {
  type:
    | "SHOW_SNACKBAR"
    | "HIDE_SNACKBAR"
    | "SET_SNACKBAR_SEVERITY"
    | "SET_SNACKBAR_MESSAGE";
  payload: {
    severity?: "success" | "warning" | "error";
    message?: string;
  };
};
