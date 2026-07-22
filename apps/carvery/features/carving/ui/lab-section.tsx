"use client";

import { useState } from "react";
import { PageHeader } from "@/features/kop/ui/page-header";
import { Button } from "@/features/kop/ui/button";
import {
  CarvingSettings,
  defaultCarvingSettings,
} from "@/features/carving/domain/carving-settings";
import { CarvingViewer } from "@/features/carving/ui/carving-viewer";
import { LabCarvingControls } from "@/features/carving/ui/lab-carving-controls";

export const LabSection = () => {
  const [settings, setSettings] = useState<CarvingSettings>(defaultCarvingSettings);
  const [blankRevision, setBlankRevision] = useState(0);

  const resetLab = () => {
    setSettings(defaultCarvingSettings);
    setBlankRevision((value) => value + 1);
  };

  return (
    <div className="max-w-4xl">
      <PageHeader
        title="Lab"
        description="Left-drag to carve. Right-drag to orbit. Scroll to zoom. Changing shape, size, or resolution rebuilds the blank."
        actions={
          <Button type="button" variant="secondary" onClick={resetLab}>
            Reset lab
          </Button>
        }
      />
      <LabCarvingControls settings={settings} onChange={setSettings} />
      <CarvingViewer
        key={blankRevision}
        settings={settings}
      />
    </div>
  );
};
