import { exoticBiomes } from "./lists";

/**
 * An object that maps unique biome descriptors to their more general biome type.
 */
export const biomeDescriptorMap: { [index: string]: string } = {
  "[REDACTED]": "Chromatic",
  Acidic: "Toxic",
  Acrid: "Toxic",
  Airless: "Dead",
  Arctic: "Frozen",
  Arid: "Scorched",
  "Ash-Shrouded": "Volcanic",
  Ashen: "Volcanic",
  Azure: "Chromatic",
  Barren: "Barren",
  Basalt: "Volcanic",
  Bladed: "Irri Shells",
  Bleak: "Barren",
  Blighted: "Toxic",
  Blood: "Chromatic",
  Boggy: "Marsh",
  Boiling: "Scorched",
  "Boiling Doom": "Infested Scorched",
  Bountiful: "Lush",
  Breached: "Beams",
  Bubbling: "Bubble",
  Cabled: "Contour",
  Calcified: "M Structure",
  Capped: "Hydro Garden",
  Caustic: "Toxic",
  "Caustic Nightmare": "Infested Toxic",
  Cerulean: "Chromatic",
  Charred: "Scorched",
  "Chromatic Fog": "Chromatic",
  Cloudy: "Marsh",
  Columned: "Shards",
  Contaminated: "Irradiated",
  Corrosive: "Toxic",
  Contoured: "Contour",
  Crimson: "Chromatic",
  Damp: "Marsh",
  Dead: "Dead",
  "Deathly Green Anomaly": "Chromatic",
  "Decaying Nuclear": "Irradiated",
  Desert: "Barren",
  Doomed: "Glitch",
  "Doomed Jade": "Chromatic",
  Dusty: "Barren",
  Empty: "Dead",
  "Endless Morass": "Marsh",
  Erased: "Glitch",
  Erupting: "Volcanic",
  Fiery: "Scorched",
  "Fiery Dreadworld": "Infested Scorched",
  Finned: "Irri Shells",
  Fissured: "Beams",
  "Flame-Ruptured": "Volcanic",
  Flourishing: "Lush",
  Foaming: "Bubble",
  Foggy: "Marsh",
  Forsaken: "Dead",
  Fractured: "Wire Cell",
  Fragmented: "Wire Cell",
  Freezing: "Frozen",
  Frostbound: "Frozen",
  Frothing: "Bubble",
  Frozen: "Frozen",
  "Frozen Anomaly": "Chromatic",
  "Frozen Hell": "Infested Frozen",
  Fungal: "Hydro Garden",
  "Gamma-Intensive": "Irradiated",
  Glacial: "Frozen",
  Glassy: "Glitch",
  Grassy: "Lush",
  "Harsh Blue Globe": "Chromatic",
  "Haunted Emeril": "Chromatic",
  Hazy: "Marsh",
  Hexagonal: "Hexagon",
  Hiemal: "Frozen",
  "High Energy": "Irradiated",
  "High Radio Source": "Irradiated",
  "High Temperature": "Scorched",
  Hot: "Scorched",
  Humid: "Lush",
  Hyperborean: "Frozen",
  Icebound: "Frozen",
  Icy: "Frozen",
  "Icy Abhorrence": "Infested Frozen",
  "Imminent Core Detonation": "Volcanic",
  Incandescent: "Scorched",
  Infected: "Glitch",
  "Infected Dustbowl": "Infested Barren",
  "Infested Paradise": "Infested Lush",
  Irradiated: "Irradiated",
  Isotopic: "Irradiated",
  Lava: "Volcanic",
  "Life-Incompatible": "Dead",
  Lifeless: "Dead",
  "Lost Blue": "Chromatic",
  "Lost Green": "Chromatic",
  "Lost Red": "Chromatic",
  "Low Atmosphere": "Dead",
  Magma: "Volcanic",
  Malfunctioning: "Glitch",
  Marshy: "Marsh",
  Mechanical: "Fract Cube",
  Metallic: "Fract Cube",
  Metallurgic: "Fract Cube",
  Miasmatic: "Toxic",
  Misty: "Marsh",
  Molten: "Volcanic",
  Murky: "Marsh",
  Mutated: "Infested Irradiated",
  Noxious: "Toxic",
  Nuclear: "Irradiated",
  "Obsidian Bead": "Volcanic",
  "of Light": "Beams",
  Ossified: "M Structure",
  Overgrown: "Lush",
  Paradise: "Lush",
  Parched: "Barren",
  Petrified: "M Structure",
  Pillared: "Shards",
  "Planetary Anomaly": "Chromatic",
  Plated: "Hexagon",
  Poisonous: "Toxic",
  Quagmire: "Marsh",
  Radioactive: "Irradiated",
  "Radioactive Abomination": "Infested Irradiated",
  Rainy: "Lush",
  Rattling: "Bone Spire",
  Reeking: "Marsh",
  Rocky: "Barren",
  Rotting: "Toxic",
  Scalding: "Scorched",
  Scaly: "Hexagon",
  Scarlet: "Chromatic",
  Scorched: "Scorched",
  Sharded: "Shards",
  Shattered: "Wire Cell",
  "Shell-Strewn": "Irri Shells",
  Skeletal: "Bone Spire",
  Spined: "Bone Spire",
  Sporal: "Hydro Garden",
  "Stellar Corruption Detected": "Chromatic",
  "Sub-zero": "Frozen",
  Supercritical: "Irradiated",
  Swamp: "Marsh",
  Tainted: "Infested Barren",
  Tectonic: "Volcanic",
  Temperate: "Lush",
  Temporary: "Glitch",
  "Terraforming Catastrophe": "Dead",
  Terrorsphere: "Infested Barren",
  "The Nest": "Infested Lush",
  Thirsty: "Glitch",
  Torrid: "Scorched",
  Toxic: "Toxic",
  "Toxic Anomaly": "Chromatic",
  "Toxic Horror": "Infested Toxic",
  Ultramarine: "Chromatic",
  Unstable: "Volcanic",
  Vapour: "Marsh",
  Verdant: "Lush",
  "Vermillion Globe": "Chromatic",
  "Vile Anomaly": "Chromatic",
  Violent: "Volcanic",
  Viridescent: "Lush",
  Volcanic: "Volcanic",
  Webbed: "Contour",
  "Wind-swept": "Barren",
  "Wine Dark": "Chromatic",
  "Worm-Ridden": "Infested Lush",
  "Xeno-Colony": "Infested Lush",
};

