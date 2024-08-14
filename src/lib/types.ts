import { SentinelLevel } from "./enums";

export type Planet = {
  _id: string;
  name: string;
  system: string;
  descriptor: string;
  sentinels: SentinelLevel;
  moon: boolean;
  resources: {
    // The agricultural resource found on the planet
    agricultural: string;

    // The metal resource dependent on the color of the star
    stellar: string;

    // The resource local to the planet's biome
    local: string;

    // Resources that can be found anywhere
    general: string;
  };
  biome: string;
  exotic: boolean;
  extreme: boolean;
  infested: boolean;
};

export type System = {
  _id: string;
  name: string;
  faction: string;
  abandoned: boolean;
  economy: {
    descriptor: string;
    type: string;
    state: string;
    strength: string;
  };
  conflict: string;
  exosuit: boolean;
  v3: boolean;
  atlas: boolean;
  blackhole: boolean;
};

export type PlanetFilters = {
  biomeOrSpecial: string;
  stellar: string;
  otherResource1: string;
  otherResource2: string;
};

export type SystemFilters = {
  faction: string;
  econType: string;
  econStr: string;
  conflict: string;
  exosuit: boolean;
  v3: boolean;
  atlas: boolean;
  blackhole: boolean;
};

type CustomApiResponse = {
  msg: string;
};

export type APIFailure = CustomApiResponse & {
  error: true;
  success?: never;
};

export type APISuccess = CustomApiResponse & {
  error?: never;
  success: true;
  warn: boolean;
};
