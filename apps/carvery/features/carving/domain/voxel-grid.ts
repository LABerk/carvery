import { WoodBlank, defaultWoodBlank } from "@/features/carving/domain/wood-blank";
import { StartingShape, defaultStartingShape } from "@/features/carving/domain/starting-shape";

export type VoxelGrid = {
  sizeX: number;
  sizeY: number;
  sizeZ: number;
  cellSize: number;
  /** Occupancy flags, length sizeX * sizeY * sizeZ (1 = wood, 0 = empty). */
  occupied: Uint8Array;
  /** World-space origin of the grid corner (min x/y/z). */
  originX: number;
  originY: number;
  originZ: number;
};

export type VoxelCoord = {
  x: number;
  y: number;
  z: number;
};

type CreateVoxelGridOptions = {
  blank?: WoodBlank;
  resolutionAlongWidth?: number;
  startingShape?: StartingShape;
};

const isInsideStartingShape = (
  shape: StartingShape,
  nx: number,
  ny: number,
  nz: number,
): boolean => {
  switch (shape) {
    case "box":
      return Math.abs(nx) <= 1 && Math.abs(ny) <= 1 && Math.abs(nz) <= 1;
    case "sphere":
      return nx * nx + ny * ny + nz * nz <= 1;
    case "cylinder":
      return nx * nx + nz * nz <= 1 && Math.abs(ny) <= 1;
    case "cone": {
      const radius = (1 - ny) / 2;
      return nx * nx + nz * nz <= radius * radius && Math.abs(ny) <= 1;
    }
    default:
      return true;
  }
};

export const createVoxelGrid = ({
  blank = defaultWoodBlank,
  resolutionAlongWidth = 24,
  startingShape = defaultStartingShape,
}: CreateVoxelGridOptions = {}): VoxelGrid => {
  const cellSize = blank.width / resolutionAlongWidth;
  const sizeX = resolutionAlongWidth;
  const sizeY = Math.max(1, Math.round(blank.height / cellSize));
  const sizeZ = Math.max(1, Math.round(blank.depth / cellSize));
  const occupied = new Uint8Array(sizeX * sizeY * sizeZ);
  const originX = -blank.width / 2;
  const originY = -blank.height / 2;
  const originZ = -blank.depth / 2;
  const halfWidth = blank.width / 2;
  const halfHeight = blank.height / 2;
  const halfDepth = blank.depth / 2;

  const grid: VoxelGrid = {
    sizeX,
    sizeY,
    sizeZ,
    cellSize,
    occupied,
    originX,
    originY,
    originZ,
  };

  for (let z = 0; z < sizeZ; z += 1) {
    for (let y = 0; y < sizeY; y += 1) {
      for (let x = 0; x < sizeX; x += 1) {
        const [cx, cy, cz] = cellCenter(grid, x, y, z);
        const nx = cx / halfWidth;
        const ny = cy / halfHeight;
        const nz = cz / halfDepth;
        occupied[voxelIndex(grid, x, y, z)] = isInsideStartingShape(startingShape, nx, ny, nz)
          ? 1
          : 0;
      }
    }
  }

  return grid;
};

export const voxelIndex = (grid: VoxelGrid, x: number, y: number, z: number): number => {
  return x + y * grid.sizeX + z * grid.sizeX * grid.sizeY;
};

export const isInsideGrid = (grid: VoxelGrid, x: number, y: number, z: number): boolean => {
  return x >= 0 && x < grid.sizeX && y >= 0 && y < grid.sizeY && z >= 0 && z < grid.sizeZ;
};

export const cellCenter = (grid: VoxelGrid, x: number, y: number, z: number): [number, number, number] => {
  const half = grid.cellSize / 2;
  return [
    grid.originX + x * grid.cellSize + half,
    grid.originY + y * grid.cellSize + half,
    grid.originZ + z * grid.cellSize + half,
  ];
};

export const worldToVoxel = (
  grid: VoxelGrid,
  worldX: number,
  worldY: number,
  worldZ: number,
): VoxelCoord | null => {
  const x = Math.floor((worldX - grid.originX) / grid.cellSize);
  const y = Math.floor((worldY - grid.originY) / grid.cellSize);
  const z = Math.floor((worldZ - grid.originZ) / grid.cellSize);
  if (!isInsideGrid(grid, x, y, z)) {
    return null;
  }
  return { x, y, z };
};