/**
 * Marsh can have either "None" or "Star Bulb"
 *    and thus needs to be checked separately
 *
 * Anything other biome must have "None" as their agricultural resource
 */
export const biomeAgriculturalResourceMap: { [index: string]: string } = {
  Barren: "Cactus Flesh",
  Frozen: "Frost Crystal",
  Irradiated: "Gamma Root",
  Lush: "Star Bulb",
  Scorched: "Solanium",
  Toxic: "Fungal Mould",
  "Infested Barren": "Cactus Flesh",
  "Infested Frozen": "Frost Crystal",
  "Infested Irradiated": "Gamma Root",
  "Infested Lush": "Star Bulb",
  "Infested Scorched": "Solanium",
  "Infested Toxic": "Fungal Mould",
};

/**
 * An object to speed up verifying if resource and infested biome match.
 */
export const infestedAgriculturalResourceMap: { [index: string]: string } = {
  "Cactus Flesh": "Infested Barren",
  "Frost Crystal": "Infested Frozen",
  "Fungal Mold": "Infested Toxic",
  "Gamma Root": "Infested Irradiated",
  Solanium: "Infested Scorched",
};

/**
 * An object that maps resources to the biomes they can be found in.
 *
 * Cobalt, Magnetized Ferrite, Salt, Silver, and Sodium can be found in any biome.
 */
export const resourceBiomeMap: { [index: string]: string[] } = {
  Ammonia: ["Toxic", "Chromatic"],
  Basalt: ["Volcanic"],
  Dioxite: ["Frozen", "Chromatic"],
  Faecium: ["Marsh"],
  Gold: [...exoticBiomes],
  Mordite: ["Marsh"],
  Paraffinium: ["Lush", "Marsh"],
  Phosphorus: ["Scorched", "Chromatic"],
  Pyrite: ["Barren", "Volcanic"],
  "Rusted Metal": ["Dead"],
  Uranium: ["Irradiated"],
};
