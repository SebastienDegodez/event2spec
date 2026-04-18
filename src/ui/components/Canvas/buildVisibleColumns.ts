import { pixelToGrid } from './gridConstants';

interface Viewport {
  x: number;
  y: number;
  zoom: number;
}

export function buildVisibleColumns(viewport: Viewport, containerWidth: number): number[] {
  const minFlowX = -viewport.x / viewport.zoom;
  const maxFlowX = (containerWidth - viewport.x) / viewport.zoom;

  const minCol = Math.max(0, pixelToGrid(minFlowX, 0).column - 1);
  const maxCol = pixelToGrid(maxFlowX, 0).column + 1;

  const columns: number[] = [];
  for (let col = minCol; col <= maxCol; col++) {
    columns.push(col);
  }

  return columns;
}