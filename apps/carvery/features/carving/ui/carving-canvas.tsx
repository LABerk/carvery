"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { WoodBlock } from "@/features/carving/ui/wood-block";

export const CarvingCanvas = () => {
  return (
    <Canvas camera={{ position: [2.5, 2, 2.5], fov: 45 }} className="h-full w-full">
      <color attach="background" args={["#1a1412"]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 8, 3]} intensity={1.15} />
      <directionalLight position={[-3, 2, -4]} intensity={0.35} />
      <WoodBlock />
      <OrbitControls makeDefault enableDamping dampingFactor={0.08} />
    </Canvas>
  );
};
