import { Planet, ValidationError } from "../types";

import {} from "@/lib/lists";

import {} from "@/lib/maps";

export function validatePlanetAddition(submission: Submission): {
  planet?: Planet;
  warning?: string;
} {
  console.log(submission);

  const { planet, warning } = validatePlanet(submission);

  throw new ValidationError("Not Yet Implemented", 501);
}

export function validatePlanetEdit(submission: Submission): {
  planet?: Planet;
  warning?: string;
} {
  console.log(submission);

  const { planet, warning } = validatePlanet(submission);

  throw new ValidationError("Not Yet Implemented", 501);
}

type Submission = {
  name?: string;
  system?: string;
  descriptor?: string;
  biome?: string;
  moon?: string | boolean;
  agricultural?: string;
  stellar?: string;
  local?: string;
  general?: string;
  sentinels?: string;
};

export function validatePlanet(
  submission: Submission,
  edit: boolean = false,
): {
  planet?: Planet;
  warning?: string;
} {
  if (Object.keys(submission).length === 0) {
    throw new ValidationError("No information provided", 400);
  }

  let warning = "";

  if (!submission.name) {
    throw new ValidationError("Planet name is required", 400);
  }

  if (!submission.system) {
    throw new ValidationError("Planet's System name is required", 400);
  }

  if (!submission.descriptor) {
    throw new ValidationError("Biome descriptor is required", 400);
  }

  if (edit && !submission.biome) {
    throw new ValidationError("Must provide planet Biome when editing", 400);
  }

  if (submission.moon && typeof submission.moon === "string") {
    const moonOptions = ["yes", "no", "on", "off", "true", "false"];
    if (!moonOptions.includes(submission.moon)) {
      throw new ValidationError(
        `A "moon" string must be: ${moonOptions.join(" ")}`,
        400,
      );
    }
  }

  if (!submission.agricultural) {
    throw new ValidationError("Agricultural resource required", 400);
  }

  if (!submission.stellar) {
    throw new ValidationError("Stellar resource required", 400);
  }

  if (!submission.local) {
    throw new ValidationError("Biome local resource required", 400);
  }

  if (!submission.general) {
    throw new ValidationError("General resource required", 400);
  }

  if (!submission.sentinels) {
    throw new ValidationError("Sentinel level is required", 400);
  }

  if (edit) {
    if (warning && warning !== "") {
      return { warning };
    }

    return {};
  } else {
    if (warning && warning !== "") {
      return { warning };
    }

    return {};
  }
}
