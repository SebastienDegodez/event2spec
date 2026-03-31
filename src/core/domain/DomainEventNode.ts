import { GridPosition } from './GridPosition';

export class DomainEventNode {
  readonly id: string;
  readonly label: string;
  private readonly position: GridPosition;

  constructor(id: string, label: string, position: GridPosition) {
    this.id = id;
    this.label = label;
    this.position = position;
  }

  static create(id: string, label: string, column: number, row: number): DomainEventNode {
    return new DomainEventNode(id, label, new GridPosition(column, row));
  }

  isAt(position: GridPosition): boolean {
    return this.position.equals(position);
  }

  gridPosition(): GridPosition {
    return this.position;
  }

  occupiesSameRowAtOrBeyond(position: GridPosition): boolean {
    return this.position.isSameRowAndAtOrBeyond(position);
  }

  shouldShiftWhenInserted(incoming: DomainEventNode): boolean {
    return this.occupiesSameRowAtOrBeyond(incoming.gridPosition());
  }

  shiftRight(): DomainEventNode {
    return new DomainEventNode(this.id, this.label, this.position.shiftRight());
  }

  withLabel(label: string): DomainEventNode {
    return new DomainEventNode(this.id, label, this.position);
  }

  moveTo(position: GridPosition): DomainEventNode {
    return new DomainEventNode(this.id, this.label, position);
  }
}
