import { memo } from 'react';
import type { NodeProps } from '@xyflow/react';

export type BoundedContextInsertNodeData = {
  onCreate: () => void;
};

export const BoundedContextInsertNode = memo(({ data }: NodeProps) => {
  const nodeData = data as BoundedContextInsertNodeData;

  return (
    <div className="bounded-context-insert">
      <div className="bounded-context-insert-line" />
      <button
        type="button"
        className="bounded-context-insert-button"
        data-testid="bounded-context-insert-button"
        aria-label="Insert bounded context"
        onClick={nodeData.onCreate}
      >
        +
      </button>
    </div>
  );
});

BoundedContextInsertNode.displayName = 'BoundedContextInsertNode';
