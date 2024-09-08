import { PlanetNoId, ValidationError } from "../types";

import {
  agriculturalResources,
  biomeDescriptors,
  biomes,
  exoticBiomes,
  generalResources,
  localResources,
  stellarMetals,
} from "@/lib/lists";

import {
  biomeAgriculturalResourceMap,
  biomeDescriptorMap,
  infestedAgriculturalResourceMap,
  resourceBiomeMap,
} from "@/lib/maps";
import { SentinelLevel } from "../enums";

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
  validPlanet?: PlanetNoId;
  warning?: string;
} {
  if (Object.keys(submission).length === 0) {
    throw new ValidationError("No information provided", 400);
  }

  let warning = null;

  if (!submission.name) {
    throw new ValidationError("Planet name is required", 400);
  }
  const sName = submission.name;

  if (!submission.system) {
    throw new ValidationError("Planet's System name is required", 400);
  }
  const sSystem = submission.system;

  if (!submission.descriptor) {
    throw new ValidationError("Biome descriptor is required", 400);
  } else if (!biomeDescriptors.includes(submission.descriptor)) {
    throw new ValidationError("Invalid biome descriptor", 400);
  }
  const sDescriptor = submission.descriptor;

  const goodMoonStrings = ["yes", "on", "true", true];
  const badMoonStrings = ["no", "off", "false", false];
  if (submission.moon && typeof submission.moon === "string") {
    const moonOptions = [...goodMoonStrings, ...badMoonStrings];
    if (!moonOptions.includes(submission.moon)) {
      throw new ValidationError(
        `A "moon" string must be: ${moonOptions.join(" ")}`,
        400,
      );
    }
  }
  const sMoon =
    submission.moon !== undefined
      ? goodMoonStrings.includes(submission.moon)
      : false;

  if (!submission.agricultural) {
    throw new ValidationError("Agricultural resource required", 400);
  } else if (!agriculturalResources.includes(submission.agricultural)) {
    throw new ValidationError("Invalid agricultural resource", 400);
  }
  const sAgricultural = submission.agricultural;

  if (!submission.stellar) {
    throw new ValidationError("Stellar resource required", 400);
  } else if (!stellarMetals.includes(submission.stellar)) {
    throw new ValidationError("Invalid stellar metal", 400);
  }
  const sStellar = submission.stellar;

  if (!submission.local) {
    throw new ValidationError("Biome local resource required", 400);
  } else if (!localResources.includes(submission.local)) {
    throw new ValidationError("Invalid biome local resource", 400);
  }
  const sLocal = submission.local;

  if (!submission.general) {
    throw new ValidationError("General resource required", 400);
  } else if (!generalResources.includes(submission.general)) {
    throw new ValidationError("Invalid general resource", 400);
  }
  const sGeneral = submission.general;

  const sResources = {
    agricultural: sAgricultural,
    stellar: sStellar,
    local: sLocal,
    general: sGeneral,
  };

  if (!submission.sentinels) {
    throw new ValidationError("Sentinel level is required", 400);
  } else if (
    !Object.values(SentinelLevel).includes(
      submission.sentinels as SentinelLevel,
    )
  ) {
    throw new ValidationError("Invalid Sentinel level", 400);
  }
  const sSentinels: SentinelLevel = submission.sentinels as SentinelLevel;

  let sBiome = "";
  if (edit) {
    if (!submission.biome) {
      throw new ValidationError("Must provide planet Biome when editing", 400);
    } else if (
      !biomes.includes(submission.biome) &&
      submission.biome !== "Lush / Marsh"
    ) {
      throw new ValidationError("Invalid biome", 400);
    }

    const { biome, note } = getBiomeEdit(
      sDescriptor,
      sAgricultural,
      sLocal,
      submission.biome,
    );

    sBiome = biome;
    if (note) {
      warning = note;
    }
  } else {
    sBiome = getBiomeNew(sDescriptor, sAgricultural, sLocal);
    if (sBiome.indexOf("/") !== -1) {
      warning = 'Cannot determine if planet is "Lush" or "Marsh".';
    }
  }

  verifyResources(sBiome, sAgricultural, sLocal);

  const returnPlanet: PlanetNoId = {
    name: sName,
    system: sSystem,
    descriptor: sDescriptor,
    sentinels: sSentinels,
    moon: sMoon,
    resources: sResources,
    biome: sBiome,
    exotic: exoticBiomes.includes(sBiome),
    extreme: sResources.stellar.startsWith("Activated"),
    infested: sBiome.includes("Infested"),
  };

  if (warning && warning !== "") {
    return { warning, validPlanet: returnPlanet };
  }

  return {
    validPlanet: returnPlanet,
  };
}

