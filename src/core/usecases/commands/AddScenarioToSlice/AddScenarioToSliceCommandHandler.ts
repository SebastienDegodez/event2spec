import { type VerticalSliceRepository } from '../../../domain/VerticalSliceRepository';
import { Scenario } from '../../../domain/Scenario';
import { AddScenarioToSliceCommand } from './AddScenarioToSliceCommand';

export class AddScenarioToSliceCommandHandler {
  private readonly repository: VerticalSliceRepository;

  constructor(repository: VerticalSliceRepository) {
    this.repository = repository;
  }

  handle(command: AddScenarioToSliceCommand): void {
    const collection = this.repository.load();
    const scenario = Scenario.create(command.given, command.when, command.then);
    this.repository.save(collection.addScenario(command.sliceId, scenario));
  }
}
