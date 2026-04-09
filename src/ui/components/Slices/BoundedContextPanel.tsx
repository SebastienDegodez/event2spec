import { useCallback, useMemo, useState } from 'react';
import { useBoundedContexts, useBoundedContextActions } from '../../../core/store/useBoardStore';
import { type BoundedContextProjection } from '../../../core/domain/BoundedContextProjection';

interface BCEntry {
  id: string;
  name: string;
}

export function BoundedContextPanel() {
  const boundedContexts = useBoundedContexts();
  const { createBoundedContext, deleteBoundedContext, renameBoundedContext } = useBoundedContextActions();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [newName, setNewName] = useState('');

  const entries = useMemo<BCEntry[]>(() => {
    const result: BCEntry[] = [];
    const projection: BoundedContextProjection = {
      onBoundedContext(id, name) { result.push({ id, name }); },
    };
    boundedContexts.describeTo(projection);
    return result;
  }, [boundedContexts]);

  const startEditing = useCallback((id: string, current: string) => {
    setEditingId(id);
    setEditingName(current);
  }, []);

  const commitEditing = useCallback(() => {
    if (editingId && editingName.trim()) {
      renameBoundedContext(editingId, editingName.trim());
    }
    setEditingId(null);
  }, [editingId, editingName, renameBoundedContext]);

  const handleCreate = useCallback(() => {
    const name = newName.trim();
    if (!name) return;
    createBoundedContext(crypto.randomUUID(), name);
    setNewName('');
  }, [newName, createBoundedContext]);

  return (
    <aside className="slice-panel" aria-label="Bounded context management">
      <div className="palette-title">Bounded Contexts</div>

      {entries.map((entry) => (
        <div key={entry.id} className="slice-item">
          <div className="slice-item-header">
            {editingId === entry.id ? (
              <input
                className="slice-name-input"
                value={editingName}
                autoFocus
                onChange={(e) => setEditingName(e.target.value)}
                onBlur={commitEditing}
                onKeyDown={(e) => { if (e.key === 'Enter') commitEditing(); }}
                aria-label="Bounded context name"
              />
            ) : (
              <button
                className="slice-name"
                onClick={() => startEditing(entry.id, entry.name)}
                title="Click to rename"
                aria-label={`Rename bounded context ${entry.name}`}
              >
                {entry.name}
              </button>
            )}
            <div className="slice-item-actions">
              <button
                className="slice-action-btn slice-action-btn--delete"
                onClick={() => deleteBoundedContext(entry.id)}
                title="Delete bounded context"
                aria-label={`Delete bounded context ${entry.name}`}
              >
                ×
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="bc-create-row">
        <input
          className="slice-name-input"
          placeholder="New bounded context…"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleCreate(); }}
          aria-label="New bounded context name"
        />
        <button
          className="slice-action-btn"
          onClick={handleCreate}
          disabled={!newName.trim()}
          aria-label="Create bounded context"
        >
          ＋
        </button>
      </div>
    </aside>
  );
}