function getBiomeNew(desc: string, agri: string, local: string): string {
  switch (desc) {
    case "Abandoned":
    case "Desolate":
      if (agri === "None") {
        return "Dead";
      } else if (agri === "Cactus Flesh") {
        return "Barren";
      } else {
        throw new ValidationError(
          `Descriptor "${desc}" cannot have agricultural resource "${agri}"`,
          400,
        );
      }
    case "Corrupted":
      if (agri === "None") {
        return "Glitch";
      } else if (agri === "Solanium") {
        return "Infested Scorched";
      } else {
        throw new ValidationError(
          `Descriptor "${desc}" cannot have agricultural resource "${agri}"`,
          400,
        );
      }

    case "Infested":
      if (infestedAgriculturalResourceMap[agri]) {
        return infestedAgriculturalResourceMap[agri];
      } else {
        throw new ValidationError(
          `Descriptor "${desc}" cannot have agricultural resource "${agri}"`,
          400,
        );
      }

    case "Tropical":
      if (agri === "None") {
        return "Marsh";
      } else if (agri === "Star Bulb") {
        if (local === "Faecium" || local === "Mordite") {
          return "Marsh";
        } else {
          return "Lush / Marsh";
        }
      } else {
        throw new ValidationError(
          `Descriptor "${desc}" cannot have agricultural resource "${agri}"`,
          400,
        );
      }

    default:
      return biomeDescriptorMap[desc];
  }
}

function getBiomeEdit(
  desc: string,
  agri: string,
  local: string,
  biome: string,
): { biome: string; note?: string } {
  switch (desc) {
    case "Abandoned":
    case "Desolate":
      if (agri === "None") {
        if (biome === "Dead") {
          return { biome };
        } else {
          return {
            biome: "Dead",
            note: `"${biome}" was invalid, overwritten to "Dead"`,
          };
        }
      } else if (agri === "Cactus Flesh") {
        if (biome == "Barren") {
          return { biome };
        } else {
          return {
            biome: "Dead",
            note: `"${biome}" was invalid, overwritten to "Barren"`,
          };
        }
      } else {
        throw new ValidationError(
          `Descriptor "${desc}" cannot have agricultural resource "${agri}"`,
          400,
        );
      }
    case "Corrupted":
      if (agri === "None") {
        if (biome === "Glitch") {
          return { biome };
        } else {
          return {
            biome: "Glitch",
            note: `"${biome}" was invalid, overwritten to "Glitch"`,
          };
        }
      } else if (agri === "Solanium") {
        if (biome === "Infested Scorched") {
          return { biome };
        } else {
          return {
            biome: "Infested Scorched",
            note: `"${biome}" was invalid, overwritten to "Infested Scorched"`,
          };
        }
      } else {
        throw new ValidationError(
          `Descriptor "${desc}" cannot have agricultural resource "${agri}"`,
          400,
        );
      }

    case "Infested":
      if (infestedAgriculturalResourceMap[agri] === biome) {
        return { biome };
      } else {
        throw new ValidationError(
          `Descriptor "${desc}" cannot have agricultural resource "${agri}"`,
          400,
        );
      }

    case "Tropical":
      if (agri === "None") {
        if (biome === "Marsh") {
          return { biome };
        } else {
          return {
            biome: "Marsh",
            note: `"${biome}" was invalid, overwritten to "Marsh"`,
          };
        }
      } else if (agri === "Star Bulb") {
        if (local === "Faecium" || local === "Mordite") {
          if (biome === "Marsh") {
            return { biome };
          } else {
            return {
              biome: "Marsh",
              note: `"${biome}" was invalid, overwritten to "Marsh"`,
            };
          }
        } else if (biome === "Lush" || biome === "Marsh") {
          return { biome };
        } else {
          throw new ValidationError(
            'A planet with "Star Bulb" must be a "Marsh" or "Lush Biome"',
            400,
          );
        }
      } else {
        throw new ValidationError(
          `Descriptor "${desc}" cannot have agricultural resource "${agri}"`,
          400,
        );
      }

    default:
      if (biome === biomeDescriptorMap[desc]) {
        return { biome };
      } else {
        return {
          biome: biomeDescriptorMap[desc],
          note: `"${biome}" was invalid, overwritten to "${biomeDescriptorMap[desc]}"`,
        };
      }
  }
}

function verifyResources(biome: string, agri: string, local: string) {
  if (biome in biomeAgriculturalResourceMap) {
    if (agri !== biomeAgriculturalResourceMap[biome]) {
      throw new ValidationError(
        `Biome "${biome}" cannot have agricultural resource "${agri}"`,
        400,
      );
    }
  } else if (biome === "Lush / Marsh") {
    if (agri !== "Star Bulb") {
      throw new ValidationError(
        `Biome "${biome}" cannot have agricultural resource "${agri}"`,
        400,
      );
    }
  } else if (biome === "Lush") {
    if (agri !== "Star Bulb") {
      throw new ValidationError(
        `Biome "${biome}" cannot have agricultural resource "${agri}"`,
        400,
      );
    }
  } else if (biome === "Marsh") {
    if (agri !== "Star Bulb" && agri !== "None") {
      throw new ValidationError(
        `Biome "${biome}" cannot have agricultural resource "${agri}"`,
        400,
      );
    }
  } else {
    if (agri !== "None") {
      throw new ValidationError(
        `Biome "${biome}" cannot have agricultural resource "${agri}"`,
        400,
      );
    }
  }

  if (local in resourceBiomeMap) {
    if (!resourceBiomeMap[local].includes(biome)) {
      throw new ValidationError(
        `"${local}" cannot be in the "${biome}" biome`,
        400,
      );
    }
  }
}
