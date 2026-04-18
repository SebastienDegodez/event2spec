import { type Node } from '@xyflow/react';
import { type BoardProjection } from '../../../core/domain/BoardProjection';
import { type BoundedContextProjection } from '../../../core/domain/bounded-context/BoundedContextProjection';
import { type SwimlaneColor } from '../../../core/domain/SwimlaneColor';
import { type BoundedContextRowBackgroundNodeData } from './BoundedContextRowBackgroundNode';
import { type FixedRowLabelEntry } from './FixedRowLabelColumn';

interface BoardLike {
  describeTo(projection: BoardProjection): void;
}

interface BoundedContextsLike {
  describeTo(projection: BoundedContextProjection): void;
}

interface BuildBoundedContextRowRenderDataOptions {
  board: BoardLike;
  boundedContexts: BoundedContextsLike;
  rowColors: readonly SwimlaneColor[];
  rowBackgroundOffsetX: number;
  gridSize: number;
}

export interface BoundedContextRowRenderData {
  bgNodes: Node<BoundedContextRowBackgroundNodeData>[];
  rows: FixedRowLabelEntry[];
}

export function buildBoundedContextRowRenderData({
  board,
  boundedContexts,
  rowColors,
  rowBackgroundOffsetX,
  gridSize,
}: BuildBoundedContextRowRenderDataOptions): BoundedContextRowRenderData {
  const bgNodes: Node<BoundedContextRowBackgroundNodeData>[] = [];
  const rows: FixedRowLabelEntry[] = [];
  const domainEventCountByBoundedContextId = new Map<string, number>();

  const boardProjection: BoardProjection = {
    onDomainEventNode(_id, _label, _column, _row, boundedContextId) {
      if (!boundedContextId) return;
      domainEventCountByBoundedContextId.set(
        boundedContextId,
        (domainEventCountByBoundedContextId.get(boundedContextId) ?? 0) + 1,
      );
    },
    onCommandNode() {},
    onReadModelNode() {},
    onPolicyNode() {},
    onUIScreenNode() {},
  };
  board.describeTo(boardProjection);

  const projection: BoundedContextProjection = {
    onBoundedContext(id, name) {
      const index = rows.length;
      const row = 2 + index;
      const color = rowColors[index % rowColors.length];
      const domainEventCount = domainEventCountByBoundedContextId.get(id) ?? 0;

      bgNodes.push({
        id: `bounded-context-row-bg-${id}`,
        type: 'boundedContextRowBackground',
        position: { x: rowBackgroundOffsetX, y: row * gridSize },
        data: { name, color },
        style: { width: 20000, height: gridSize },
        draggable: false,
        selectable: false,
        focusable: false,
        zIndex: -1,
      });

      rows.push({ id, name, index, color, domainEventCount });
    },
  };
  boundedContexts.describeTo(projection);

  return { bgNodes, rows };
}