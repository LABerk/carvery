"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { MOUSE, TOUCH } from "three";
import { CarvingSettings, carvingSettingsToBlank } from "@/features/carving/domain/carving-settings";
import { WoodBlock } from "@/features/carving/ui/wood-block";

type CarvingCanvasProps = {
  settings: CarvingSettings;
};

export const CarvingCanvas = ({ settings }: CarvingCanvasProps) => {
  const blank = carvingSettingsToBlank(settings);

  return (
    <Canvas camera={{ position: [2.5, 2, 2.5], fov: 45 }} className="h-full w-full">
      <color attach="background" args={["#1a1412"]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 8, 3]} intensity={1.15} />
      <directionalLight position={[-3, 2, -4]} intensity={0.35} />
      <WoodBlock
        blank={blank}
        resolutionAlongWidth={settings.resolutionAlongWidth}
        brushCellRadius={settings.brushCellRadius}
        startingShape={settings.startingShape}
      />
      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.08}
        mouseButtons={{
          LEFT: -1 as MOUSE,
          MIDDLE: MOUSE.DOLLY,
          RIGHT: MOUSE.ROTATE,
        }}
        touches={{
          ONE: TOUCH.ROTATE,
          TWO: TOUCH.DOLLY_ROTATE,
        }}
      />
    </Canvas>
  );
};
