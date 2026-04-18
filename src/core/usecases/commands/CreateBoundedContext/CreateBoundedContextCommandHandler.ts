import { BoundedContext } from '../../../domain/bounded-context/BoundedContext';
import { type BoundedContextRepository } from '../../../domain/bounded-context/BoundedContextRepository';
import { type CreateBoundedContextCommand } from './CreateBoundedContextCommand';

export class CreateBoundedContextCommandHandler {
  private readonly repository: BoundedContextRepository;

  constructor(repository: BoundedContextRepository) {
    this.repository = repository;
  }

  handle(command: CreateBoundedContextCommand): void {
    const collection = this.repository.load();
    const context = BoundedContext.create(command.id, command.name);
    if (command.insertIndex === undefined) {
      this.repository.save(collection.add(context));
      return;
    }
    this.repository.save(collection.addAt(context, command.insertIndex));
  }
}
