export type WoodBlank = {
  width: number;
  height: number;
  depth: number;
  color: string;
  roughness: number;
  metalness: number;
};

/** Default procedural blank for the lab viewer. */
export const defaultWoodBlank: WoodBlank = {
  width: 1.2,
  height: 0.8,
  depth: 0.6,
  color: "#c4a574",
  roughness: 0.85,
  metalness: 0.05,
};
