import { SwimlaneCollection } from '../../src/core/domain/SwimlaneCollection';
import { type SwimlaneProjection } from '../../src/core/domain/SwimlaneProjection';
import { type ActorType } from '../../src/core/domain/ActorType';
import { type SwimlaneColor } from '../../src/core/domain/SwimlaneColor';

export interface CollectedSwimlane {
  id: string;
  actorName: string;
  actorType: ActorType;
  color: SwimlaneColor;
  index: number;
  isFirst: boolean;
  isLast: boolean;
}

export function collectSwimlanes(collection: SwimlaneCollection): CollectedSwimlane[] {
  const result: CollectedSwimlane[] = [];
  const projection: SwimlaneProjection = {
    onSwimlane(id, actorName, actorType, color, index, isFirst, isLast) {
      result.push({ id, actorName, actorType, color, index, isFirst, isLast });
    },
  };
  collection.describeTo(projection);
  return result;
}
