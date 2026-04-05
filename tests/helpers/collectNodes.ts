import { GridBoard } from '../../src/core/domain/GridBoard';
import { type BoardNodeVisitor } from '../../src/core/domain/BoardNodeVisitor';

export interface CollectedNode {
  id: string;
  label: string;
  column: number;
  row: number;
  type: 'domainEvent' | 'command' | 'readModel' | 'policy' | 'uiScreen';
}

export function collectNodes(board: GridBoard): CollectedNode[] {
  const nodes: CollectedNode[] = [];
  const visitor: BoardNodeVisitor = {
    visitDomainEventNode(id, label, column, row) {
      nodes.push({ id, label, column, row, type: 'domainEvent' });
    },
    visitCommandNode(id, label, column, row) {
      nodes.push({ id, label, column, row, type: 'command' });
    },
    visitReadModelNode(id, label, column, row) {
      nodes.push({ id, label, column, row, type: 'readModel' });
    },
    visitPolicyNode(id, label, column, row) {
      nodes.push({ id, label, column, row, type: 'policy' });
    },
    visitUIScreenNode(id, label, column, row) {
      nodes.push({ id, label, column, row, type: 'uiScreen' });
    },
  };
  board.accept(visitor);
  return nodes;
}
