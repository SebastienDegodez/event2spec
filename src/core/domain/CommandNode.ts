import { BoardNode } from './BoardNode';
import type { BoardNodeVisitor } from './BoardNodeVisitor';
import { GridPosition } from './GridPosition';

export class CommandNode extends BoardNode {
  constructor(id: string, label: string, position: GridPosition) {
    super(id, label, position);
  }

  static create(id: string, label: string, column: number, row: number): CommandNode {
    return new CommandNode(id, label, new GridPosition(column, row));
  }

  accept(visitor: BoardNodeVisitor): void {
    const position = this.gridPosition();
    visitor.visitCommandNode(this.id, this.label, position.column, position.row);
  }

  shiftRight(): CommandNode {
    return new CommandNode(this.id, this.label, this.gridPosition().shiftRight());
  }

  withLabel(label: string): CommandNode {
    return new CommandNode(this.id, label, this.gridPosition());
  }

  moveTo(position: GridPosition): CommandNode {
    return new CommandNode(this.id, this.label, position);
  }
}
