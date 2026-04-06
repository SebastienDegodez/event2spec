import { type ActorType } from '../../../domain/ActorType';

export class ChangeSwimlaneActorTypeCommand {
  readonly id: string;
  readonly actorType: ActorType;

  constructor(id: string, actorType: ActorType) {
    this.id = id;
    this.actorType = actorType;
  }
}
