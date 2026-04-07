export class CreateSliceCommand {
  readonly id: string;
  readonly name: string;
  readonly commandId: string;
  readonly eventIds: string[];
  readonly readModelId: string;

  constructor(id: string, name: string, commandId: string, eventIds: string[], readModelId: string) {
    this.id = id;
    this.name = name;
    this.commandId = commandId;
    this.eventIds = eventIds;
    this.readModelId = readModelId;
  }
}
