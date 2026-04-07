import { type VerticalSliceRepository } from '../../../domain/VerticalSliceRepository';
import { DeleteSliceCommand } from './DeleteSliceCommand';

export class DeleteSliceCommandHandler {
  private readonly repository: VerticalSliceRepository;

  constructor(repository: VerticalSliceRepository) {
    this.repository = repository;
  }

  handle(command: DeleteSliceCommand): void {
    const collection = this.repository.load();
    this.repository.save(collection.remove(command.id));
  }
}
