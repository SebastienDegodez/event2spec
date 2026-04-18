import { type BoundedContextRepository } from '../../../domain/bounded-context/BoundedContextRepository';
import { type RenameBoundedContextCommand } from './RenameBoundedContextCommand';

export class RenameBoundedContextCommandHandler {
  private readonly repository: BoundedContextRepository;

  constructor(repository: BoundedContextRepository) {
    this.repository = repository;
  }

  handle(command: RenameBoundedContextCommand): void {
    const collection = this.repository.load();
    this.repository.save(collection.rename(command.id, command.name));
  }
}
