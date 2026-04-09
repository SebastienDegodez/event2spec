import { BoundedContext } from './BoundedContext';
import { type BoundedContextProjection } from './BoundedContextProjection';

/** First-class collection of BoundedContext domain objects, ordered by creation. */
export class BoundedContextCollection {
  private readonly contexts: ReadonlyArray<BoundedContext>;

  private constructor(contexts: ReadonlyArray<BoundedContext>) {
    this.contexts = contexts;
  }

  static empty(): BoundedContextCollection {
    return new BoundedContextCollection([]);
  }

  add(context: BoundedContext): BoundedContextCollection {
    return new BoundedContextCollection([...this.contexts, context]);
  }

  remove(id: string): BoundedContextCollection {
    return new BoundedContextCollection(this.contexts.filter((c) => c.id !== id));
  }

  rename(id: string, name: string): BoundedContextCollection {
    return new BoundedContextCollection(
      this.contexts.map((c) => (c.id === id ? c.withName(name) : c)),
    );
  }

  isEmpty(): boolean {
    return this.contexts.length === 0;
  }

  describeTo(projection: BoundedContextProjection): void {
    for (const context of this.contexts) {
      projection.onBoundedContext(context.id, context.name);
    }
  }
}
