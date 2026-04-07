import { type VerticalSliceRepository } from '../../../domain/VerticalSliceRepository';
import { RemoveScenarioFromSliceCommand } from './RemoveScenarioFromSliceCommand';

export class RemoveScenarioFromSliceCommandHandler {
  private readonly repository: VerticalSliceRepository;

  constructor(repository: VerticalSliceRepository) {
    this.repository = repository;
  }

  handle(command: RemoveScenarioFromSliceCommand): void {
    const collection = this.repository.load();
    this.repository.save(collection.removeScenario(command.sliceId, command.scenarioIndex));
  }
}
