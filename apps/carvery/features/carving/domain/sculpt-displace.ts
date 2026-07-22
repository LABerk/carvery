/**
 * Pure BufferGeometry sculpt helpers (no Three.js imports).
 * Lab sculpt mode edits a position Float32Array, then the UI marks it needsUpdate
 * and recomputes normals — the core Three.js deformation loop.
 */

export const DEFAULT_SCULPT_STRENGTH = 0.035;

/** Map lab resolution slider → icosahedron subdivision detail. */
export const resolutionToIcosahedronDetail = (resolutionAlongWidth: number): number => {
  if (resolutionAlongWidth >= 36) {
    return 5;
  }
  if (resolutionAlongWidth >= 28) {
    return 4;
  }
  if (resolutionAlongWidth >= 20) {
    return 3;
  }
  return 2;
};

/** World-space brush radius from blank size + lab brush slider. */
export const sculptBrushWorldRadius = (
  width: number,
  height: number,
  depth: number,
  brushCellRadius: number,
): number => {
  const averageExtent = (width + height + depth) / 3;
  return averageExtent * (brushCellRadius / 18);
};

/**
 * Soft falloff: 1 at center, 0 at radius edge (smoothstep-ish).
 */
const brushFalloff = (distance: number, radius: number): number => {
  if (distance >= radius) {
    return 0;
  }
  const t = 1 - distance / radius;
  return t * t * (3 - 2 * t);
};

/** Push vertices near the hit point along -normal. Returns whether any vertex moved. */
export const displaceVerticesInward = (
  positions: Float32Array,
  hitX: number,
  hitY: number,
  hitZ: number,
  normalX: number,
  normalY: number,
  normalZ: number,
  radius: number,
  strength: number,
): boolean => {
  const normalLength = Math.hypot(normalX, normalY, normalZ);
  if (normalLength < 1e-8 || radius <= 0 || strength <= 0) {
    return false;
  }

  const invNormal = 1 / normalLength;
  const nx = normalX * invNormal;
  const ny = normalY * invNormal;
  const nz = normalZ * invNormal;

  let changed = false;
  for (let i = 0; i < positions.length; i += 3) {
    const vx = positions[i] ?? 0;
    const vy = positions[i + 1] ?? 0;
    const vz = positions[i + 2] ?? 0;
    const distance = Math.hypot(vx - hitX, vy - hitY, vz - hitZ);
    const falloff = brushFalloff(distance, radius);
    if (falloff <= 0) {
      continue;
    }

    const push = strength * falloff;
    positions[i] = vx - nx * push;
    positions[i + 1] = vy - ny * push;
    positions[i + 2] = vz - nz * push;
    changed = true;
  }

  return changed;
};

/** Same brush applied along a stroke segment so fast drags stay continuous. */
export const displaceVerticesInwardAlongSegment = (
  positions: Float32Array,
  startX: number,
  startY: number,
  startZ: number,
  endX: number,
  endY: number,
  endZ: number,
  normalX: number,
  normalY: number,
  normalZ: number,
  radius: number,
  strength: number,
): boolean => {
  const dx = endX - startX;
  const dy = endY - startY;
  const dz = endZ - startZ;
  const distance = Math.hypot(dx, dy, dz);
  if (distance < 1e-6) {
    return displaceVerticesInward(
      positions,
      endX,
      endY,
      endZ,
      normalX,
      normalY,
      normalZ,
      radius,
      strength,
    );
  }

  const step = Math.max(radius * 0.25, 0.01);
  const steps = Math.max(1, Math.ceil(distance / step));
  let changed = false;
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const carved = displaceVerticesInward(
      positions,
      startX + dx * t,
      startY + dy * t,
      startZ + dz * t,
      normalX,
      normalY,
      normalZ,
      radius,
      strength,
    );
    if (carved) {
      changed = true;
    }
  }
  return changed;
};
