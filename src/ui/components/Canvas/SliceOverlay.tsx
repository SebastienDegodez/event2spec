import { GRID_SIZE } from './gridConstants';

interface SliceOverlayProps {
  startColumn: number;
  columnCount: number;
  viewport: { x: number; y: number; zoom: number };
  topOffset: number;
  height: number;
  isTemporary?: boolean;
}

export function SliceOverlay({
  startColumn,
  columnCount,
  viewport,
  topOffset,
  height,
  isTemporary = false,
}: SliceOverlayProps) {
  const left = startColumn * GRID_SIZE * viewport.zoom + viewport.x;
  const width = columnCount * GRID_SIZE * viewport.zoom;

  return (
    <div
      className={`slice-overlay ${isTemporary ? 'slice-overlay--temporary' : ''}`}
      style={{ left, width, top: topOffset, height }}
    >
      <div className="slice-overlay-frame" />
    </div>
  );
}
