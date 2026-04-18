import { memo, useCallback } from 'react';
import { Handle, Position, useReactFlow, type NodeProps } from '@xyflow/react';
import { useBoardActions } from '../../../core/store/useBoardStore';
import { useNodeValidationWarning } from '../../hooks/useNodeValidationWarning';
import { useNodeInlineEditing } from '../../hooks/useNodeInlineEditing';
import { ValidationBadge } from '../Validation/ValidationBadge';

export type CommandNodeData = {
  label: string;
  column: number;
  row: number;
};

export const CommandNodeComponent = memo(({ id, data, selected }: NodeProps) => {
  const nodeData = data as CommandNodeData;
  const { updateLabel, removeNode } = useBoardActions();
  const warningType = useNodeValidationWarning(id);
  const { editing, draft, setDraft, commitEdit, cancelEdit } = useNodeInlineEditing({
    id,
    label: nodeData.label,
    updateLabel,
  });
  const { deleteElements } = useReactFlow();

  const handleDelete = useCallback(() => {
    removeNode(id);
    deleteElements({ nodes: [{ id }] });
  }, [id, removeNode, deleteElements]);

  return (
    <div
      className={`command-node${selected ? ' selected' : ''}`}
      data-id={id}
      data-column={nodeData.column}
      data-row={nodeData.row}
    >
      <Handle type="target" id="top"  position={Position.Top}  className="command-handle" />
      <Handle type="target" id="left" position={Position.Left} className="command-handle" />

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
                cancelEdit();
              }
            }}
          />
        ) : (
          <span className="note-label">{nodeData.label}</span>
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

      {warningType && <ValidationBadge warningType={warningType} />}

      <Handle type="source" id="bottom" position={Position.Bottom} className="command-handle" />
    </div>
  );
});

CommandNodeComponent.displayName = 'CommandNodeComponent';
