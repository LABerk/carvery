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
import { Badge } from "@/features/kop/ui/badge";
import { Button } from "@/features/kop/ui/button";
import { ClassNameChip } from "@/features/kop/ui/class-name-chip";
import { ColorTokenGrid } from "@/features/kop/ui/color-token-grid";
import { EmptyState } from "@/features/kop/ui/empty-state";
import { FormPanel } from "@/features/kop/ui/form-panel";
import { LinkButton } from "@/features/kop/ui/link-button";
import { ListRow } from "@/features/kop/ui/list-row";
import { PastelCard } from "@/features/kop/ui/pastel-card";
import { Select } from "@/features/kop/ui/select";
import { TextArea } from "@/features/kop/ui/text-area";
import { TextField } from "@/features/kop/ui/text-field";

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
        <p className="text-sm text-subtle mb-5">
          Live KOP primitives used across Projects, Notes, and pages.
        </p>

        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-foreground mb-3">Buttons</h3>
            <div className="flex flex-wrap gap-3 items-center">
              <Button type="button" variant="accent" size="medium">
                Accent
              </Button>
              <Button type="button" variant="primary" size="medium">
                Primary
              </Button>
              <Button type="button" variant="secondary" size="medium">
                Secondary
              </Button>
              <Button type="button" variant="danger" size="small">
                Danger
              </Button>
              <LinkButton href="/projects" variant="secondary" size="small">
                Link button
              </LinkButton>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Feature card</h3>
            <PastelCard tone="sky" className="p-6 max-w-sm">
              <div className="text-2xl mb-2">🖼️</div>
              <h4 className="font-semibold text-foreground mb-1">Gallery</h4>
              <p className="text-sm text-subtle">Browse finished carvings from the community.</p>
            </PastelCard>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">List row with badge</h3>
            <div className="max-w-md">
              <ListRow
                tone="peach"
                title="Woodland Fox"
                subtitle="Basswood"
                trailing={<Badge>In Progress</Badge>}
              />
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Form panel</h3>
            <FormPanel
              className="max-w-md"
              title="Add Note"
              description="Example form built from KOP fields."
            >
              <TextField label="Title" defaultValue="Example title" readOnly />
              <TextArea label="Content" defaultValue="A short note about the carve." rows={2} readOnly />
              <Select label="Status" options={["Planned", "In Progress", "Complete"]} defaultValue="Planned" disabled />
              <Button type="button" variant="primary" size="medium">
                Save note
              </Button>
            </FormPanel>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Empty state</h3>
            <EmptyState className="max-w-md">No items yet. Create one to see it here.</EmptyState>
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
