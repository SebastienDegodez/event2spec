import { type VerticalSliceRepository } from '../../../domain/VerticalSliceRepository';
import { Scenario } from '../../../domain/Scenario';
import { UpdateScenarioInSliceCommand } from './UpdateScenarioInSliceCommand';

export class UpdateScenarioInSliceCommandHandler {
  private readonly repository: VerticalSliceRepository;

  constructor(repository: VerticalSliceRepository) {
    this.repository = repository;
  }

  handle(command: UpdateScenarioInSliceCommand): void {
    const collection = this.repository.load();
    const scenario = Scenario.create(command.given, command.when, command.then);
    this.repository.save(collection.updateScenario(command.sliceId, command.scenarioIndex, scenario));
  }
}
