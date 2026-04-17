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
  readonly startColumn: number;
  readonly columnCount: number;

  private constructor(
    id: string,
    name: string,
    commandId: string,
    eventIds: ReadonlyArray<string>,
    readModelId: string,
    scenarios: ReadonlyArray<Scenario>,
    boundedContextId: string | undefined,
    startColumn: number,
    columnCount: number,
  ) {
    this.id = id;
    this.name = name;
    this.commandId = commandId;
    this.eventIds = eventIds;
    this.readModelId = readModelId;
    this.scenarios = scenarios;
    this.boundedContextId = boundedContextId;
    this.startColumn = startColumn;
    this.columnCount = columnCount;
  }

  static create(id: string, name: string, commandId: string, eventIds: string[], readModelId: string, startColumn: number, columnCount: number): VerticalSlice {
    return new VerticalSlice(id, name, commandId, [...eventIds], readModelId, [], undefined, startColumn, columnCount);
  }

  coveredColumns(): number[] {
    return Array.from({ length: this.columnCount }, (_, index) => this.startColumn + index);
  }

  extendRight(): VerticalSlice {
    return new VerticalSlice(this.id, this.name, this.commandId, this.eventIds, this.readModelId, this.scenarios, this.boundedContextId, this.startColumn, this.columnCount + 1);
  }

  withName(name: string): VerticalSlice {
    return new VerticalSlice(this.id, name, this.commandId, this.eventIds, this.readModelId, this.scenarios, this.boundedContextId, this.startColumn, this.columnCount);
  }

  withBoundedContext(boundedContextId: string | undefined): VerticalSlice {
    return new VerticalSlice(this.id, this.name, this.commandId, this.eventIds, this.readModelId, this.scenarios, boundedContextId, this.startColumn, this.columnCount);
  }

  addScenario(scenario: Scenario): VerticalSlice {
    return new VerticalSlice(this.id, this.name, this.commandId, this.eventIds, this.readModelId, [...this.scenarios, scenario], this.boundedContextId, this.startColumn, this.columnCount);
  }

  removeScenario(index: number): VerticalSlice {
    const scenarios = this.scenarios.filter((_, i) => i !== index);
    return new VerticalSlice(this.id, this.name, this.commandId, this.eventIds, this.readModelId, scenarios, this.boundedContextId, this.startColumn, this.columnCount);
  }

  updateScenario(index: number, scenario: Scenario): VerticalSlice {
    const scenarios = this.scenarios.map((s, i) => (i === index ? scenario : s));
    return new VerticalSlice(this.id, this.name, this.commandId, this.eventIds, this.readModelId, scenarios, this.boundedContextId, this.startColumn, this.columnCount);
  }
}
