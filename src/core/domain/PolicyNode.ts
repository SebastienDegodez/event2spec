import { BoardNode } from './BoardNode';
import type { BoardNodeVisitor } from './BoardNodeVisitor';
import { GridPosition } from './GridPosition';

export class PolicyNode extends BoardNode {
  constructor(id: string, label: string, position: GridPosition) {
    super(id, label, position);
  }

  static create(id: string, label: string, column: number, row: number): PolicyNode {
    return new PolicyNode(id, label, new GridPosition(column, row));
  }

  accept(visitor: BoardNodeVisitor): void {
    const position = this.gridPosition();
    visitor.visitPolicyNode(this.id, this.label, position.column, position.row);
  }

  shiftRight(): PolicyNode {
    return new PolicyNode(this.id, this.label, this.gridPosition().shiftRight());
  }

  withLabel(label: string): PolicyNode {
    return new PolicyNode(this.id, label, this.gridPosition());
  }

  moveTo(position: GridPosition): PolicyNode {
    return new PolicyNode(this.id, this.label, position);
  }
}
