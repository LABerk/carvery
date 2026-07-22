export const startingShapeOptions = [
  { value: "box", label: "Box" },
  { value: "sphere", label: "Sphere" },
  { value: "cylinder", label: "Cylinder" },
  { value: "cone", label: "Cone" },
] as const;

export type StartingShape = (typeof startingShapeOptions)[number]["value"];

export const defaultStartingShape: StartingShape = "box";
