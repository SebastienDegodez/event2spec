import { SwimlaneCollection } from '../../../domain/SwimlaneCollection';
import { ReorderSwimlanesCommand } from './ReorderSwimlanesCommand';

export class ReorderSwimlanesCommandHandler {
  handle(collection: SwimlaneCollection, command: ReorderSwimlanesCommand): SwimlaneCollection {
    return collection.reorder(command.id, command.targetIndex);
  }
}
