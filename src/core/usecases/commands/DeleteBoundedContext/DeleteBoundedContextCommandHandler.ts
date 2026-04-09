import { type BoundedContextRepository } from '../../../domain/BoundedContextRepository';
import { type VerticalSliceRepository } from '../../../domain/VerticalSliceRepository';
import { type DeleteBoundedContextCommand } from './DeleteBoundedContextCommand';

export class DeleteBoundedContextCommandHandler {
  private readonly boundedContextRepository: BoundedContextRepository;
  private readonly sliceRepository: VerticalSliceRepository | undefined;

  constructor(boundedContextRepository: BoundedContextRepository, sliceRepository?: VerticalSliceRepository) {
    this.boundedContextRepository = boundedContextRepository;
    this.sliceRepository = sliceRepository;
  }

  handle(command: DeleteBoundedContextCommand): void {
    const collection = this.boundedContextRepository.load();
    this.boundedContextRepository.save(collection.remove(command.id));

    if (this.sliceRepository) {
      const slices = this.sliceRepository.load();
      this.sliceRepository.save(slices.unassignBoundedContext(command.id));
    }
  }
}
