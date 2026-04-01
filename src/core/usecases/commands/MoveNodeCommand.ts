export class MoveNodeCommand {
  readonly id: string;
  readonly column: number;
  readonly row: number;

  constructor(id: string, column: number, row: number) {
    this.id = id;
    this.column = column;
    this.row = row;
  }
}
