import { SwimlaneCollection } from '../../../domain/SwimlaneCollection';
import { RenameSwimlaneCommand } from './RenameSwimlaneCommand';

export class RenameSwimlaneCommandHandler {
  handle(collection: SwimlaneCollection, command: RenameSwimlaneCommand): SwimlaneCollection {
    return collection.rename(command.id, command.actorName);
  }
}
