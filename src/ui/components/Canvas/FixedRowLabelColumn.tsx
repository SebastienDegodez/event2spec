import { useState } from 'react';
import { type SwimlaneColor } from '../../../core/domain/SwimlaneColor';
import { GRID_SIZE } from './gridConstants';

const FIXED_ROW_LABEL_COLOR: Record<string, string> = {
  yellow: 'rgba(253, 224, 71, 0.35)',
  blue: 'rgba(96, 165, 250, 0.35)',
  red: 'rgba(248, 113, 113, 0.35)',
  grey: 'rgba(156, 163, 175, 0.35)',
};

export interface FixedRowLabelEntry {
  id: string;
  name: string;
  index: number;
  color: SwimlaneColor;
  domainEventCount: number;
}

interface FixedRowLabelColumnProps {
  viewport: { x: number; y: number; zoom: number };
  boundedContextRows: readonly FixedRowLabelEntry[];
  onCreateBoundedContext: (insertAfterIndex?: number) => void;
  onDeleteBoundedContext: (id: string, name: string, domainEventCount: number) => void;
  onStartEditBoundedContext: (id: string, name: string) => void;
}

export function FixedRowLabelColumn({
  viewport,
  boundedContextRows,
  onCreateBoundedContext,
  onDeleteBoundedContext,
  onStartEditBoundedContext,
}: FixedRowLabelColumnProps) {
  const rowHeight = GRID_SIZE * viewport.zoom;
  const [hoveredBcId, setHoveredBcId] = useState<string | null>(null);

  return (
    <div className="fixed-row-labels-column" aria-label="Row labels">
      <div
        className="fixed-row-label fixed-row-label--ui"
        style={{ top: 0 * GRID_SIZE * viewport.zoom + viewport.y, height: rowHeight }}
      >
        UI
      </div>
      <div
        className="fixed-row-label fixed-row-label--cmd"
        style={{ top: 1 * GRID_SIZE * viewport.zoom + viewport.y, height: rowHeight }}
      >
        Cmd · RM
      </div>
      {boundedContextRows.map((entry, idx) => {
        const row = 2 + entry.index;
        const isHovered = hoveredBcId === entry.id;
        return (
          <div key={entry.id} style={{ position: 'relative' }}>
            <button
              data-testid="bounded-context-insert-button"
              className="bounded-context-insert-button"
              onClick={() => onCreateBoundedContext(idx)}
              title="Insert bounded context before"
              aria-label="Insert bounded context"
              style={{
                top: row * GRID_SIZE * viewport.zoom + viewport.y - 12,
              }}
            >
              ＋
            </button>
            <div
              data-testid="fixed-bounded-context-row-label"
              className={`fixed-row-label fixed-row-label--bc ${isHovered ? 'fixed-row-label--bc-hovered' : ''}`}
              style={{
                top: row * GRID_SIZE * viewport.zoom + viewport.y,
                height: rowHeight,
                borderLeftColor: FIXED_ROW_LABEL_COLOR[entry.color] || FIXED_ROW_LABEL_COLOR.grey,
              }}
              onMouseEnter={() => setHoveredBcId(entry.id)}
              onMouseLeave={() => setHoveredBcId(null)}
            >
              {!isHovered && entry.name}
              {isHovered && (
                <div className="fixed-row-label-actions">
                  <button
                    data-testid="fixed-bounded-context-edit-button"
                    className="fixed-row-label-btn fixed-row-label-btn--edit"
                    onClick={() => onStartEditBoundedContext(entry.id, entry.name)}
                    title="Edit bounded context name"
                    aria-label="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    data-testid="fixed-bounded-context-delete-button"
                    className="fixed-row-label-btn fixed-row-label-btn--delete"
                    onClick={() => onDeleteBoundedContext(entry.id, entry.name, entry.domainEventCount)}
                    title="Delete bounded context"
                    aria-label="Delete"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
      <button
        data-testid="bounded-context-insert-button"
        className="bounded-context-insert-button"
        onClick={() => onCreateBoundedContext(boundedContextRows.length)}
        title="Insert bounded context at end"
        aria-label="Insert bounded context at end"
        style={{
          top: (2 + boundedContextRows.length) * GRID_SIZE * viewport.zoom + viewport.y - 12,
        }}
      >
        ＋
      </button>
    </div>
  );
}