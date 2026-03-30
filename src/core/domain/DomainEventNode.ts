import { GridPosition } from './GridPosition';

/**
 * Domain entity representing a Domain Event sticky note on the board.
 * OC Rule 3: Uses GridPosition instead of raw col/row primitives.
 * OC Rule 8: Two instance variables (label + position). id is identity only.
 */
export class DomainEventNode {
  readonly id: string;
  readonly label: string;
  readonly position: GridPosition;

  constructor(id: string, label: string, position: GridPosition) {
    this.id = id;
    this.label = label;
    this.position = position;
  }

  /** Returns a new node placed one column to the right. */
  shiftRight(): DomainEventNode {
    return new DomainEventNode(this.id, this.label, this.position.shiftRight());
  }

  /** Returns a new node with the given label. */
  withLabel(label: string): DomainEventNode {
    return new DomainEventNode(this.id, label, this.position);
  }

  /** Returns a new node moved to the given position. */
  moveTo(position: GridPosition): DomainEventNode {
    return new DomainEventNode(this.id, this.label, position);
  }
}
