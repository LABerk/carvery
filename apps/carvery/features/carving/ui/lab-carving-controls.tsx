"use client";

import { Select } from "@/features/kop/ui/select";
import {
  CarvingSettings,
  carvingSettingsLimits,
} from "@/features/carving/domain/carving-settings";
import {
  StartingShape,
  startingShapeOptions,
} from "@/features/carving/domain/starting-shape";
import { CarveMode, carveModeOptions } from "@/features/carving/domain/carve-mode";

type LabCarvingControlsProps = {
  settings: CarvingSettings;
  onChange: (settings: CarvingSettings) => void;
};

type NumericSettingKey = Exclude<keyof CarvingSettings, "color" | "startingShape" | "carveMode">;

export const LabCarvingControls = ({ settings, onChange }: LabCarvingControlsProps) => {
  const isVoxelMode = settings.carveMode === "voxels";

  const numericFields: Array<{
    key: NumericSettingKey;
    label: string;
    hint: string;
  }> = [
    {
      key: "brushCellRadius",
      label: "Brush size",
      hint: isVoxelMode ? "Relative to voxel cell size" : "Relative to blank size",
    },
    {
      key: "resolutionAlongWidth",
      label: "Resolution",
      hint: isVoxelMode ? "Voxel density (rebuilds blank)" : "Mesh density (rebuilds blank)",
    },
    { key: "width", label: "Width", hint: "Blank width" },
    { key: "height", label: "Height", hint: "Blank height" },
    { key: "depth", label: "Depth", hint: "Blank depth" },
  ];

  const updateNumber = (key: NumericSettingKey, rawValue: string) => {
    const parsed = Number(rawValue);
    if (!Number.isFinite(parsed)) {
      return;
    }
    onChange({ ...settings, [key]: parsed });
  };

  return (
    <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Select
        id="lab-carve-mode"
        label="Carve mode"
        hint="Voxels remove cells; sculpt edits mesh vertices"
        options={carveModeOptions}
        value={settings.carveMode}
        onChange={(event) =>
          onChange({
            ...settings,
            carveMode: event.target.value as CarveMode,
          })
        }
      />

      {isVoxelMode ? (
        <Select
          id="lab-starting-shape"
          label="Starting shape"
          hint="Rebuilds the blank"
          options={startingShapeOptions}
          value={settings.startingShape}
          onChange={(event) =>
            onChange({
              ...settings,
              startingShape: event.target.value as StartingShape,
            })
          }
        />
      ) : (
        <p className="self-end text-sm text-subtle sm:col-span-1">
          Sculpt starts as a smooth ellipsoid (icosphere). Resolution raises triangle density.
        </p>
      )}

      {numericFields.map((field) => {
        const limits = carvingSettingsLimits[field.key];
        const value = settings[field.key];
        return (
          <label key={field.key} className="block" htmlFor={`lab-${field.key}`}>
            <span className="flex items-center justify-between gap-2 text-sm text-subtle">
              <span>{field.label}</span>
              <span className="tabular-nums text-foreground">{value}</span>
            </span>
            <input
              id={`lab-${field.key}`}
              type="range"
              min={limits.min}
              max={limits.max}
              step={limits.step}
              value={value}
              onChange={(event) => updateNumber(field.key, event.target.value)}
              className="mt-2 w-full accent-primary"
            />
            <p className="mt-1 text-xs text-subtle">{field.hint}</p>
          </label>
        );
      })}

      <label className="block" htmlFor="lab-color">
        <span className="text-sm text-subtle">Wood color</span>
        <input
          id="lab-color"
          type="color"
          value={settings.color}
          onChange={(event) => onChange({ ...settings, color: event.target.value })}
          className="mt-2 h-10 w-full cursor-pointer rounded-xl border border-border bg-surface"
        />
        <p className="mt-1 text-xs text-subtle">Surface color for the blank</p>
      </label>
    </div>
  );
};
