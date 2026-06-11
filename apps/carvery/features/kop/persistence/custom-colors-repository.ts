import { promises as fs } from "fs";
import path from "path";
import type { CustomColor } from "@/features/kop/domain/custom-color.model";
import {
  normalizeColorName,
  normalizeHex,
  validateCustomColor,
} from "@/features/kop/domain/color-token";

const CUSTOM_COLORS_JSON = path.join(
  process.cwd(),
  "features/kop/domain/custom-colors.json",
);
const CUSTOM_COLORS_CSS = path.join(process.cwd(), "app/custom-colors.theme.css");

const isDevEnvironment = (): boolean => process.env.NODE_ENV === "development";

export const readCustomColors = async (): Promise<CustomColor[]> => {
  const raw = await fs.readFile(CUSTOM_COLORS_JSON, "utf8");
  return JSON.parse(raw) as CustomColor[];
};

const writeCustomColors = async (colors: CustomColor[]): Promise<void> => {
  await fs.writeFile(CUSTOM_COLORS_JSON, `${JSON.stringify(colors, null, 2)}\n`, "utf8");
};

const writeCustomColorsTheme = async (colors: CustomColor[]): Promise<void> => {
  const lines = colors.map(
    (color) => `  --color-${color.name}: ${color.hex};`,
  );

  const contents = [
    "/* Custom colors — generated from the KOP page. Do not edit by hand. */",
    "@theme {",
    ...lines,
    "}",
    "",
  ].join("\n");

  await fs.writeFile(CUSTOM_COLORS_CSS, contents, "utf8");
};

export const addCustomColor = async (
  name: string,
  hex: string,
): Promise<CustomColor> => {
  if (!isDevEnvironment()) {
    throw new Error("Adding colors is only available in development.");
  }

  const normalizedName = normalizeColorName(name);
  const normalizedHex = normalizeHex(hex);
  const colors = await readCustomColors();
  const validationError = validateCustomColor(
    normalizedName,
    normalizedHex ?? "",
    colors.map((color) => color.name),
  );

  if (validationError || !normalizedHex) {
    throw new Error(validationError ?? "Invalid color.");
  }

  const next: CustomColor = { name: normalizedName, hex: normalizedHex };
  const updated = [...colors, next].sort((a, b) => a.name.localeCompare(b.name));

  await writeCustomColors(updated);
  await writeCustomColorsTheme(updated);

  return next;
};

export const removeCustomColor = async (name: string): Promise<void> => {
  if (!isDevEnvironment()) {
    throw new Error("Removing colors is only available in development.");
  }

  const normalizedName = normalizeColorName(name);
  const colors = await readCustomColors();
  const updated = colors.filter((color) => color.name !== normalizedName);

  if (updated.length === colors.length) {
    throw new Error(`Color "${normalizedName}" was not found.`);
  }

  await writeCustomColors(updated);
  await writeCustomColorsTheme(updated);
};
