import { Swimlane } from '../../../domain/Swimlane';
import { AddSwimlaneCommand } from './AddSwimlaneCommand';

export class AddSwimlaneCommandHandler {
  handle(command: AddSwimlaneCommand): Swimlane {
    return Swimlane.create(command.id, command.actorName, command.actorType);
  }
}
