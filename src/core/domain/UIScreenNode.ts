import { BoardNode } from './BoardNode';
import type { BoardNodeVisitor } from './BoardNodeVisitor';
import { GridPosition } from './GridPosition';

export class UIScreenNode extends BoardNode {
  constructor(id: string, label: string, position: GridPosition) {
    super(id, label, position);
  }

  static create(id: string, label: string, column: number, row: number): UIScreenNode {
    return new UIScreenNode(id, label, new GridPosition(column, row));
  }

  accept(visitor: BoardNodeVisitor): void {
    const position = this.gridPosition();
    visitor.visitUIScreenNode(this.id, this.label, position.column, position.row);
  }

  shiftRight(): UIScreenNode {
    return new UIScreenNode(this.id, this.label, this.gridPosition().shiftRight());
  }

  withLabel(label: string): UIScreenNode {
    return new UIScreenNode(this.id, label, this.gridPosition());
  }

  moveTo(position: GridPosition): UIScreenNode {
    return new UIScreenNode(this.id, this.label, position);
  }
}
