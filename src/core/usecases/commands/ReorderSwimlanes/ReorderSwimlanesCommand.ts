export class ReorderSwimlanesCommand {
  readonly id: string;
  readonly targetIndex: number;

  constructor(id: string, targetIndex: number) {
    this.id = id;
    this.targetIndex = targetIndex;
  }
}
