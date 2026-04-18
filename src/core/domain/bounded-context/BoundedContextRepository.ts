import { type BoundedContextCollection } from './BoundedContextCollection';

/** Port interface for bounded context persistence — used by command handlers to load and save the collection. */
export interface BoundedContextRepository {
  load(): BoundedContextCollection;
  save(collection: BoundedContextCollection): void;
}
