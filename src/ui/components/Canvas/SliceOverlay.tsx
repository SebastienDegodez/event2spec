import { GRID_SIZE } from './gridConstants';

interface SliceOverlayProps {
  id: string;
  label: string;
  startColumn: number;
  columnCount: number;
  viewport: { x: number; y: number; zoom: number };
  topOffset: number;
  height: number;
  isTemporary?: boolean;
  canExtendRight: boolean;
  onExtendRight?: () => void;
  onEdit?: () => void;
  onScenarios?: () => void;
}

export function SliceOverlay({
  id,
  label,
  startColumn,
  columnCount,
  viewport,
  topOffset,
  height,
  isTemporary = false,
  canExtendRight,
  onExtendRight,
  onEdit,
  onScenarios,
}: SliceOverlayProps) {
  const left = startColumn * GRID_SIZE * viewport.zoom + viewport.x;
  const width = columnCount * GRID_SIZE * viewport.zoom;

  return (
    <div
      className={`slice-overlay ${isTemporary ? 'slice-overlay--temporary' : ''}`}
      style={{ left, width, top: topOffset, height }}
    >
      <div className="slice-overlay-frame" />
      <div className="slice-overlay-header" data-testid={isTemporary ? 'slice-selection-header' : `slice-header-${id}`}>
        <span className="slice-overlay-title">{label}</span>
        <button
          type="button"
          data-testid={isTemporary ? 'slice-selection-extend-right' : 'slice-header-extend-right'}
          className="slice-overlay-action"
          onClick={onExtendRight}
          disabled={!canExtendRight}
          aria-label="Extend slice right"
        >
          →
        </button>
        {!isTemporary && (
          <>
            <button type="button" data-testid="slice-header-edit" className="slice-overlay-action" onClick={onEdit}>View / Edit</button>
            <button type="button" data-testid="slice-header-scenarios" className="slice-overlay-action" onClick={onScenarios}>Scenarios</button>
          </>
        )}
      </div>
    </div>
  );
}
