import type { CustomColor } from "@/features/kop/domain/custom-color.model";
import { toColorToken } from "@/features/kop/domain/color-token";
import {
  pastelColors,
  semanticColors,
  semanticColorsDark,
  typographyScale,
} from "@/features/kop/domain/design-tokens";
import { ThemeToggle } from "@/features/theme/ui/theme-toggle";
import { AddCustomColorPanel } from "@/features/kop/ui/add-custom-color-panel";
import { ColorTokenGrid } from "@/features/kop/ui/color-token-grid";
import { ClassNameChip } from "@/features/kop/ui/class-name-chip";

interface KopShowcaseProps {
  customColors: CustomColor[];
  isEditable: boolean;
}

export const KopShowcase = ({ customColors, isEditable }: KopShowcaseProps) => {
  const customColorTokens = customColors.map(toColorToken);

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-foreground mb-2">Kit of Parts</h1>
      <p className="text-subtle mb-10">
        Design tokens and UI building blocks for Carvery. Click any class name to copy it for Tailwind.
        Built-in tokens live in{" "}
        <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">app/globals.css</code>.
      </p>

      <AddCustomColorPanel initialColors={customColors} isEditable={isEditable} />

      <ColorTokenGrid
        title="Custom palette"
        description="Project-specific colors you add below. Committed to the repo for use everywhere."
        colors={customColorTokens}
        emptyMessage="No custom colors yet. Add one above to generate Tailwind classes like bg-sage."
      />

      <ColorTokenGrid
        title="Pastel palette"
        description="Accent backgrounds for cards and feature blocks."
        colors={pastelColors}
      />

      <section className="mb-12 rounded-2xl border border-border bg-surface p-6">
        <h2 className="text-2xl font-semibold text-foreground mb-1">Light & dark mode</h2>
        <p className="text-sm text-subtle mb-4">
          Semantic tokens swap when <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">.dark</code> is on{" "}
          <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">html</code>. Pastels stay the same in both themes.
          Preference is saved in local storage.
        </p>
        <ThemeToggle />
      </section>

      <ColorTokenGrid
        title="Semantic tokens (light)"
        description="Default layout, text, borders, and interactive states."
        colors={semanticColors}
      />

      <ColorTokenGrid
        title="Semantic tokens (dark)"
        description="Values applied when dark mode is active."
        colors={semanticColorsDark}
      />

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-1">Typography</h2>
        <p className="text-sm text-subtle mb-5">Common text styles used across pages.</p>
        <div className="flex flex-col gap-4">
          {typographyScale.map((token) => (
            <div
              key={token.name}
              className="rounded-2xl border border-border bg-surface px-5 py-4"
            >
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-medium text-subtle uppercase tracking-wide">
                  {token.name}
                </span>
                <ClassNameChip value={token.className} />
              </div>
              <p className={token.className}>The quick brown fox jumps over the lazy dog.</p>
              <p className="text-xs text-subtle mt-2">{token.usage}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-1">Spacing & shape</h2>
        <p className="text-sm text-subtle mb-5">Shared radii and padding patterns.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-border bg-surface p-5">
            <p className="font-semibold text-foreground mb-2">Cards</p>
            <ClassNameChip value="rounded-2xl" />
            <p className="text-sm text-subtle mt-3">Feature cards, list items, form panels.</p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <p className="font-semibold text-foreground mb-2">Controls</p>
            <ClassNameChip value="rounded-xl" />
            <p className="text-sm text-subtle mt-3">Inputs, primary actions, compact buttons.</p>
          </div>
          <div className="rounded-lg border border-border bg-surface p-5">
            <p className="font-semibold text-foreground mb-2">Nav items</p>
            <ClassNameChip value="rounded-lg" />
            <p className="text-sm text-subtle mt-3">Sidebar links and small interactive targets.</p>
          </div>
          <div className="rounded-full border border-border bg-surface p-5">
            <p className="font-semibold text-foreground mb-2">Pills</p>
            <ClassNameChip value="rounded-full" />
            <p className="text-sm text-subtle mt-3">Status badges and tags.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-1">Components</h2>
        <p className="text-sm text-subtle mb-5">Composed patterns from existing pages.</p>

        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-foreground mb-3">Buttons</h3>
            <div className="flex flex-wrap gap-3 items-center">
              <button
                type="button"
                className="rounded-lg bg-accent text-accent-fg text-sm font-medium px-4 py-2 hover:opacity-90 transition-opacity"
              >
                Accent
              </button>
              <button
                type="button"
                className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-fg"
              >
                Primary
              </button>
              <button
                type="button"
                className="rounded-xl border border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground"
              >
                Secondary
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              <ClassNameChip value="rounded-lg bg-accent text-accent-fg text-sm font-medium px-4 py-2 hover:opacity-90" />
              <ClassNameChip value="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-fg" />
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Feature card</h3>
            <div className="rounded-2xl bg-sky p-6 max-w-sm">
              <div className="text-2xl mb-2">🖼️</div>
              <h4 className="font-semibold text-foreground mb-1">Gallery</h4>
              <p className="text-sm text-subtle">Browse finished carvings from the community.</p>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              <ClassNameChip value="rounded-2xl bg-sky p-6" />
              <ClassNameChip value="font-semibold text-foreground" />
              <ClassNameChip value="text-sm text-subtle" />
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">List card with badge</h3>
            <div className="rounded-2xl bg-peach px-6 py-5 flex items-center justify-between max-w-md">
              <div>
                <h4 className="font-semibold text-foreground">Woodland Fox</h4>
                <p className="text-sm text-subtle mt-0.5">Basswood</p>
              </div>
              <span className="text-xs font-medium bg-surface/60 text-foreground rounded-full px-3 py-1">
                In Progress
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              <ClassNameChip value="rounded-2xl bg-peach px-6 py-5" />
              <ClassNameChip value="text-xs font-medium bg-surface/60 text-foreground rounded-full px-3 py-1" />
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Form panel</h3>
            <div className="rounded-2xl border border-border bg-surface/80 p-4 max-w-md space-y-3">
              <h4 className="font-semibold text-foreground">Add Note</h4>
              <label className="block">
                <span className="text-sm text-subtle">Title</span>
                <input
                  readOnly
                  placeholder="Example title"
                  className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-foreground"
                />
              </label>
              <button
                type="button"
                className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-fg"
              >
                Save note
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              <ClassNameChip value="rounded-2xl border border-border bg-surface/80 p-4" />
              <ClassNameChip value="rounded-xl border border-border bg-surface px-3 py-2 text-sm text-foreground" />
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Navigation link</h3>
            <div className="flex flex-col gap-2 max-w-xs">
              <span className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium bg-accent text-accent-fg">
                <span>🎨</span>
                <span>Active tab</span>
              </span>
              <span className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-subtle">
                <span>🪵</span>
                <span>Inactive tab</span>
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              <ClassNameChip value="bg-accent text-accent-fg" />
              <ClassNameChip value="text-subtle hover:bg-muted hover:text-foreground" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
