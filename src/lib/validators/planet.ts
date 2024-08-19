import { Planet } from "../types";

type AddSubmission = {
  name: string;
  system: string;
  descriptor: string;
  moon?: string | boolean;
  agricultural: string;
  stellar: string;
  local: string;
  general: string;
  sentinels: string;
};

export function validatePlanetAddition(submission: AddSubmission): {
  error?: {
    status: number;
    msg: string;
  };
  planet?: Planet;
  warning?: string;
} {
  console.log(submission);

  return { error: { status: 501, msg: "Not Yet Implemented" } };
}

type EditSubmission = AddSubmission & {
  biome: string;
};

export function validatePlanetEdit(submission: EditSubmission): {
  error?: {
    status: number;
    msg: string;
  };
  planet?: Planet;
  warning?: string;
} {
  console.log(submission);

  return { error: { status: 501, msg: "Not Yet Implemented" } };
}
