"use client";

import dynamic from "next/dynamic";
import { cn } from "@/aspects/utils/cn";

const CarvingCanvas = dynamic(
  () => import("@/features/carving/ui/carving-canvas").then((module) => module.CarvingCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-muted text-sm text-subtle">
        Loading scene…
      </div>
    ),
  },
);

type CarvingViewerProps = {
  className?: string;
};

export const CarvingViewer = ({ className }: CarvingViewerProps) => {
  return (
    <div
      className={cn(
        "h-[min(70vh,32rem)] w-full overflow-hidden rounded-lg border border-border",
        className,
      )}
    >
      <CarvingCanvas />
    </div>
  );
};
