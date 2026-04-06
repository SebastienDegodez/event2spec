import { SwimlaneCollection } from '../../../domain/SwimlaneCollection';
import { Swimlane } from '../../../domain/Swimlane';
import { AddSwimlaneCommand } from './AddSwimlaneCommand';

export class AddSwimlaneCommandHandler {
  handle(collection: SwimlaneCollection, command: AddSwimlaneCommand): SwimlaneCollection {
    const swimlane = Swimlane.create(command.id, command.actorName, command.actorType);
    return collection.add(swimlane);
  }
}
