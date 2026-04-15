import { useMemo } from 'react';
import { pixelToGrid } from '../components/Canvas/gridConstants';
import { GRID_SIZE } from '../components/Canvas/gridTheme';

interface Viewport {
  x: number;
  y: number;
  zoom: number;
}

interface ViewportCellsOptions {
  viewport: Viewport;
  containerWidth: number;
  containerHeight: number;
  occupiedCells: ReadonlySet<string>;
  rows: readonly number[];
  columnBuffer?: number;
  rowBuffer?: number;
}

/**
 * Returns the list of {column, row} grid positions that are:
 * - visible in the current viewport (with buffer)
 * - in one of the provided rows
 * - not occupied by an existing node
 */
export function useViewportCells({
  viewport,
  containerWidth,
  containerHeight,
  occupiedCells,
  rows,
  columnBuffer = 2,
  rowBuffer = 1,
}: ViewportCellsOptions): Array<{ column: number; row: number }> {
  // Coarsen key: round viewport offset to nearest grid cell to avoid recomputing every pixel during panning.
  const coarseX = Math.round(viewport.x / GRID_SIZE);
  const coarseY = Math.round(viewport.y / GRID_SIZE);

  return useMemo(() => {
    // Convert screen bounds to flow coordinates.
    const topLeftFlow = {
      x: -viewport.x / viewport.zoom,
      y: -viewport.y / viewport.zoom,
    };
    const bottomRightFlow = {
      x: (containerWidth - viewport.x) / viewport.zoom,
      y: (containerHeight - viewport.y) / viewport.zoom,
    };

    const minGrid = pixelToGrid(topLeftFlow.x, topLeftFlow.y);
    const maxGrid = pixelToGrid(bottomRightFlow.x, bottomRightFlow.y);

    const minCol = Math.max(0, minGrid.column - columnBuffer);
    const maxCol = maxGrid.column + columnBuffer;

    const seen = new Set<string>();
    const cells: Array<{ column: number; row: number }> = [];

    for (const row of rows) {
      for (let col = minCol; col <= maxCol; col++) {
        const key = `${col},${row}`;
        if (!seen.has(key) && !occupiedCells.has(key)) {
          seen.add(key);
          cells.push({ column: col, row });
        }
      }
    }

    return cells;
    // rowBuffer intentionally kept in deps for API stability even though rows already define renderable rows.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coarseX, coarseY, viewport.zoom, containerWidth, containerHeight, occupiedCells, rows, columnBuffer, rowBuffer]);
}
