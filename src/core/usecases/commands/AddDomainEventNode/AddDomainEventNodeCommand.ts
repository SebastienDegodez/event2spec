export class AddDomainEventNodeCommand {
  readonly id: string;
  readonly label: string;
  readonly column: number;
  readonly row: number;
  readonly boundedContextId: string | undefined;

  constructor(id: string, label: string, column: number, row: number, boundedContextId?: string) {
    this.id = id;
    this.label = label;
    this.column = column;
    this.row = row;
    this.boundedContextId = boundedContextId;
  }
}
