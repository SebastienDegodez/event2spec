import { memo, useCallback, useState } from 'react';
import { Handle, Position, useReactFlow, type NodeProps } from '@xyflow/react';
import { useBoardActions } from '../../../core/store/useBoardStore';
import { useNodeValidationWarning } from '../../hooks/useNodeValidationWarning';
import { useAutoEdit } from '../../hooks/useAutoEdit';
import { ValidationBadge } from '../Validation/ValidationBadge';

export type UIScreenNodeData = {
  label: string;
  column: number;
  row: number;
};

export const UIScreenNodeComponent = memo(({ id, data, selected }: NodeProps) => {
  const nodeData = data as UIScreenNodeData;
  const { updateLabel, removeNode } = useBoardActions();
  const warningType = useNodeValidationWarning(id);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(nodeData.label);
  const { deleteElements } = useReactFlow();

  const startEditing = useCallback(() => {
    setDraft(nodeData.label);
    setEditing(true);
  }, [nodeData.label]);

  useAutoEdit(id, startEditing);

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

  return (
    <div
      className={`ui-screen-node${selected ? ' selected' : ''}`}
      data-id={id}
      data-column={nodeData.column}
      data-row={nodeData.row}
    >
      <Handle type="target" position={Position.Left} className="ui-screen-handle" />

      <div className="note-fold ui-screen-fold" />

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

      <div className="note-type-badge">UI Screen</div>

      <button
        className="note-delete"
        onClick={handleDelete}
        title="Remove UI screen"
        aria-label="Remove UI screen"
      >
        ×
      </button>

      {warningType && <ValidationBadge warningType={warningType} />}

      <Handle type="source" position={Position.Right} className="ui-screen-handle" />
    </div>
  );
});

UIScreenNodeComponent.displayName = 'UIScreenNodeComponent';
