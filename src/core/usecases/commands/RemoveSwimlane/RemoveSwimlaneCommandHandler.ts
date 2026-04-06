import { SwimlaneCollection } from '../../../domain/SwimlaneCollection';
import { RemoveSwimlaneCommand } from './RemoveSwimlaneCommand';

export class RemoveSwimlaneCommandHandler {
  handle(collection: SwimlaneCollection, command: RemoveSwimlaneCommand): SwimlaneCollection {
    return collection.remove(command.id);
  }
}
