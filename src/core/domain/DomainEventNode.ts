import { BoardNode } from './BoardNode';
import type { BoardNodeVisitor } from './BoardNodeVisitor';
import { GridPosition } from './GridPosition';

export class DomainEventNode extends BoardNode {
  constructor(id: string, label: string, position: GridPosition) {
    super(id, label, position);
  }

  static create(id: string, label: string, column: number, row: number): DomainEventNode {
    return new DomainEventNode(id, label, new GridPosition(column, row));
  }

  accept(visitor: BoardNodeVisitor): void {
    const position = this.gridPosition();
    visitor.visitDomainEventNode(this.id, this.label, position.column, position.row);
  }

  shiftRight(): DomainEventNode {
    return new DomainEventNode(this.id, this.label, this.gridPosition().shiftRight());
  }

  withLabel(label: string): DomainEventNode {
    return new DomainEventNode(this.id, label, this.gridPosition());
  }

  moveTo(position: GridPosition): DomainEventNode {
    return new DomainEventNode(this.id, this.label, position);
  }
}
