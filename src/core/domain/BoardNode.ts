import type { BoardNodeVisitor } from './BoardNodeVisitor';
import { GridPosition } from './GridPosition';

export abstract class BoardNode {
  protected readonly id: string;
  protected readonly label: string;
  private readonly position: GridPosition;

  protected constructor(id: string, label: string, position: GridPosition) {
    this.id = id;
    this.label = label;
    this.position = position;
  }

  hasId(targetId: string): boolean {
    return this.id === targetId;
  }

  isAt(position: GridPosition): boolean {
    return this.position.equals(position);
  }

  protected gridPosition(): GridPosition {
    return this.position;
  }

  occupiesSameRowAtOrBeyond(position: GridPosition): boolean {
    return this.position.isSameRowAndAtOrBeyond(position);
  }

  shouldShiftWhenInserted(incoming: BoardNode): boolean {
    return this.occupiesSameRowAtOrBeyond(incoming.gridPosition());
  }

  abstract accept(visitor: BoardNodeVisitor): void;

  abstract shiftRight(): BoardNode;

  abstract withLabel(label: string): BoardNode;

  abstract moveTo(position: GridPosition): BoardNode;
}
