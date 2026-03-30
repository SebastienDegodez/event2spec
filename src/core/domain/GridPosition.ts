/**
 * Value object wrapping a discrete grid position.
 * OC Rule 3: Wraps column/row primitives.
 * OC Rule 8: Two instance variables maximum.
 */
export class GridPosition {
  readonly column: number;
  readonly row: number;

  constructor(column: number, row: number) {
    this.column = column;
    this.row = row;
  }

  equals(other: GridPosition): boolean {
    return this.column === other.column && this.row === other.row;
  }

  /**
   * Returns true when this existing node position must shift right
   * because a new node is being inserted at `target`.
   * Shift is needed when we are in the same row AND our column >= target's column.
   */
  isSameRowAndAtOrBeyond(target: GridPosition): boolean {
    return this.row === target.row && this.column >= target.column;
  }

  /** Returns a new GridPosition one column to the right. */
  shiftRight(): GridPosition {
    return new GridPosition(this.column + 1, this.row);
  }
}
