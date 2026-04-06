import { type SwimlaneRepository } from '../../../domain/SwimlaneRepository';
import { RenameSwimlaneCommand } from './RenameSwimlaneCommand';

export class RenameSwimlaneCommandHandler {
  private readonly repository: SwimlaneRepository;

  constructor(repository: SwimlaneRepository) {
    this.repository = repository;
  }

  handle(command: RenameSwimlaneCommand): void {
    const collection = this.repository.load();
    this.repository.save(collection.rename(command.id, command.actorName));
  }
}
