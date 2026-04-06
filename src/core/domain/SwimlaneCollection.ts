import { Swimlane } from './Swimlane';
import { type ActorType } from './ActorType';
import { type SwimlaneProjection } from './SwimlaneProjection';

/** First-class collection of Swimlane domain objects, ordered by their display position. */
export class SwimlaneCollection {
  private readonly swimlanes: ReadonlyArray<Swimlane>;

  private constructor(swimlanes: ReadonlyArray<Swimlane>) {
    this.swimlanes = swimlanes;
  }

  static empty(): SwimlaneCollection {
    return new SwimlaneCollection([]);
  }

  add(swimlane: Swimlane): SwimlaneCollection {
    return new SwimlaneCollection([...this.swimlanes, swimlane]);
  }

  remove(id: string): SwimlaneCollection {
    return new SwimlaneCollection(this.swimlanes.filter((s) => s.id !== id));
  }

  rename(id: string, actorName: string): SwimlaneCollection {
    return new SwimlaneCollection(
      this.swimlanes.map((s) => (s.id === id ? s.withActorName(actorName) : s))
    );
  }

  changeActorType(id: string, actorType: ActorType): SwimlaneCollection {
    return new SwimlaneCollection(
      this.swimlanes.map((s) => (s.id === id ? s.withActorType(actorType) : s))
    );
  }

  reorder(id: string, targetIndex: number): SwimlaneCollection {
    const index = this.swimlanes.findIndex((s) => s.id === id);
    if (index === -1) return this;
    const items = [...this.swimlanes];
    const [item] = items.splice(index, 1);
    items.splice(targetIndex, 0, item);
    return new SwimlaneCollection(items);
  }

  canMoveUp(id: string): boolean {
    const index = this.swimlanes.findIndex((s) => s.id === id);
    return index > 0;
  }

  canMoveDown(id: string): boolean {
    const index = this.swimlanes.findIndex((s) => s.id === id);
    return index !== -1 && index < this.swimlanes.length - 1;
  }

  isEmpty(): boolean {
    return this.swimlanes.length === 0;
  }

  describeTo(projection: SwimlaneProjection): void {
    const total = this.swimlanes.length;
    this.swimlanes.forEach((s, index) => {
      projection.onSwimlane(s.id, s.actorName, s.actorType, s.color(), index, index === 0, index === total - 1);
    });
  }
}
