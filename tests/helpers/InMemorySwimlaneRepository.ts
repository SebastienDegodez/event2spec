import { type SwimlaneRepository } from '../../src/core/domain/SwimlaneRepository';
import { SwimlaneCollection } from '../../src/core/domain/SwimlaneCollection';

/** In-memory implementation of SwimlaneRepository for testing command handlers. */
export class InMemorySwimlaneRepository implements SwimlaneRepository {
  private collection: SwimlaneCollection;

  constructor(initial: SwimlaneCollection = SwimlaneCollection.empty()) {
    this.collection = initial;
  }

  load(): SwimlaneCollection {
    return this.collection;
  }

  save(collection: SwimlaneCollection): void {
    this.collection = collection;
  }
}
