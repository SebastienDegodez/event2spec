import { GridPosition } from './GridPosition';

export class DomainEventNode {
  readonly id: string;
  readonly label: string;
  readonly position: GridPosition;

  constructor(id: string, label: string, position: GridPosition) {
    this.id = id;
    this.label = label;
    this.position = position;
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
