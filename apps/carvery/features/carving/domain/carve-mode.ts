export const carveModeOptions = [
  { value: "voxels", label: "Voxels" },
  { value: "sculpt", label: "Sculpt" },
] as const;

export type CarveMode = (typeof carveModeOptions)[number]["value"];

export const defaultCarveMode: CarveMode = "sculpt";
