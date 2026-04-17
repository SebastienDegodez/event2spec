import { type VerticalSliceRepository } from '../../../domain/VerticalSliceRepository';
import { ExtendSliceRightCommand } from './ExtendSliceRightCommand';

export class ExtendSliceRightCommandHandler {
  private readonly repository: VerticalSliceRepository;

  constructor(repository: VerticalSliceRepository) {
    this.repository = repository;
  }

  handle(command: ExtendSliceRightCommand): void {
    const collection = this.repository.load();
    this.repository.save(collection.extendSliceRight(command.sliceId));
  }
}
