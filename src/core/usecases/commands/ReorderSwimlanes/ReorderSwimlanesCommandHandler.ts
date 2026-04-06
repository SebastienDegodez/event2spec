import { type SwimlaneRepository } from '../../../domain/SwimlaneRepository';
import { ReorderSwimlanesCommand } from './ReorderSwimlanesCommand';

export class ReorderSwimlanesCommandHandler {
  private readonly repository: SwimlaneRepository;

  constructor(repository: SwimlaneRepository) {
    this.repository = repository;
  }

  handle(command: ReorderSwimlanesCommand): void {
    const collection = this.repository.load();
    this.repository.save(collection.reorder(command.id, command.targetIndex));
  }
}
