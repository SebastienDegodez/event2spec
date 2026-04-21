import { useMemo } from 'react';
import { useBoard, useSlices } from '../../../core/store/useBoardStore';
import { type VerticalSliceProjection } from '../../../core/domain/vertical-slice/VerticalSliceProjection';
import { type BoardProjection } from '../../../core/domain/board/BoardProjection';

interface SlicePanelEntry {
  id: string;
  name: string;
  commandId: string;
  eventIds: ReadonlyArray<string>;
  readModelId: string;
  startColumn: number;
  columnCount: number;
}

export function SlicePanel() {
  const board = useBoard();
  const slices = useSlices();

  const nodeLabels = useMemo<Map<string, string>>(() => {
    const map = new Map<string, string>();
    const projection: BoardProjection = {
      onCommandNode(id, label) { map.set(id, label); },
      onDomainEventNode(id, label) { map.set(id, label); },
      onReadModelNode(id, label) { map.set(id, label); },
      onPolicyNode() {},
      onUIScreenNode() {},
    };
    board.describeTo(projection);
    return map;
  }, [board]);

  const entries = useMemo<SlicePanelEntry[]>(() => {
    const result: SlicePanelEntry[] = [];
    const projection: VerticalSliceProjection = {
      onSlice(id, name, commandId, eventIds, readModelId, _scenarios, _boundedContextId, startColumn, columnCount) {
        result.push({ id, name, commandId, eventIds, readModelId, startColumn, columnCount });
      },
    };
    slices.describeTo(projection);
    return result;
  }, [slices]);

  const getLabel = (id: string): string => nodeLabels.get(id) ?? id;

  return (
    <aside className="slice-panel" aria-label="Vertical slice management">
      <div className="palette-title">Vertical Slices</div>

      {entries.map((entry) => (
        <div key={entry.id} className="slice-item">
          <div className="slice-item-header">
            <span className="slice-name">{entry.name}</span>
          </div>
          <div className="slice-summary">
            {entry.commandId && (
              <span className="slice-badge slice-badge--command">{getLabel(entry.commandId)}</span>
            )}
            {entry.eventIds.map((eventId) => (
              <span key={eventId} className="slice-badge slice-badge--event">{getLabel(eventId)}</span>
            ))}
            {entry.readModelId && (
              <span className="slice-badge slice-badge--readmodel">{getLabel(entry.readModelId)}</span>
            )}
          </div>
        </div>
      ))}

      <div className="slice-add-hint">
        Click a free column to start a slice, then use the header arrow to extend it.
      </div>
    </aside>
  );
}
