import { WoodBlank, defaultWoodBlank } from "@/features/carving/domain/wood-blank";
import { DEFAULT_CARVE_BRUSH_CELL_RADIUS } from "@/features/carving/domain/carve-brush";
import {
  StartingShape,
  defaultStartingShape,
} from "@/features/carving/domain/starting-shape";
import { CarveMode, defaultCarveMode } from "@/features/carving/domain/carve-mode";

export type CarvingSettings = {
  width: number;
  height: number;
  depth: number;
  color: string;
  carveMode: CarveMode;
  startingShape: StartingShape;
  /** Voxel count along blank width (also drives sculpt mesh density). */
  resolutionAlongWidth: number;
  /** Brush radius slider (voxels: cell multiples; sculpt: relative world size). */
  brushCellRadius: number;
};

export const DEFAULT_RESOLUTION_ALONG_WIDTH = 24;

export const carvingSettingsLimits = {
  width: { min: 0.4, max: 2.4, step: 0.1 },
  height: { min: 0.3, max: 1.8, step: 0.1 },
  depth: { min: 0.3, max: 1.8, step: 0.1 },
  resolutionAlongWidth: { min: 12, max: 40, step: 1 },
  brushCellRadius: { min: 0.75, max: 5, step: 0.25 },
} as const;

export const defaultCarvingSettings: CarvingSettings = {
  width: defaultWoodBlank.width,
  height: defaultWoodBlank.height,
  depth: defaultWoodBlank.depth,
  color: defaultWoodBlank.color,
  carveMode: defaultCarveMode,
  startingShape: defaultStartingShape,
  resolutionAlongWidth: DEFAULT_RESOLUTION_ALONG_WIDTH,
  brushCellRadius: DEFAULT_CARVE_BRUSH_CELL_RADIUS,
};

export const carvingSettingsToBlank = (settings: CarvingSettings): WoodBlank => {
  return {
    width: settings.width,
    height: settings.height,
    depth: settings.depth,
    color: settings.color,
    roughness: defaultWoodBlank.roughness,
    metalness: defaultWoodBlank.metalness,
  };
};
