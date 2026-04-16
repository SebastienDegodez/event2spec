export class CreateBoundedContextCommand {
  readonly id: string;
  readonly name: string;
  readonly insertIndex?: number;

  constructor(id: string, name: string, insertIndex?: number) {
    this.id = id;
    this.name = name;
    this.insertIndex = insertIndex;
  }
}
