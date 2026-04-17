export class CreateSliceCommand {
  readonly id: string;
  readonly name: string;
  readonly commandId: string;
  readonly eventIds: string[];
  readonly readModelId: string;
  readonly startColumn: number;
  readonly columnCount: number;

  constructor(id: string, name: string, commandId: string, eventIds: string[], readModelId: string, startColumn: number, columnCount: number) {
    this.id = id;
    this.name = name;
    this.commandId = commandId;
    this.eventIds = eventIds;
    this.readModelId = readModelId;
    this.startColumn = startColumn;
    this.columnCount = columnCount;
  }
}
