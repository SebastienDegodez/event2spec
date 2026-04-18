import { BoundedContextCollection } from '../../src/core/domain/bounded-context/BoundedContextCollection';
import { type BoundedContextProjection } from '../../src/core/domain/bounded-context/BoundedContextProjection';

export interface CollectedBoundedContext {
  id: string;
  name: string;
}

export function collectBoundedContexts(collection: BoundedContextCollection): CollectedBoundedContext[] {
  const result: CollectedBoundedContext[] = [];
  const projection: BoundedContextProjection = {
    onBoundedContext(id, name) {
      result.push({ id, name });
    },
  };
  collection.describeTo(projection);
  return result;
}
