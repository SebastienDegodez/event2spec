export class GridPosition {
  readonly column: number;
  readonly row: number;

  constructor(column: number, row: number) {
    this.column = column;
    this.row = row;
  }

  isSameRowAndAtOrBeyond(target: GridPosition): boolean {
    return this.row === target.row && this.column >= target.column;
  }

  shiftRight(): GridPosition {
    return new GridPosition(this.column + 1, this.row);
  }
}
