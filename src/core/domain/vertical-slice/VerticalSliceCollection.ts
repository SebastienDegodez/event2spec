import { VerticalSlice } from './VerticalSlice';
import { Scenario } from '../Scenario';
import { type VerticalSliceProjection } from './VerticalSliceProjection';

/** First-class collection of VerticalSlice domain objects. */
export class VerticalSliceCollection {
  private readonly slices: ReadonlyArray<VerticalSlice>;

  private constructor(slices: ReadonlyArray<VerticalSlice>) {
    this.slices = slices;
  }

  static empty(): VerticalSliceCollection {
    return new VerticalSliceCollection([]);
  }

  add(slice: VerticalSlice): VerticalSliceCollection {
    return new VerticalSliceCollection([...this.slices, slice]);
  }

  remove(id: string): VerticalSliceCollection {
    return new VerticalSliceCollection(this.slices.filter((s) => s.id !== id));
  }

  rename(id: string, name: string): VerticalSliceCollection {
    return new VerticalSliceCollection(
      this.slices.map((s) => (s.id === id ? s.withName(name) : s)),
    );
  }

  addScenario(id: string, scenario: Scenario): VerticalSliceCollection {
    return new VerticalSliceCollection(
      this.slices.map((s) => (s.id === id ? s.addScenario(scenario) : s)),
    );
  }

  removeScenario(id: string, scenarioIndex: number): VerticalSliceCollection {
    return new VerticalSliceCollection(
      this.slices.map((s) => (s.id === id ? s.removeScenario(scenarioIndex) : s)),
    );
  }

  updateScenario(id: string, scenarioIndex: number, scenario: Scenario): VerticalSliceCollection {
    return new VerticalSliceCollection(
      this.slices.map((s) => (s.id === id ? s.updateScenario(scenarioIndex, scenario) : s)),
    );
  }

  assignBoundedContext(sliceId: string, boundedContextId: string | undefined): VerticalSliceCollection {
    return new VerticalSliceCollection(
      this.slices.map((s) => (s.id === sliceId ? s.withBoundedContext(boundedContextId) : s)),
    );
  }

  unassignBoundedContext(boundedContextId: string): VerticalSliceCollection {
    return new VerticalSliceCollection(
      this.slices.map((s) => (s.boundedContextId === boundedContextId ? s.withBoundedContext(undefined) : s)),
    );
  }

  isEmpty(): boolean {
    return this.slices.length === 0;
  }

  isColumnCovered(column: number, excludedSliceId?: string): boolean {
    return this.slices.some((slice) => {
      if (excludedSliceId && slice.id === excludedSliceId) return false;
      return slice.coveredColumns().includes(column);
    });
  }

  extendSliceRight(id: string): VerticalSliceCollection {
    const slice = this.slices.find((entry) => entry.id === id);
    if (!slice) {
      throw new Error(`Slice ${id} not found`);
    }
    const nextColumn = slice.startColumn + slice.columnCount;
    if (this.isColumnCovered(nextColumn, id)) {
      throw new Error(`Column ${nextColumn} is already covered`);
    }
    return new VerticalSliceCollection(this.slices.map((entry) => (entry.id === id ? entry.extendRight() : entry)));
  }

  describeTo(projection: VerticalSliceProjection): void {
    this.slices.forEach((s) => {
      projection.onSlice(
        s.id,
        s.name,
        s.commandId,
        s.eventIds,
        s.readModelId,
        s.scenarios.map((sc) => ({ given: sc.given, when: sc.when, then: sc.then })),
        s.boundedContextId,
        s.startColumn,
        s.columnCount,
      );
    });
  }
}
