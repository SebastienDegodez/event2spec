import { type BoundedContextRepository } from '../../src/core/domain/BoundedContextRepository';
import { BoundedContextCollection } from '../../src/core/domain/BoundedContextCollection';

/** In-memory implementation of BoundedContextRepository for testing command handlers. */
export class InMemoryBoundedContextRepository implements BoundedContextRepository {
  private collection: BoundedContextCollection;

  constructor(initial: BoundedContextCollection = BoundedContextCollection.empty()) {
    this.collection = initial;
  }

  load(): BoundedContextCollection {
    return this.collection;
  }

  save(collection: BoundedContextCollection): void {
    this.collection = collection;
  }
}
