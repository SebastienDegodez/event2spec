import { GRID_SIZE } from './gridConstants';

export interface SliceHeaderEntry {
  id: string;
  label: string;
  startColumn: number;
  columnCount: number;
  isTemporary?: boolean;
  canExtendRight: boolean;
  onExtendRight: () => void;
  onEdit?: () => void;
  onScenarios?: () => void;
  onDelete?: () => void;
}

interface SliceHeaderStripProps {
  entries: SliceHeaderEntry[];
  viewport: { x: number; y: number; zoom: number };
  hitboxColumns: number[];
  onHitboxClick: (column: number) => void;
}

export function SliceHeaderStrip({
  entries,
  viewport,
  hitboxColumns,
  onHitboxClick,
}: SliceHeaderStripProps) {
  return (
    <div className="slice-header-strip">
      {hitboxColumns.map((column) => {
        const left = column * GRID_SIZE * viewport.zoom + viewport.x;
        const width = GRID_SIZE * viewport.zoom;
        return (
          <button
            key={column}
            type="button"
            data-testid={`slice-column-hitbox-${column}`}
            className="slice-column-hitbox"
            style={{ left, top: 0, bottom: 0, width }}
            onClick={() => onHitboxClick(column)}
          />
        );
      })}
      {entries.map((entry) => {
        const left = entry.startColumn * GRID_SIZE * viewport.zoom + viewport.x;
        const width = entry.columnCount * GRID_SIZE * viewport.zoom;
        return (
          <div
            key={entry.id}
            className={`slice-header-chip${entry.isTemporary ? ' slice-header-chip--temporary' : ''}`}
            data-testid={entry.isTemporary ? 'slice-selection-header' : `slice-header-${entry.id}`}
            style={{ left, width }}
          >
            <span className="slice-header-chip-title">{entry.label}</span>
            {entry.isTemporary && (
              <button
                type="button"
                data-testid="slice-selection-extend-right"
                className="slice-header-chip-btn"
                onClick={entry.onExtendRight}
                disabled={!entry.canExtendRight}
                aria-label="Extend slice right"
              >
                →
              </button>
            )}
            {!entry.isTemporary && entry.onEdit && (
              <>
                <button type="button" data-testid="slice-header-edit" className="slice-header-chip-btn" onClick={entry.onEdit}>Edit</button>
                <button type="button" data-testid="slice-header-scenarios" className="slice-header-chip-btn" onClick={entry.onScenarios}>Scenarios</button>
                <button type="button" data-testid="slice-header-delete" className="slice-header-chip-btn slice-header-chip-btn--delete" onClick={entry.onDelete} aria-label="Delete slice">×</button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}