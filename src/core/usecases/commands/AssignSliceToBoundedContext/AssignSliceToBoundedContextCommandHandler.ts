import { type VerticalSliceRepository } from '../../../domain/vertical-slice/VerticalSliceRepository';
import { type AssignSliceToBoundedContextCommand } from './AssignSliceToBoundedContextCommand';

export class AssignSliceToBoundedContextCommandHandler {
  private readonly repository: VerticalSliceRepository;

  constructor(repository: VerticalSliceRepository) {
    this.repository = repository;
  }

  handle(command: AssignSliceToBoundedContextCommand): void {
    const collection = this.repository.load();
    this.repository.save(collection.assignBoundedContext(command.sliceId, command.boundedContextId));
  }
}
