import { SentinelLevel } from "./enums";

export type Planet = {
  _id: string;
  name: string;
  system: string;
  descriptor: string;
  sentinels: SentinelLevel;
  moon: boolean;
  resources: {
    special: string; // agricultural resource
    r1: string; // stellar metal
    r2: string; // biome specific
    r3: string; // random third element
  };
  biome: string;
  exotic: boolean;
  extreme: boolean;
  infested: boolean;
};

export type System = {
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
