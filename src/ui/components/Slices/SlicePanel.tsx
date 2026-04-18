import { useMemo } from 'react';
import { useSlices } from '../../../core/store/useBoardStore';
import { type VerticalSliceProjection } from '../../../core/domain/vertical-slice/VerticalSliceProjection';

interface SlicePanelEntry {
  id: string;
  name: string;
  startColumn: number;
  columnCount: number;
}

export function SlicePanel() {
  const slices = useSlices();

  const entries = useMemo<SlicePanelEntry[]>(() => {
    const result: SlicePanelEntry[] = [];
    const projection: VerticalSliceProjection = {
      onSlice(id, name, _commandId, _eventIds, _readModelId, _scenarios, _boundedContextId, startColumn, columnCount) {
        result.push({ id, name, startColumn, columnCount });
      },
    };
    slices.describeTo(projection);
    return result;
  }, [slices]);

  return (
    <aside className="slice-panel" aria-label="Vertical slice management">
      <div className="palette-title">Vertical Slices</div>

      {entries.map((entry) => (
        <div key={entry.id} className="slice-item">
          <div className="slice-item-header">
            <span className="slice-name">{entry.name}</span>
          </div>
          <div className="slice-summary">
            <span className="slice-range-label">
              Columns {entry.startColumn}-{entry.startColumn + entry.columnCount - 1}
            </span>
          </div>
        </div>
      ))}

      <div className="slice-add-hint">
        Click a free column to start a slice, then use the header arrow to extend it.
      </div>
    </aside>
  );
}
