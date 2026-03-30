/**
 * Value object wrapping a discrete grid position.
 * OC Rule 3: Wraps col/row primitives.
 * OC Rule 8: Two instance variables maximum.
 */
export class GridPosition {
  readonly col: number;
  readonly row: number;

  constructor(col: number, row: number) {
    this.col = col;
    this.row = row;
  }

  equals(other: GridPosition): boolean {
    return this.col === other.col && this.row === other.row;
  }

  /**
   * Returns true when this existing node position must shift right
   * because a new node is being inserted at `target`.
   * Shift is needed when we are in the same row AND our column >= target's column.
   */
  isSameRowAndAtOrBeyond(target: GridPosition): boolean {
    return this.row === target.row && this.col >= target.col;
  }

  /** Returns a new GridPosition one column to the right. */
  shiftRight(): GridPosition {
    return new GridPosition(this.col + 1, this.row);
  }
}
