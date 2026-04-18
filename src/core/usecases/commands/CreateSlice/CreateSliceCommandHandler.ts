import { type VerticalSliceRepository } from '../../../domain/VerticalSliceRepository';
import { VerticalSlice } from '../../../domain/vertical-slice/VerticalSlice';
import { CreateSliceCommand } from './CreateSliceCommand';

export class CreateSliceCommandHandler {
  private readonly repository: VerticalSliceRepository;

  constructor(repository: VerticalSliceRepository) {
    this.repository = repository;
  }

  handle(command: CreateSliceCommand): void {
    const collection = this.repository.load();
    const slice = VerticalSlice.create(command.id, command.name, command.commandId, command.eventIds, command.readModelId, command.startColumn, command.columnCount);
    this.repository.save(collection.add(slice));
  }
}
