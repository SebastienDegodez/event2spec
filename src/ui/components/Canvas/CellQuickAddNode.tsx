import { memo, useCallback } from 'react';
import type { NodeProps } from '@xyflow/react';
import { type CellNodeOption } from '../../../core/domain/CellNodeOptions';
import { useBoardActions } from '../../../core/store/useBoardStore';

export type CellQuickAddNodeData = {
  column: number;
  row: number;
  options: readonly CellNodeOption[];
};

export const CellQuickAddNode = memo(({ data }: NodeProps) => {
  const nodeData = data as CellQuickAddNodeData;
  const { addNodeWithAutoLinks } = useBoardActions();

  const handleClick = useCallback(
    (opt: CellNodeOption) => {
      const id = `${opt.kind}-${crypto.randomUUID()}`;
      addNodeWithAutoLinks(id, opt.kind, opt.label, nodeData.column, nodeData.row);
    },
    [addNodeWithAutoLinks, nodeData.column, nodeData.row]
  );

  return (
    <div className="cell-quick-add" data-column={nodeData.column} data-row={nodeData.row}>
      {nodeData.options.map((opt) => (
        <button
          key={opt.kind}
          className="cell-quick-add-btn"
          style={{ borderColor: opt.color, color: opt.color }}
          onClick={() => handleClick(opt)}
          title={`Add ${opt.label}`}
          aria-label={`Add ${opt.label}`}
        >
          {opt.letter}
        </button>
      ))}
    </div>
  );
});

CellQuickAddNode.displayName = 'CellQuickAddNode';

