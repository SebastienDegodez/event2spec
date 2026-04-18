import { VerticalSliceCollection } from '../../src/core/domain/vertical-slice/VerticalSliceCollection';
import { type VerticalSliceProjection, type ScenarioProjection } from '../../src/core/domain/vertical-slice/VerticalSliceProjection';

export interface CollectedSlice {
  id: string;
  name: string;
  commandId: string;
  eventIds: ReadonlyArray<string>;
  readModelId: string;
  scenarios: ReadonlyArray<ScenarioProjection>;
  boundedContextId: string | undefined;
  startColumn: number;
  columnCount: number;
}

export function collectSlices(collection: VerticalSliceCollection): CollectedSlice[] {
  const result: CollectedSlice[] = [];
  const projection: VerticalSliceProjection = {
    onSlice(id, name, commandId, eventIds, readModelId, scenarios, boundedContextId, startColumn, columnCount) {
      result.push({ id, name, commandId, eventIds, readModelId, scenarios, boundedContextId, startColumn, columnCount });
    },
  };
  collection.describeTo(projection);
  return result;
}
