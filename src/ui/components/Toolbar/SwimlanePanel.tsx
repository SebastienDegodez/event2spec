import { useCallback, useMemo, useState } from 'react';
import { useSwimlanes, useSwimlaneActions } from '../../../core/store/useBoardStore';
import { type SwimlaneProjection } from '../../../core/domain/SwimlaneProjection';
import { type ActorType } from '../../../core/domain/ActorType';
import { type SwimlaneColor } from '../../../core/domain/SwimlaneColor';

const ACTOR_TYPE_LABELS: Record<ActorType, string> = {
  human: '👤 Human',
  internal_system: '🖥️ Internal System',
  external_system: '🌐 External System',
  automated_process: '🤖 Automated',
};

interface SwimlanePanelEntry {
  id: string;
  actorName: string;
  actorType: ActorType;
  color: SwimlaneColor;
  index: number;
  isFirst: boolean;
  isLast: boolean;
}

export function SwimlanePanel() {
  const swimlanes = useSwimlanes();
  const { addSwimlane, removeSwimlane, renameSwimlane, reorderSwimlanes, changeSwimlaneActorType } = useSwimlaneActions();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const entries = useMemo<SwimlanePanelEntry[]>(() => {
    const result: SwimlanePanelEntry[] = [];
    const projection: SwimlaneProjection = {
      onSwimlane(id, actorName, actorType, color, index, isFirst, isLast) {
        result.push({ id, actorName, actorType, color, index, isFirst, isLast });
      },
    };
    swimlanes.describeTo(projection);
    return result;
  }, [swimlanes]);

  const handleAdd = useCallback(() => {
    const id = `swimlane-${crypto.randomUUID()}`;
    addSwimlane(id, 'New Lane', 'human');
  }, [addSwimlane]);

  const startEditing = useCallback((id: string, currentName: string) => {
    setEditingId(id);
    setEditingName(currentName);
  }, []);

  const commitEditing = useCallback(() => {
    if (editingId && editingName.trim()) {
      renameSwimlane(editingId, editingName.trim());
    }
    setEditingId(null);
  }, [editingId, editingName, renameSwimlane]);

  return (
    <aside className="swimlane-panel" aria-label="Swimlane management">
      <div className="palette-title">Swimlanes</div>
      {entries.map((entry) => (
        <div key={entry.id} className={`swimlane-item swimlane-item--${entry.color}`}>
          <div className="swimlane-item-header">
            {editingId === entry.id ? (
              <input
                className="swimlane-name-input"
                value={editingName}
                autoFocus
                onChange={(e) => setEditingName(e.target.value)}
                onBlur={commitEditing}
                onKeyDown={(e) => { if (e.key === 'Enter') commitEditing(); }}
                aria-label="Swimlane name"
              />
            ) : (
              <button
                className="swimlane-name"
                onClick={() => startEditing(entry.id, entry.actorName)}
                title="Click to rename"
                aria-label={`Rename swimlane ${entry.actorName}`}
              >
                {entry.actorName}
              </button>
            )}
            <div className="swimlane-item-actions">
              <button
                className="swimlane-action-btn"
                onClick={() => reorderSwimlanes(entry.id, entry.index - 1)}
                disabled={entry.isFirst}
                title="Move up"
                aria-label="Move swimlane up"
              >
                ↑
              </button>
              <button
                className="swimlane-action-btn"
                onClick={() => reorderSwimlanes(entry.id, entry.index + 1)}
                disabled={entry.isLast}
                title="Move down"
                aria-label="Move swimlane down"
              >
                ↓
              </button>
              <button
                className="swimlane-action-btn swimlane-action-btn--delete"
                onClick={() => removeSwimlane(entry.id)}
                title="Delete swimlane"
                aria-label={`Delete swimlane ${entry.actorName}`}
              >
                ×
              </button>
            </div>
          </div>
          <select
            className="swimlane-type-select"
            value={entry.actorType}
            onChange={(e) => changeSwimlaneActorType(entry.id, e.target.value as ActorType)}
            aria-label="Actor type"
          >
            {(Object.keys(ACTOR_TYPE_LABELS) as ActorType[]).map((type) => (
              <option key={type} value={type}>{ACTOR_TYPE_LABELS[type]}</option>
            ))}
          </select>
        </div>
      ))}
      <button
        className="palette-item swimlane-add-btn"
        onClick={handleAdd}
        title="Add swimlane"
        aria-label="Add swimlane"
      >
        ＋ Add Swimlane
      </button>
    </aside>
  );
}
