import { Scenario } from './Scenario';

/** Domain object representing a vertical slice grouping Command → Events → ReadModel with scenarios. */
export class VerticalSlice {
  readonly id: string;
  readonly name: string;
  readonly commandId: string;
  readonly eventIds: ReadonlyArray<string>;
  readonly readModelId: string;
  readonly scenarios: ReadonlyArray<Scenario>;

  private constructor(
    id: string,
    name: string,
    commandId: string,
    eventIds: ReadonlyArray<string>,
    readModelId: string,
    scenarios: ReadonlyArray<Scenario>,
  ) {
    this.id = id;
    this.name = name;
    this.commandId = commandId;
    this.eventIds = eventIds;
    this.readModelId = readModelId;
    this.scenarios = scenarios;
  }

  static create(id: string, name: string, commandId: string, eventIds: string[], readModelId: string): VerticalSlice {
    return new VerticalSlice(id, name, commandId, [...eventIds], readModelId, []);
  }

  withName(name: string): VerticalSlice {
    return new VerticalSlice(this.id, name, this.commandId, this.eventIds, this.readModelId, this.scenarios);
  }

  addScenario(scenario: Scenario): VerticalSlice {
    return new VerticalSlice(this.id, this.name, this.commandId, this.eventIds, this.readModelId, [...this.scenarios, scenario]);
  }

  removeScenario(index: number): VerticalSlice {
    const scenarios = this.scenarios.filter((_, i) => i !== index);
    return new VerticalSlice(this.id, this.name, this.commandId, this.eventIds, this.readModelId, scenarios);
  }
}
