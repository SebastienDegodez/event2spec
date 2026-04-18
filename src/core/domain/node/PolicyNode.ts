import { BoardNode } from '../board/BoardNode';
import type { BoardProjection } from '../board/BoardProjection';
import { GridPosition } from '../board/GridPosition';

export class PolicyNode extends BoardNode {
  constructor(id: string, label: string, position: GridPosition) {
    super(id, label, position);
  }

  static create(id: string, label: string, column: number, row: number): PolicyNode {
    return new PolicyNode(id, label, new GridPosition(column, row));
  }

  describeTo(projection: BoardProjection): void {
    const position = this.gridPosition();
    projection.onPolicyNode(this.id, this.label, position.column, position.row);
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
