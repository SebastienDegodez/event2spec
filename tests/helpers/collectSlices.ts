import { VerticalSliceCollection } from '../../src/core/domain/VerticalSliceCollection';
import { type VerticalSliceProjection, type ScenarioProjection } from '../../src/core/domain/VerticalSliceProjection';

export interface CollectedSlice {
  id: string;
  name: string;
  commandId: string;
  eventIds: ReadonlyArray<string>;
  readModelId: string;
  scenarios: ReadonlyArray<ScenarioProjection>;
}

export function collectSlices(collection: VerticalSliceCollection): CollectedSlice[] {
  const result: CollectedSlice[] = [];
  const projection: VerticalSliceProjection = {
    onSlice(id, name, commandId, eventIds, readModelId, scenarios) {
      result.push({ id, name, commandId, eventIds, readModelId, scenarios });
    },
  };
  collection.describeTo(projection);
  return result;
}
