"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { WoodBlank, defaultWoodBlank } from "@/features/carving/domain/wood-blank";
import { DEFAULT_CARVE_BRUSH_CELL_RADIUS } from "@/features/carving/domain/carve-brush";
import { DEFAULT_RESOLUTION_ALONG_WIDTH } from "@/features/carving/domain/carving-settings";
import {
  DEFAULT_SCULPT_STRENGTH,
  displaceVerticesInward,
  displaceVerticesInwardAlongSegment,
  resolutionToIcosahedronDetail,
  sculptBrushWorldRadius,
} from "@/features/carving/domain/sculpt-displace";

type SculptBlankProps = {
  blank?: WoodBlank;
  resolutionAlongWidth?: number;
  brushCellRadius?: number;
};

/**
 * Learning-focused sculpt blank:
 * raycast hit → edit position attribute → needsUpdate → computeVertexNormals().
 */
export const SculptBlank = ({
  blank = defaultWoodBlank,
  resolutionAlongWidth = DEFAULT_RESOLUTION_ALONG_WIDTH,
  brushCellRadius = DEFAULT_CARVE_BRUSH_CELL_RADIUS,
}: SculptBlankProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const isCarvingRef = useRef(false);
  const lastHitPointRef = useRef<THREE.Vector3 | null>(null);
  const localPointRef = useRef(new THREE.Vector3());
  const localNormalRef = useRef(new THREE.Vector3());
  const brushCellRadiusRef = useRef(brushCellRadius);
  brushCellRadiusRef.current = brushCellRadius;

  const { camera, pointer, raycaster } = useThree();
  const { width, height, depth, color, roughness, metalness } = blank;
  const detail = resolutionToIcosahedronDetail(resolutionAlongWidth);

  useLayoutEffect(() => {
    lastHitPointRef.current = null;
  }, [width, height, depth, detail]);

  useEffect(() => {
    const endCarve = () => {
      isCarvingRef.current = false;
      lastHitPointRef.current = null;
    };
    window.addEventListener("pointerup", endCarve);
    return () => window.removeEventListener("pointerup", endCarve);
  }, []);

  const applySculptAtLocalHit = useCallback(
    (localPoint: THREE.Vector3, localNormal: THREE.Vector3) => {
      const mesh = meshRef.current;
      if (!mesh) {
        return;
      }

      const geometry = mesh.geometry;
      const position = geometry.getAttribute("position");
      if (!(position instanceof THREE.BufferAttribute) || position.itemSize !== 3) {
        return;
      }

      const positions = position.array;
      if (!(positions instanceof Float32Array)) {
        return;
      }

      // Geometry is a unit icosphere; mesh.scale maps it into blank size.
      const averageScale = (width + height + depth) / 6;
      const localRadius =
        sculptBrushWorldRadius(width, height, depth, brushCellRadiusRef.current) / averageScale;

      const lastPoint = lastHitPointRef.current;
      const changed = lastPoint
        ? displaceVerticesInwardAlongSegment(
            positions,
            lastPoint.x,
            lastPoint.y,
            lastPoint.z,
            localPoint.x,
            localPoint.y,
            localPoint.z,
            localNormal.x,
            localNormal.y,
            localNormal.z,
            localRadius,
            DEFAULT_SCULPT_STRENGTH,
          )
        : displaceVerticesInward(
            positions,
            localPoint.x,
            localPoint.y,
            localPoint.z,
            localNormal.x,
            localNormal.y,
            localNormal.z,
            localRadius,
            DEFAULT_SCULPT_STRENGTH,
          );

      if (!lastPoint) {
        lastHitPointRef.current = localPoint.clone();
      } else {
        lastPoint.copy(localPoint);
      }

      if (!changed) {
        return;
      }

      // Three.js deformation loop: flag attribute → refresh normals for lighting.
      position.needsUpdate = true;
      geometry.computeVertexNormals();
    },
    [width, height, depth],
  );

  const sculptFromIntersection = useCallback(
    (worldPoint: THREE.Vector3, localFaceNormal: THREE.Vector3) => {
      const mesh = meshRef.current;
      if (!mesh) {
        return;
      }

      const localPoint = localPointRef.current.copy(worldPoint);
      mesh.worldToLocal(localPoint);
      localNormalRef.current.copy(localFaceNormal).normalize();
      applySculptAtLocalHit(localPoint, localNormalRef.current);
    },
    [applySculptAtLocalHit],
  );

  useFrame(() => {
    if (!isCarvingRef.current) {
      return;
    }

    const mesh = meshRef.current;
    if (!mesh) {
      return;
    }

    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObject(mesh, false);
    const hit = hits[0];
    if (!hit?.face) {
      return;
    }

    sculptFromIntersection(hit.point, hit.face.normal);
  });

  const onPointerDown = (event: ThreeEvent<PointerEvent>) => {
    if (event.button !== 0 || !event.face) {
      return;
    }
    event.stopPropagation();
    isCarvingRef.current = true;
    lastHitPointRef.current = null;
    sculptFromIntersection(event.point, event.face.normal);
  };

  return (
    <mesh
      key={`sculpt-${detail}-${width}-${height}-${depth}`}
      ref={meshRef}
      scale={[width / 2, height / 2, depth / 2]}
      castShadow
      receiveShadow
      onPointerDown={onPointerDown}
    >
      {/* Unit icosphere; non-uniform scale makes an ellipsoid blank. */}
      <icosahedronGeometry args={[1, detail]} />
      <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
    </mesh>
  );
};
