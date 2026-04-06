import { type SwimlaneRepository } from '../../../domain/SwimlaneRepository';
import { Swimlane } from '../../../domain/Swimlane';
import { AddSwimlaneCommand } from './AddSwimlaneCommand';

export class AddSwimlaneCommandHandler {
  private readonly repository: SwimlaneRepository;

  constructor(repository: SwimlaneRepository) {
    this.repository = repository;
  }

  handle(command: AddSwimlaneCommand): void {
    const collection = this.repository.load();
    const swimlane = Swimlane.create(command.id, command.actorName, command.actorType);
    this.repository.save(collection.add(swimlane));
  }
}
