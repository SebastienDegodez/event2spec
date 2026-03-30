import { memo, useCallback, useState } from 'react';
import { Handle, Position, useReactFlow, type NodeProps } from '@xyflow/react';
import { useBoardStore } from '../store/boardStore';

export type DomainEventNodeData = {
  label: string;
};

export const DomainEventNode = memo(({ id, data, selected }: NodeProps) => {
  const { updateLabel, removeEvent } = useBoardStore();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState((data as DomainEventNodeData).label);
  const { deleteElements } = useReactFlow();

  const commitEdit = useCallback(() => {
    const trimmed = draft.trim();
    if (trimmed) updateLabel(id, trimmed);
    else setDraft((data as DomainEventNodeData).label);
    setEditing(false);
  }, [draft, id, updateLabel, data]);

  const handleDelete = useCallback(() => {
    removeEvent(id);
    deleteElements({ nodes: [{ id }] });
  }, [id, removeEvent, deleteElements]);

  return (
    <div
      className={`domain-event-node${selected ? ' selected' : ''}`}
      onDoubleClick={() => {
        setDraft((data as DomainEventNodeData).label);
        setEditing(true);
      }}
    >
      <Handle type="target" position={Position.Left} className="event-handle" />

      <div className="note-fold" />

      <div className="note-content">
        {editing ? (
          <textarea
            autoFocus
            className="note-editor"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commitEdit}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                commitEdit();
              }
              if (e.key === 'Escape') {
                setDraft((data as DomainEventNodeData).label);
                setEditing(false);
              }
            }}
          />
        ) : (
          <span className="note-label">{(data as DomainEventNodeData).label}</span>
        )}
      </div>

      <div className="note-type-badge">Domain Event</div>

      <button
        className="note-delete"
        onClick={handleDelete}
        title="Remove event"
        aria-label="Remove event"
      >
        ×
      </button>

      <Handle type="source" position={Position.Right} className="event-handle" />
    </div>
  );
});

DomainEventNode.displayName = 'DomainEventNode';
