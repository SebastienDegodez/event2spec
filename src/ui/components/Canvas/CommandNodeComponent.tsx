import { memo, useCallback, useState } from 'react';
import { Handle, Position, useReactFlow, type NodeProps } from '@xyflow/react';
import { useBoardActions } from '../../../core/store/useBoardStore';

export type CommandNodeData = {
  label: string;
  column: number;
  row: number;
};

export const CommandNodeComponent = memo(({ id, data, selected }: NodeProps) => {
  const nodeData = data as CommandNodeData;
  const { updateLabel, removeNode } = useBoardActions();
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

  const handleLabelClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setDraft(nodeData.label);
      setEditing(true);
    },
    [nodeData.label]
  );

  return (
    <div
      className={`command-node${selected ? ' selected' : ''}${editing ? ' editing' : ''}`}
      data-id={id}
      data-column={nodeData.column}
      data-row={nodeData.row}
    >
      <Handle type="target" position={Position.Left} className="command-handle" />

      <div className="note-fold command-fold" />

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
          <span
            className="note-label"
            onClick={handleLabelClick}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {nodeData.label}
          </span>
        )}
      </div>

      <div className="note-type-badge">Command</div>

      <button
        className="note-delete"
        onClick={handleDelete}
        title="Remove command"
        aria-label="Remove command"
      >
        ×
      </button>

      <Handle type="source" position={Position.Bottom} className="command-handle" />
    </div>
  );
});

CommandNodeComponent.displayName = 'CommandNodeComponent';
