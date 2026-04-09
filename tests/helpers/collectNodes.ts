import { GridBoard } from '../../src/core/domain/GridBoard';
import { type BoardProjection } from '../../src/core/domain/BoardProjection';

export interface CollectedNode {
  id: string;
  label: string;
  column: number;
  row: number;
  type: 'domainEvent' | 'command' | 'readModel' | 'policy' | 'uiScreen';
  boundedContextId?: string;
}

export function collectNodes(board: GridBoard): CollectedNode[] {
  const nodes: CollectedNode[] = [];
  const projection: BoardProjection = {
    onDomainEventNode(id, label, column, row, boundedContextId) {
      nodes.push({ id, label, column, row, type: 'domainEvent', boundedContextId });
    },
    onCommandNode(id, label, column, row) {
      nodes.push({ id, label, column, row, type: 'command' });
    },
    onReadModelNode(id, label, column, row) {
      nodes.push({ id, label, column, row, type: 'readModel' });
    },
    onPolicyNode(id, label, column, row) {
      nodes.push({ id, label, column, row, type: 'policy' });
    },
    onUIScreenNode(id, label, column, row) {
      nodes.push({ id, label, column, row, type: 'uiScreen' });
    },
  };
  board.describeTo(projection);
  return nodes;
}
