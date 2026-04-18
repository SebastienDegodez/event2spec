import { type VerticalSliceRepository } from '../../src/core/domain/vertical-slice/VerticalSliceRepository';
import { VerticalSliceCollection } from '../../src/core/domain/vertical-slice/VerticalSliceCollection';

/** In-memory implementation of VerticalSliceRepository for testing command handlers. */
export class InMemoryVerticalSliceRepository implements VerticalSliceRepository {
  private collection: VerticalSliceCollection;

  constructor(initial: VerticalSliceCollection = VerticalSliceCollection.empty()) {
    this.collection = initial;
  }

  load(): VerticalSliceCollection {
    return this.collection;
  }

  save(collection: VerticalSliceCollection): void {
    this.collection = collection;
  }
}
