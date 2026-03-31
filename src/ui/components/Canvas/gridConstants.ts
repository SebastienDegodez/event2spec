/** Fixed grid cell size in pixels */
export const GRID_SIZE = 250;

/** Visual size of a sticky note (centered inside the cell) */
export const NOTE_SIZE = 200;

/** Margin around the note inside its grid cell */
export const NOTE_MARGIN = (GRID_SIZE - NOTE_SIZE) / 2;

/** Convert discrete grid coordinates to React Flow pixel position (top-left of note). */
export function gridToPixel(column: number, row: number): { x: number; y: number } {
  return {
    x: column * GRID_SIZE + NOTE_MARGIN,
    y: row * GRID_SIZE + NOTE_MARGIN,
  };
}

/** Convert a pixel drop position back to the nearest grid cell. */
export function pixelToGrid(x: number, y: number): { column: number; row: number } {
  return {
    column: Math.round((x - NOTE_MARGIN) / GRID_SIZE),
    row: Math.round((y - NOTE_MARGIN) / GRID_SIZE),
  };
}

/** Convert a domain grid position to a React Flow pixel position. */
export function domainNodeToPixelPosition(gridPos: { column: number; row: number }): { x: number; y: number } {
  return gridToPixel(gridPos.column, gridPos.row);
}
