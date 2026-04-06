import { type SwimlaneRepository } from '../../../domain/SwimlaneRepository';
import { RemoveSwimlaneCommand } from './RemoveSwimlaneCommand';

export class RemoveSwimlaneCommandHandler {
  private readonly repository: SwimlaneRepository;

  constructor(repository: SwimlaneRepository) {
    this.repository = repository;
  }

  handle(command: RemoveSwimlaneCommand): void {
    const collection = this.repository.load();
    this.repository.save(collection.remove(command.id));
  }
}
