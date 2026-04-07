import { memo, useCallback, useState } from 'react';
import { Handle, Position, useReactFlow, type NodeProps } from '@xyflow/react';
import { useBoardActions } from '../../../core/store/useBoardStore';

export type DomainEventNodeData = {
  label: string;
  column: number;
  row: number;
};

export const DomainEventNode = memo(({ id, data, selected }: NodeProps) => {
  const nodeData = data as DomainEventNodeData;
  const { updateLabel, removeNode, addCommandNode } = useBoardActions();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(nodeData.label);
  const { deleteElements } = useReactFlow();

  const commitEdit = useCallback(() => {
    const trimmed = draft.trim();
    if (trimmed) updateLabel(id, trimmed);
    else setDraft(nodeData.label);
    setEditing(false);
  }, [draft, id, updateLabel, nodeData.label]);

  const handleDelete = useCallback(() => {
    removeNode(id);
    deleteElements({ nodes: [{ id }] });
  }, [id, removeNode, deleteElements]);

  const handleAddCommand = useCallback(() => {
    const commandId = `command-${crypto.randomUUID()}`;
    addCommandNode(commandId, 'Command', nodeData.column, nodeData.row - 1, id);
  }, [addCommandNode, id, nodeData.column, nodeData.row]);

  return (
    <div
      className={`domain-event-node${selected ? ' selected' : ''}${editing ? ' editing' : ''}`}
      data-id={id}
      data-column={nodeData.column}
      data-row={nodeData.row}
      onDoubleClick={(e) => {
        e.stopPropagation();
        setDraft(nodeData.label);
        setEditing(true);
      }}
    >
      <Handle type="target" position={Position.Top} className="event-handle" />

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
                setDraft(nodeData.label);
                setEditing(false);
              }
            }}
          />
        ) : (
          <span className="note-label">{nodeData.label}</span>
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

      <button
        className="note-add-command"
        onClick={handleAddCommand}
        title="Add command"
        aria-label="Add command"
      >
        +
      </button>

      <Handle type="source" position={Position.Right} className="event-handle" />
    </div>
  );
});

DomainEventNode.displayName = 'DomainEventNode';
