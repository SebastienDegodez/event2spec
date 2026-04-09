import { BoardNode } from './BoardNode';
import type { BoardProjection } from './BoardProjection';
import { GridPosition } from './GridPosition';

export class DomainEventNode extends BoardNode {
  readonly boundedContextId: string | undefined;

  constructor(id: string, label: string, position: GridPosition, boundedContextId?: string) {
    super(id, label, position);
    this.boundedContextId = boundedContextId;
  }

  static create(
    id: string,
    label: string,
    column: number,
    row: number,
    boundedContextId?: string
  ): DomainEventNode {
    return new DomainEventNode(id, label, new GridPosition(column, row), boundedContextId);
  }

  describeTo(projection: BoardProjection): void {
    const position = this.gridPosition();
    projection.onDomainEventNode(
      this.id,
      this.label,
      position.column,
      position.row,
      this.boundedContextId
    );
  }

  shiftRight(): DomainEventNode {
    return new DomainEventNode(
      this.id,
      this.label,
      this.gridPosition().shiftRight(),
      this.boundedContextId
    );
  }

  withLabel(label: string): DomainEventNode {
    return new DomainEventNode(this.id, label, this.gridPosition(), this.boundedContextId);
  }

  moveTo(position: GridPosition): DomainEventNode {
    return new DomainEventNode(this.id, this.label, position, this.boundedContextId);
  }
}
