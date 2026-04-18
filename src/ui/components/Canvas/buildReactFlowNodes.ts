import { type Node } from '@xyflow/react';
import { cellNodeOptions } from '../../../core/domain/CellNodeOptions';
import { domainNodeToPixelPosition } from './gridConstants';

interface ViewportCell {
  column: number;
  row: number;
}

export function buildReactFlowNodes(
  actualNodes: Node[],
  viewportCells: ReadonlyArray<ViewportCell>,
  noteSize: number,
): Node[] {
  const result: Node[] = [...actualNodes];

  for (const { column, row } of viewportCells) {
    const options = cellNodeOptions(row);
    const position = domainNodeToPixelPosition({ column, row });
    result.push({
      id: `quick-add-${column}-${row}`,
      type: 'cellQuickAdd',
      position,
      data: { column, row, options },
      style: { width: noteSize, height: noteSize },
      draggable: false,
      selectable: false,
      focusable: false,
    });
  }

  return result;
}
