"use client";

import { ComponentProps, useState } from "react";
import { useRouter } from "next/navigation";
import type { CustomColor } from "@/features/kop/domain/custom-color.model";
import { normalizeColorName } from "@/features/kop/domain/color-token";
import { Button } from "@/features/kop/ui/button";
import { ClassNameChip } from "@/features/kop/ui/class-name-chip";
import { TextField } from "@/features/kop/ui/text-field";

interface AddCustomColorPanelProps {
  initialColors: CustomColor[];
  isEditable: boolean;
}

export const AddCustomColorPanel = ({ initialColors, isEditable }: AddCustomColorPanelProps) => {
  const router = useRouter();
  const [colors, setColors] = useState(initialColors);
  const [syncedInitialColors, setSyncedInitialColors] = useState(initialColors);
  const [name, setName] = useState("");
  const [hex, setHex] = useState("#c6e3f9");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [removingName, setRemovingName] = useState<string | null>(null);

  if (initialColors !== syncedInitialColors) {
    setSyncedInitialColors(initialColors);
    setColors(initialColors);
  }

  const previewName = normalizeColorName(name) || "preview";

  const onSubmit: ComponentProps<"form">["onSubmit"] = async (event) => {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setIsSaving(true);

    try {
      const response = await fetch("/api/kop/colors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, hex }),
      });

      const payload = (await response.json()) as CustomColor | { error: string };

      if (!response.ok) {
        throw new Error("error" in payload ? payload.error : "Could not save color.");
      }

      const saved = payload as CustomColor;
      setColors((current) =>
        [...current.filter((color) => color.name !== saved.name), saved].sort((a, b) =>
          a.name.localeCompare(b.name),
        ),
      );
      setName("");
      setMessage(
        `Added ${saved.name}. Tailwind classes (bg-${saved.name}, etc.) are written to the project — refresh if they do not appear immediately.`,
      );
      router.refresh();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  const onRemove = async (colorName: string): Promise<void> => {
    setError(null);
    setMessage(null);
    setRemovingName(colorName);

    try {
      const response = await fetch(`/api/kop/colors/${encodeURIComponent(colorName)}`, {
        method: "DELETE",
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "Could not remove color.");
      }

      setColors((current) => current.filter((color) => color.name !== colorName));
      setMessage(`Removed ${colorName} from the project theme.`);
      router.refresh();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setRemovingName(null);
    }
  };

  return (
    <section className="mb-12 rounded-2xl border border-border bg-surface p-6">
      <h2 className="text-2xl font-semibold text-foreground mb-1">Add project colors</h2>
      <p className="text-sm text-subtle mb-5">
        Saves to{" "}
        <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
          features/kop/domain/custom-colors.json
        </code>{" "}
        and regenerates{" "}
        <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
          app/custom-colors.theme.css
        </code>
        . Use names like <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">bg-sage</code> in Tailwind across the app.
      </p>

      {!isEditable ? (
        <p className="text-sm text-subtle rounded-xl bg-muted px-4 py-3">
          Color editing is disabled outside development. Built-in and saved custom colors still appear below.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <TextField
                label="Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g. sage or rose-gold"
                disabled={isSaving}
                required
                hint={name.trim() ? `Tailwind token: bg-${previewName}` : undefined}
              />
            </div>

            <label className="block sm:w-40">
              <span className="text-sm text-subtle">Hex</span>
              <div className="mt-1 flex gap-2">
                <input
                  type="color"
                  value={hex}
                  onChange={(event) => setHex(event.target.value)}
                  className="h-10 w-12 rounded-lg border border-border bg-surface cursor-pointer"
                  disabled={isSaving}
                  aria-label="Pick color"
                />
                <input
                  className="flex-1 rounded-xl border border-border bg-surface px-3 py-2 text-sm font-mono text-foreground"
                  value={hex}
                  onChange={(event) => setHex(event.target.value)}
                  placeholder="#c6e3f9"
                  disabled={isSaving}
                  required
                />
              </div>
            </label>
          </div>

          <div
            className="rounded-2xl border border-border px-5 py-4 flex items-center justify-between gap-4"
            style={{ backgroundColor: hex }}
          >
            <span className="text-sm font-medium text-foreground/80">Preview</span>
            <span className="font-mono text-xs text-foreground/80">{hex}</span>
          </div>

          {error ? <p className="text-sm text-red-700">{error}</p> : null}
          {message ? <p className="text-sm text-foreground">{message}</p> : null}

          <Button type="submit" variant="primary" size="medium" isLoading={isSaving}>
            Add to project
          </Button>
        </form>
      )}

      {colors.length > 0 ? (
        <div className="mt-6 pt-6 border-t border-border">
          <h3 className="font-semibold text-foreground mb-3">Saved custom colors</h3>
          <ul className="space-y-2">
            {colors.map((color) => (
              <li
                key={color.name}
                className="flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className="h-10 w-10 shrink-0 rounded-lg border border-border"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground">{color.name}</p>
                    <p className="font-mono text-xs text-subtle">{color.hex}</p>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      <ClassNameChip value={`bg-${color.name}`} />
                      <ClassNameChip value={`text-${color.name}`} />
                    </div>
                  </div>
                </div>
                {isEditable ? (
                  <Button
                    type="button"
                    variant="secondary"
                    size="small"
                    onClick={() => onRemove(color.name)}
                    isLoading={removingName === color.name}
                  >
                    Remove
                  </Button>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
};
