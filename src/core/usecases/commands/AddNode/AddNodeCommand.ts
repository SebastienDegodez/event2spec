export class AddNodeCommand {
  readonly id: string;
  readonly label: string;
  readonly column: number;
  readonly row: number;

  constructor(id: string, label: string, column: number, row: number) {
    this.id = id;
    this.label = label;
    this.column = column;
    this.row = row;
  }
}
