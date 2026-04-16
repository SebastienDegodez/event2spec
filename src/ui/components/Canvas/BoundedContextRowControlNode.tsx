import { memo, useCallback, useMemo, useState } from 'react';
import type { NodeProps } from '@xyflow/react';
import { ConfirmDeleteModal } from '../ConfirmDeleteModal';

export type BoundedContextRowControlNodeData = {
  id: string;
  name: string;
  color: string;
  hasDomainEvents: boolean;
  domainEventCount: number;
  isEditing: boolean;
  editingName: string;
  onStartRename: (id: string, currentName: string) => void;
  onChangeEditingName: (value: string) => void;
  onCommitRename: (id: string) => void;
  onCancelRename: () => void;
  onDelete: (id: string) => void;
};

const COLOR_TEXT: Record<string, string> = {
  yellow: 'rgba(253, 224, 71, 0.68)',
  blue: 'rgba(96, 165, 250, 0.68)',
  red: 'rgba(248, 113, 113, 0.68)',
  grey: 'rgba(156, 163, 175, 0.68)',
};

export const BoundedContextRowControlNode = memo(({ data }: NodeProps) => {
  const nodeData = data as BoundedContextRowControlNodeData;
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const textColor = COLOR_TEXT[nodeData.color] ?? COLOR_TEXT.grey;

  const triggerDelete = useCallback(() => {
    if (nodeData.domainEventCount === 0) {
      nodeData.onDelete(nodeData.id);
      return;
    }
    setIsConfirmOpen(true);
  }, [nodeData]);

  const confirmMessage = useMemo(() => {
    if (nodeData.domainEventCount === 0) {
      return 'Are you sure you want to delete this bounded context?';
    }
    const label = nodeData.domainEventCount > 1 ? 'domain events' : 'domain event';
    return `This bounded context contains ${nodeData.domainEventCount} ${label}. Deleting it will remove them.`;
  }, [nodeData.domainEventCount]);

  return (
    <>
      <div className="bounded-context-row-label-shell">
        {nodeData.isEditing ? (
          <input
            className="bounded-context-row-input"
            aria-label="Bounded context name"
            value={nodeData.editingName}
            autoFocus
            onChange={(event) => nodeData.onChangeEditingName(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                nodeData.onCommitRename(nodeData.id);
              }
              if (event.key === 'Escape') {
                event.preventDefault();
                nodeData.onCancelRename();
              }
            }}
          />
        ) : (
          <>
            <button
              type="button"
              data-testid="bounded-context-row-label"
              className="bounded-context-row-label"
              style={{ color: textColor }}
              onClick={() => nodeData.onStartRename(nodeData.id, nodeData.name)}
            >
              {nodeData.name}
            </button>
            <button
              type="button"
              data-testid="bounded-context-delete-button"
              className="bounded-context-row-delete"
              aria-label={`Delete bounded context ${nodeData.name}`}
              onClick={triggerDelete}
            >
              ×
            </button>
          </>
        )}
      </div>
      {isConfirmOpen ? (
        <ConfirmDeleteModal
          title="Delete bounded context"
          message={confirmMessage}
          confirmLabel="Delete"
          cancelLabel="Cancel"
          onCancel={() => setIsConfirmOpen(false)}
          onConfirm={() => {
            nodeData.onDelete(nodeData.id);
            setIsConfirmOpen(false);
          }}
        />
      ) : null}
    </>
  );
});

BoundedContextRowControlNode.displayName = 'BoundedContextRowControlNode';
