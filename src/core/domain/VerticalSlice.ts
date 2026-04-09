import { Scenario } from './Scenario';

/** Domain object representing a vertical slice grouping Command → Events → ReadModel with scenarios. */
export class VerticalSlice {
  readonly id: string;
  readonly name: string;
  readonly commandId: string;
  readonly eventIds: ReadonlyArray<string>;
  readonly readModelId: string;
  readonly scenarios: ReadonlyArray<Scenario>;
  readonly boundedContextId: string | undefined;

  private constructor(
    id: string,
    name: string,
    commandId: string,
    eventIds: ReadonlyArray<string>,
    readModelId: string,
    scenarios: ReadonlyArray<Scenario>,
    boundedContextId: string | undefined,
  ) {
    this.id = id;
    this.name = name;
    this.commandId = commandId;
    this.eventIds = eventIds;
    this.readModelId = readModelId;
    this.scenarios = scenarios;
    this.boundedContextId = boundedContextId;
  }

  static create(id: string, name: string, commandId: string, eventIds: string[], readModelId: string): VerticalSlice {
    return new VerticalSlice(id, name, commandId, [...eventIds], readModelId, [], undefined);
  }

  withName(name: string): VerticalSlice {
    return new VerticalSlice(this.id, name, this.commandId, this.eventIds, this.readModelId, this.scenarios, this.boundedContextId);
  }

  withBoundedContext(boundedContextId: string | undefined): VerticalSlice {
    return new VerticalSlice(this.id, this.name, this.commandId, this.eventIds, this.readModelId, this.scenarios, boundedContextId);
  }

  addScenario(scenario: Scenario): VerticalSlice {
    return new VerticalSlice(this.id, this.name, this.commandId, this.eventIds, this.readModelId, [...this.scenarios, scenario], this.boundedContextId);
  }

  removeScenario(index: number): VerticalSlice {
    const scenarios = this.scenarios.filter((_, i) => i !== index);
    return new VerticalSlice(this.id, this.name, this.commandId, this.eventIds, this.readModelId, scenarios, this.boundedContextId);
  }

  updateScenario(index: number, scenario: Scenario): VerticalSlice {
    const scenarios = this.scenarios.map((s, i) => (i === index ? scenario : s));
    return new VerticalSlice(this.id, this.name, this.commandId, this.eventIds, this.readModelId, scenarios, this.boundedContextId);
  }
}
