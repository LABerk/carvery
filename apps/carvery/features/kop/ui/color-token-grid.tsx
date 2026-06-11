import type { ColorToken } from "@/features/kop/domain/design-tokens";
import { ClassNameChip } from "@/features/kop/ui/class-name-chip";

interface ColorTokenGridProps {
  title: string;
  description: string;
  colors: ColorToken[];
  emptyMessage?: string;
}

export const ColorTokenGrid = ({
  title,
  description,
  colors,
  emptyMessage,
}: ColorTokenGridProps) => (
  <section className="mb-12">
    <h2 className="text-2xl font-semibold text-foreground mb-1">{title}</h2>
    <p className="text-sm text-subtle mb-5">{description}</p>
    {colors.length === 0 && emptyMessage ? (
      <p className="text-sm text-subtle rounded-2xl border border-dashed border-border bg-surface px-5 py-6">
        {emptyMessage}
      </p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {colors.map((color) => (
          <div
            key={color.name}
            className="rounded-2xl border border-border bg-surface overflow-hidden"
          >
            <div
              className="h-20 border-b border-border"
              style={{ backgroundColor: color.hex }}
              aria-label={`${color.name} swatch`}
            />
            <div className="p-4 space-y-2">
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-semibold text-foreground">{color.name}</span>
                <span className="font-mono text-xs text-subtle">{color.hex}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <ClassNameChip value={color.bgClass} />
                <ClassNameChip value={color.textClass} />
                <ClassNameChip value={color.borderClass} />
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </section>
);
