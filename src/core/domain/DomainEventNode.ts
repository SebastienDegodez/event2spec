import { GridPosition } from './GridPosition';

export type DomainEventViewData = {
  readonly id: string;
  readonly label: string;
  readonly column: number;
  readonly row: number;
};

export class DomainEventNode {
  readonly id: string;
  readonly label: string;
  private readonly position: GridPosition;

  constructor(id: string, label: string, position: GridPosition) {
    this.id = id;
    this.label = label;
    this.position = position;
  }

  isAt(position: GridPosition): boolean {
    return this.position.equals(position);
  }

  shouldShiftWhenInserted(incoming: DomainEventNode): boolean {
    return this.position.isSameRowAndAtOrBeyond(incoming.position);
  }

  toViewData(): DomainEventViewData {
    return {
      id: this.id,
      label: this.label,
      column: this.position.column,
      row: this.position.row,
    };
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
