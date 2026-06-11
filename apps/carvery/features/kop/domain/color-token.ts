import type { ColorToken } from "@/features/kop/domain/design-tokens";
import type { CustomColor } from "@/features/kop/domain/custom-color.model";

export const RESERVED_COLOR_NAMES = new Set([
  "blush",
  "lavender",
  "sky",
  "mint",
  "lemon",
  "peach",
  "background",
  "surface",
  "muted",
  "border",
  "foreground",
  "subtle",
  "accent",
  "accent-fg",
]);

export const normalizeColorName = (raw: string): string =>
  raw
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

export const normalizeHex = (raw: string): string | null => {
  const value = raw.trim();
  const match = value.match(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/);
  if (!match) return null;

  const hex = match[1];
  if (hex.length === 3) {
    return `#${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`.toLowerCase();
  }

  return `#${hex.toLowerCase()}`;
};

export const toColorToken = (color: CustomColor): ColorToken => ({
  name: color.name,
  hex: color.hex,
  bgClass: `bg-${color.name}`,
  textClass: `text-${color.name}`,
  borderClass: `border-${color.name}`,
});

export const validateCustomColor = (
  name: string,
  hex: string,
  existingNames: string[],
): string | null => {
  const normalizedName = normalizeColorName(name);
  const normalizedHex = normalizeHex(hex);

  if (!normalizedName) return "Enter a name using letters, numbers, or hyphens.";
  if (!normalizedHex) return "Enter a valid hex color (e.g. #f9c6c9).";
  if (RESERVED_COLOR_NAMES.has(normalizedName)) return `"${normalizedName}" is already used by the built-in palette.`;
  if (existingNames.includes(normalizedName)) return `"${normalizedName}" already exists.`;

  return null;
};