/** Removes occupied cells whose centers fall inside the brush sphere. Returns whether anything changed. */
export const carveSphere = (
  grid: VoxelGrid,
  centerX: number,
  centerY: number,
  centerZ: number,
  radius: number,
): boolean => {
  const radiusSq = radius * radius;
  const minX = Math.max(0, Math.floor((centerX - radius - grid.originX) / grid.cellSize));
  const maxX = Math.min(grid.sizeX - 1, Math.floor((centerX + radius - grid.originX) / grid.cellSize));
  const minY = Math.max(0, Math.floor((centerY - radius - grid.originY) / grid.cellSize));
  const maxY = Math.min(grid.sizeY - 1, Math.floor((centerY + radius - grid.originY) / grid.cellSize));
  const minZ = Math.max(0, Math.floor((centerZ - radius - grid.originZ) / grid.cellSize));
  const maxZ = Math.min(grid.sizeZ - 1, Math.floor((centerZ + radius - grid.originZ) / grid.cellSize));

  let changed = false;
  for (let z = minZ; z <= maxZ; z += 1) {
    for (let y = minY; y <= maxY; y += 1) {
      for (let x = minX; x <= maxX; x += 1) {
        const index = voxelIndex(grid, x, y, z);
        if (grid.occupied[index] === 0) {
          continue;
        }
        const [cx, cy, cz] = cellCenter(grid, x, y, z);
        const dx = cx - centerX;
        const dy = cy - centerY;
        const dz = cz - centerZ;
        if (dx * dx + dy * dy + dz * dz <= radiusSq) {
          grid.occupied[index] = 0;
          changed = true;
        }
      }
    }
  }
  return changed;
};

/** Carves overlapping spheres along a segment so fast strokes don't leave gaps. */
export const carveSphereAlongSegment = (
  grid: VoxelGrid,
  startX: number,
  startY: number,
  startZ: number,
  endX: number,
  endY: number,
  endZ: number,
  radius: number,
): boolean => {
  const dx = endX - startX;
  const dy = endY - startY;
  const dz = endZ - startZ;
  const distance = Math.hypot(dx, dy, dz);
  if (distance < 1e-6) {
    return carveSphere(grid, endX, endY, endZ, radius);
  }

  const step = Math.max(grid.cellSize * 0.3, radius * 0.2);
  const steps = Math.max(1, Math.ceil(distance / step));
  let changed = false;
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const carved = carveSphere(
      grid,
      startX + dx * t,
      startY + dy * t,
      startZ + dz * t,
      radius,
    );
    if (carved) {
      changed = true;
    }
  }
  return changed;
};

/** Walks a ray and returns the center of the first occupied voxel, if any. */
export const findOccupiedPointAlongRay = (
  grid: VoxelGrid,
  originX: number,
  originY: number,
  originZ: number,
  directionX: number,
  directionY: number,
  directionZ: number,
  maxDistance = 8,
): [number, number, number] | null => {
  const length = Math.hypot(directionX, directionY, directionZ);
  if (length < 1e-8) {
    return null;
  }

  const inv = 1 / length;
  const step = grid.cellSize * 0.45;
  const samples = Math.ceil(maxDistance / step);

  for (let i = 0; i <= samples; i += 1) {
    const distance = i * step;
    const x = originX + directionX * inv * distance;
    const y = originY + directionY * inv * distance;
    const z = originZ + directionZ * inv * distance;
    const voxel = worldToVoxel(grid, x, y, z);
    if (!voxel) {
      continue;
    }
    if (grid.occupied[voxelIndex(grid, voxel.x, voxel.y, voxel.z)] === 1) {
      return cellCenter(grid, voxel.x, voxel.y, voxel.z);
    }
  }

  return null;
};

export const countOccupied = (grid: VoxelGrid): number => {
  let count = 0;
  for (let i = 0; i < grid.occupied.length; i += 1) {
    count += grid.occupied[i] ?? 0;
  }
  return count;
};
