import { GridPosition } from './GridPosition';

export abstract class BoardNode {
  readonly id: string;
  readonly label: string;
  private readonly position: GridPosition;

  protected constructor(id: string, label: string, position: GridPosition) {
    this.id = id;
    this.label = label;
    this.position = position;
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

  shouldShiftWhenInserted(incoming: BoardNode): boolean {
    return this.occupiesSameRowAtOrBeyond(incoming.gridPosition());
  }

  abstract shiftRight(): BoardNode;

  abstract withLabel(label: string): BoardNode;

  abstract moveTo(position: GridPosition): BoardNode;
}
