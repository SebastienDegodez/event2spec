import { memo, useCallback } from 'react';
import { Handle, Position, useReactFlow, type NodeProps } from '@xyflow/react';
import { useBoardActions } from '../../../core/store/useBoardStore';
import { useNodeValidationWarning } from '../../hooks/useNodeValidationWarning';
import { useNodeInlineEditing } from '../../hooks/useNodeInlineEditing';
import { ValidationBadge } from '../Validation/ValidationBadge';

export type PolicyNodeData = {
  label: string;
  column: number;
  row: number;
};

export const PolicyNodeComponent = memo(({ id, data, selected }: NodeProps) => {
  const nodeData = data as PolicyNodeData;
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
      className={`policy-node${selected ? ' selected' : ''}`}
      data-id={id}
      data-column={nodeData.column}
      data-row={nodeData.row}
    >
      <Handle type="target" id="bottom" position={Position.Bottom} className="policy-handle" />

      <div className="note-fold policy-fold" />

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

      <div className="note-type-badge">Policy</div>

      <button
        className="note-delete"
        onClick={handleDelete}
        title="Remove policy"
        aria-label="Remove policy"
      >
        ×
      </button>

      {warningType && <ValidationBadge warningType={warningType} />}

      <Handle type="source" id="right" position={Position.Right} className="policy-handle" />
    </div>
  );
});

PolicyNodeComponent.displayName = 'PolicyNodeComponent';
