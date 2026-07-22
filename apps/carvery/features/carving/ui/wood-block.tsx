"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { WoodBlank, defaultWoodBlank } from "@/features/carving/domain/wood-blank";
import { DEFAULT_CARVE_BRUSH_CELL_RADIUS } from "@/features/carving/domain/carve-brush";
import { DEFAULT_RESOLUTION_ALONG_WIDTH } from "@/features/carving/domain/carving-settings";
import {
  StartingShape,
  defaultStartingShape,
} from "@/features/carving/domain/starting-shape";
import {
  VoxelGrid,
  cellCenter,
  carveSphere,
  carveSphereAlongSegment,
  createVoxelGrid,
  findOccupiedPointAlongRay,
  voxelIndex,
} from "@/features/carving/domain/voxel-grid";

type WoodBlockProps = {
  blank?: WoodBlank;
  resolutionAlongWidth?: number;
  brushCellRadius?: number;
  startingShape?: StartingShape;
};

const dummy = new THREE.Object3D();
const carvePoint = new THREE.Vector3();

export const WoodBlock = ({
  blank = defaultWoodBlank,
  resolutionAlongWidth = DEFAULT_RESOLUTION_ALONG_WIDTH,
  brushCellRadius = DEFAULT_CARVE_BRUSH_CELL_RADIUS,
  startingShape = defaultStartingShape,
}: WoodBlockProps) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const gridRef = useRef<VoxelGrid | null>(null);
  const isCarvingRef = useRef(false);
  const lastCarvePointRef = useRef<THREE.Vector3 | null>(null);
  const brushCellRadiusRef = useRef(brushCellRadius);
  brushCellRadiusRef.current = brushCellRadius;

  const { camera, pointer, raycaster } = useThree();
  const { width, height, depth, color, roughness, metalness } = blank;

  const maxInstances = useMemo(() => {
    const grid = createVoxelGrid({
      blank: { ...defaultWoodBlank, width, height, depth },
      resolutionAlongWidth,
      startingShape: "box",
    });
    return grid.sizeX * grid.sizeY * grid.sizeZ;
  }, [width, height, depth, resolutionAlongWidth]);

  const syncInstances = useCallback((grid: VoxelGrid) => {
    const mesh = meshRef.current;
    if (!mesh) {
      return;
    }

    let instanceIndex = 0;
    for (let z = 0; z < grid.sizeZ; z += 1) {
      for (let y = 0; y < grid.sizeY; y += 1) {
        for (let x = 0; x < grid.sizeX; x += 1) {
          if (grid.occupied[voxelIndex(grid, x, y, z)] === 0) {
            continue;
          }
          const [cx, cy, cz] = cellCenter(grid, x, y, z);
          dummy.position.set(cx, cy, cz);
          // Slight overlap reduces visible seams between cubes.
          dummy.scale.setScalar(grid.cellSize * 1.02);
          dummy.updateMatrix();
          mesh.setMatrixAt(instanceIndex, dummy.matrix);
          instanceIndex += 1;
        }
      }
    }

    mesh.count = instanceIndex;
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, []);

  useLayoutEffect(() => {
    const grid = createVoxelGrid({
      blank: { ...defaultWoodBlank, width, height, depth },
      resolutionAlongWidth,
      startingShape,
    });
    gridRef.current = grid;
    lastCarvePointRef.current = null;
    syncInstances(grid);
  }, [width, height, depth, resolutionAlongWidth, startingShape, syncInstances]);

  useEffect(() => {
    const endCarve = () => {
      isCarvingRef.current = false;
      lastCarvePointRef.current = null;
    };
    window.addEventListener("pointerup", endCarve);
    return () => window.removeEventListener("pointerup", endCarve);
  }, []);

  const carveAlongStroke = useCallback(
    (point: THREE.Vector3) => {
      const grid = gridRef.current;
      if (!grid) {
        return;
      }

      const radius = grid.cellSize * brushCellRadiusRef.current;
      const lastPoint = lastCarvePointRef.current;
      const changed = lastPoint
        ? carveSphereAlongSegment(
            grid,
            lastPoint.x,
            lastPoint.y,
            lastPoint.z,
            point.x,
            point.y,
            point.z,
            radius,
          )
        : carveSphere(grid, point.x, point.y, point.z, radius);

      if (!lastPoint) {
        lastCarvePointRef.current = point.clone();
      } else {
        lastPoint.copy(point);
      }

      if (changed) {
        syncInstances(grid);
      }
    },
    [syncInstances],
  );

  useFrame(() => {
    if (!isCarvingRef.current) {
      return;
    }

    const mesh = meshRef.current;
    const grid = gridRef.current;
    if (!mesh || !grid) {
      return;
    }

    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObject(mesh, false);
    if (hits[0]) {
      carveAlongStroke(hits[0].point);
      return;
    }

    const { origin, direction } = raycaster.ray;
    const occupiedPoint = findOccupiedPointAlongRay(
      grid,
      origin.x,
      origin.y,
      origin.z,
      direction.x,
      direction.y,
      direction.z,
    );
    if (!occupiedPoint) {
      return;
    }

    carveAlongStroke(carvePoint.set(occupiedPoint[0], occupiedPoint[1], occupiedPoint[2]));
  });

  const onPointerDown = (event: ThreeEvent<PointerEvent>) => {
    if (event.button !== 0) {
      return;
    }
    event.stopPropagation();
    isCarvingRef.current = true;
    lastCarvePointRef.current = null;
    carveAlongStroke(event.point);
  };

  return (
    <instancedMesh
      key={`${startingShape}-${resolutionAlongWidth}-${width}-${height}-${depth}`}
      ref={meshRef}
      args={[undefined, undefined, maxInstances]}
      castShadow
      receiveShadow
      onPointerDown={onPointerDown}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
    </instancedMesh>
  );
};
