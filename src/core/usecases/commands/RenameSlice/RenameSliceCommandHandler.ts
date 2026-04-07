import { type VerticalSliceRepository } from '../../../domain/VerticalSliceRepository';
import { RenameSliceCommand } from './RenameSliceCommand';

export class RenameSliceCommandHandler {
  private readonly repository: VerticalSliceRepository;

  constructor(repository: VerticalSliceRepository) {
    this.repository = repository;
  }

  handle(command: RenameSliceCommand): void {
    const collection = this.repository.load();
    this.repository.save(collection.rename(command.id, command.name));
  }
}
