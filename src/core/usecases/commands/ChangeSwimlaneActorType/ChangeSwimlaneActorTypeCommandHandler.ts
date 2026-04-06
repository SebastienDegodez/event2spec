import { SwimlaneCollection } from '../../../domain/SwimlaneCollection';
import { ChangeSwimlaneActorTypeCommand } from './ChangeSwimlaneActorTypeCommand';

export class ChangeSwimlaneActorTypeCommandHandler {
  handle(collection: SwimlaneCollection, command: ChangeSwimlaneActorTypeCommand): SwimlaneCollection {
    return collection.changeActorType(command.id, command.actorType);
  }
}
