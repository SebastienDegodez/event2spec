import { type ActorType } from '../../../domain/ActorType';

export class AddSwimlaneCommand {
  readonly id: string;
  readonly actorName: string;
  readonly actorType: ActorType;

  constructor(id: string, actorName: string, actorType: ActorType) {
    this.id = id;
    this.actorName = actorName;
    this.actorType = actorType;
  }
}
