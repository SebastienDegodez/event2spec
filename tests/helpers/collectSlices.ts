import { VerticalSliceCollection } from '../../src/core/domain/VerticalSliceCollection';
import { type VerticalSliceProjection, type ScenarioProjection } from '../../src/core/domain/VerticalSliceProjection';

export interface CollectedSlice {
  id: string;
  name: string;
  commandId: string;
  eventIds: ReadonlyArray<string>;
  readModelId: string;
  scenarios: ReadonlyArray<ScenarioProjection>;
  boundedContextId: string | undefined;
}

export function collectSlices(collection: VerticalSliceCollection): CollectedSlice[] {
  const result: CollectedSlice[] = [];
  const projection: VerticalSliceProjection = {
    onSlice(id, name, commandId, eventIds, readModelId, scenarios, boundedContextId) {
      result.push({ id, name, commandId, eventIds, readModelId, scenarios, boundedContextId });
    },
  };
  collection.describeTo(projection);
  return result;
}
