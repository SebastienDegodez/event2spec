import { type SwimlaneRepository } from '../../../domain/SwimlaneRepository';
import { ChangeSwimlaneActorTypeCommand } from './ChangeSwimlaneActorTypeCommand';

export class ChangeSwimlaneActorTypeCommandHandler {
  private readonly repository: SwimlaneRepository;

  constructor(repository: SwimlaneRepository) {
    this.repository = repository;
  }

  handle(command: ChangeSwimlaneActorTypeCommand): void {
    const collection = this.repository.load();
    this.repository.save(collection.changeActorType(command.id, command.actorType));
  }
}
