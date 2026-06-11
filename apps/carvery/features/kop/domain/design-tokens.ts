export type ColorToken = {
  name: string;
  hex: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
};

export const pastelColors: ColorToken[] = [
  { name: "blush", hex: "#f9c6c9", bgClass: "bg-blush", textClass: "text-blush", borderClass: "border-blush" },
  { name: "lavender", hex: "#d9c6f9", bgClass: "bg-lavender", textClass: "text-lavender", borderClass: "border-lavender" },
  { name: "sky", hex: "#c6e3f9", bgClass: "bg-sky", textClass: "text-sky", borderClass: "border-sky" },
  { name: "mint", hex: "#c6f9e3", bgClass: "bg-mint", textClass: "text-mint", borderClass: "border-mint" },
  { name: "lemon", hex: "#f9f3c6", bgClass: "bg-lemon", textClass: "text-lemon", borderClass: "border-lemon" },
  { name: "peach", hex: "#f9dcc6", bgClass: "bg-peach", textClass: "text-peach", borderClass: "border-peach" },
];

export const semanticColors: ColorToken[] = [
  { name: "background", hex: "#fdf6f0", bgClass: "bg-background", textClass: "text-background", borderClass: "border-background" },
  { name: "surface", hex: "#ffffff", bgClass: "bg-surface", textClass: "text-surface", borderClass: "border-surface" },
  { name: "muted", hex: "#f0e8e0", bgClass: "bg-muted", textClass: "text-muted", borderClass: "border-muted" },
  { name: "border", hex: "#e8d8cc", bgClass: "bg-border", textClass: "text-border", borderClass: "border-border" },
  { name: "foreground", hex: "#3d2c24", bgClass: "bg-foreground", textClass: "text-foreground", borderClass: "border-foreground" },
  { name: "subtle", hex: "#9c8478", bgClass: "bg-subtle", textClass: "text-subtle", borderClass: "border-subtle" },
  { name: "accent", hex: "#f9c6c9", bgClass: "bg-accent", textClass: "text-accent", borderClass: "border-accent" },
  { name: "accent-fg", hex: "#7a2d35", bgClass: "bg-accent-fg", textClass: "text-accent-fg", borderClass: "border-accent-fg" },
  { name: "primary", hex: "#3d2c24", bgClass: "bg-primary", textClass: "text-primary", borderClass: "border-primary" },
  { name: "primary-fg", hex: "#ffffff", bgClass: "bg-primary-fg", textClass: "text-primary-fg", borderClass: "border-primary-fg" },
];

export const semanticColorsDark: ColorToken[] = [
  { name: "background", hex: "#1a1412", bgClass: "bg-background", textClass: "text-background", borderClass: "border-background" },
  { name: "surface", hex: "#262019", bgClass: "bg-surface", textClass: "text-surface", borderClass: "border-surface" },
  { name: "muted", hex: "#332a22", bgClass: "bg-muted", textClass: "text-muted", borderClass: "border-muted" },
  { name: "border", hex: "#4a3d34", bgClass: "bg-border", textClass: "text-border", borderClass: "border-border" },
  { name: "foreground", hex: "#f5ebe4", bgClass: "bg-foreground", textClass: "text-foreground", borderClass: "border-foreground" },
  { name: "subtle", hex: "#b8a69a", bgClass: "bg-subtle", textClass: "text-subtle", borderClass: "border-subtle" },
  { name: "accent", hex: "#8f4a52", bgClass: "bg-accent", textClass: "text-accent", borderClass: "border-accent" },
  { name: "accent-fg", hex: "#ffd4d8", bgClass: "bg-accent-fg", textClass: "text-accent-fg", borderClass: "border-accent-fg" },
  { name: "primary", hex: "#f5ebe4", bgClass: "bg-primary", textClass: "text-primary", borderClass: "border-primary" },
  { name: "primary-fg", hex: "#1a1412", bgClass: "bg-primary-fg", textClass: "text-primary-fg", borderClass: "border-primary-fg" },
];

export type TypographyToken = {
  name: string;
  className: string;
  usage: string;
};

export const typographyScale: TypographyToken[] = [
  { name: "Display", className: "text-4xl font-bold text-foreground", usage: "Page hero / welcome" },
  { name: "Heading 1", className: "text-3xl font-bold text-foreground", usage: "Section titles" },
  { name: "Heading 2", className: "text-2xl font-semibold text-foreground", usage: "Subsections" },
  { name: "Heading 3", className: "font-semibold text-foreground", usage: "Cards, forms" },
  { name: "Body", className: "text-foreground leading-7", usage: "Paragraph copy" },
  { name: "Body large", className: "text-subtle text-lg", usage: "Intro paragraphs" },
  { name: "Caption", className: "text-sm text-subtle", usage: "Hints, metadata" },
  { name: "Label", className: "text-sm text-subtle", usage: "Form labels" },
  { name: "Micro", className: "text-xs font-medium text-foreground", usage: "Badges, pills" },
];
