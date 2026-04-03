export class AddCommandNodeCommand {
  readonly id: string;
  readonly label: string;
  readonly column: number;
  readonly row: number;
  readonly linkedEventId: string;

  constructor(id: string, label: string, column: number, row: number, linkedEventId: string) {
    this.id = id;
    this.label = label;
    this.column = column;
    this.row = row;
    this.linkedEventId = linkedEventId;
  }
}
