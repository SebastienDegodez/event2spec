/** Fixed grid cell size in pixels */
export const GRID_SIZE = 250;

/** Visual size of a sticky note (centered inside the cell) */
export const NOTE_SIZE = 200;

/** Margin on each side of the note inside the cell */
export const NOTE_MARGIN = (GRID_SIZE - NOTE_SIZE) / 2;

/** Convert grid coordinates to React Flow pixel position (top-left corner of note) */
export function gridToPixel(col: number, row: number): { x: number; y: number } {
  return {
    x: col * GRID_SIZE + NOTE_MARGIN,
    y: row * GRID_SIZE + NOTE_MARGIN,
  };
}

/** Convert pixel position to nearest grid cell */
export function pixelToGrid(x: number, y: number): { col: number; row: number } {
  return {
    col: Math.round((x - NOTE_MARGIN) / GRID_SIZE),
    row: Math.round((y - NOTE_MARGIN) / GRID_SIZE),
  };
}
