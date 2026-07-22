"use client";

import { WoodBlank, defaultWoodBlank } from "@/features/carving/domain/wood-blank";

type WoodBlockProps = {
  blank?: WoodBlank;
};

export const WoodBlock = ({ blank = defaultWoodBlank }: WoodBlockProps) => {
  return (
    <mesh>
      <boxGeometry args={[blank.width, blank.height, blank.depth]} />
      <meshStandardMaterial
        color={blank.color}
        roughness={blank.roughness}
        metalness={blank.metalness}
      />
    </mesh>
  );
};
