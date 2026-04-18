import { type Node } from '@xyflow/react';
import { type BoardProjection } from '../../../core/domain/BoardProjection';

interface BoardLike {
  describeTo(projection: BoardProjection): void;
}

interface BoundedContextRowLike {
  index: number;
}

interface BuildBoardRenderDataOptions {
  board: BoardLike;
  boundedContextRowBackgroundNodes: Node[];
  boundedContextRows: BoundedContextRowLike[];
  fixedRows: readonly number[];
  noteSize: number;
  positionFor: (input: { column: number; row: number }) => { x: number; y: number };
}

export interface BoardRenderData {
  actualNodes: Node[];
  occupiedCells: Set<string>;
  rowsToRender: number[];
}

export function buildBoardRenderData({
  board,
  boundedContextRowBackgroundNodes,
  boundedContextRows,
  fixedRows,
  noteSize,
  positionFor,
}: BuildBoardRenderDataOptions): BoardRenderData {
  const actualNodes: Node[] = [...boundedContextRowBackgroundNodes];
  const occupiedCells = new Set<string>();

  const createFlowNode = (
    id: string,
    label: string,
    column: number,
    row: number,
    type: 'domainEvent' | 'command' | 'readModel' | 'policy' | 'uiScreen',
  ) => {
    const position = positionFor({ column, row });
    actualNodes.push({ id, type, position, data: { label, column, row }, style: { width: noteSize, height: noteSize } });
    occupiedCells.add(`${column},${row}`);
  };

  const projection: BoardProjection = {
    onDomainEventNode(id, label, column, row) { createFlowNode(id, label, column, row, 'domainEvent'); },
    onCommandNode(id, label, column, row) { createFlowNode(id, label, column, row, 'command'); },
    onReadModelNode(id, label, column, row) { createFlowNode(id, label, column, row, 'readModel'); },
    onPolicyNode(id, label, column, row) { createFlowNode(id, label, column, row, 'policy'); },
    onUIScreenNode(id, label, column, row) { createFlowNode(id, label, column, row, 'uiScreen'); },
  };
  board.describeTo(projection);

  const boundedContextRowIndexes = boundedContextRows.map((entry) => 2 + entry.index);
  const rowsToRender = [...fixedRows, ...boundedContextRowIndexes];

  return { actualNodes, occupiedCells, rowsToRender };
}