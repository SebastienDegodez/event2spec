import { GRID_SIZE, NOTE_SIZE, NOTE_MARGIN } from './gridTheme';
export { GRID_SIZE, NOTE_SIZE, NOTE_MARGIN };

/** Color used for command nodes on the minimap */
export const COMMAND_NODE_COLOR = '#3b82f6';

/** Color used for domain event nodes on the minimap */
export const DOMAIN_EVENT_NODE_COLOR = '#f59e0b';

/** Color used for read model nodes on the minimap */
export const READ_MODEL_NODE_COLOR = '#22c55e';

/** Color used for policy nodes on the minimap */
export const POLICY_NODE_COLOR = '#a855f7';

/** Color used for UI screen nodes on the minimap */
export const UI_SCREEN_NODE_COLOR = '#eab308';

/** Color used for edges between command and event nodes */
export const EDGE_COLOR = '#60a5fa';

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
