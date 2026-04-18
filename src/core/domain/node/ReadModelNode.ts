import { BoardNode } from '../board/BoardNode';
import type { BoardProjection } from '../board/BoardProjection';
import { GridPosition } from '../board/GridPosition';

export class ReadModelNode extends BoardNode {
  constructor(id: string, label: string, position: GridPosition) {
    super(id, label, position);
  }

  static create(id: string, label: string, column: number, row: number): ReadModelNode {
    return new ReadModelNode(id, label, new GridPosition(column, row));
  }

  describeTo(projection: BoardProjection): void {
    const position = this.gridPosition();
    projection.onReadModelNode(this.id, this.label, position.column, position.row);
  }

  shiftRight(): ReadModelNode {
    return new ReadModelNode(this.id, this.label, this.gridPosition().shiftRight());
  }

  withLabel(label: string): ReadModelNode {
    return new ReadModelNode(this.id, label, this.gridPosition());
  }

  moveTo(position: GridPosition): ReadModelNode {
    return new ReadModelNode(this.id, this.label, position);
  }
}
