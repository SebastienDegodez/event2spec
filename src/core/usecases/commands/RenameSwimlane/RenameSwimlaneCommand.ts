export class RenameSwimlaneCommand {
  readonly id: string;
  readonly actorName: string;

  constructor(id: string, actorName: string) {
    this.id = id;
    this.actorName = actorName;
  }
}
