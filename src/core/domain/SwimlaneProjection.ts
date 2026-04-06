import { type ActorType } from './ActorType';
import { type SwimlaneColor } from './SwimlaneColor';

/** Projection interface for describing swimlanes to external consumers. */
export interface SwimlaneProjection {
  onSwimlane(
    id: string,
    actorName: string,
    actorType: ActorType,
    color: SwimlaneColor,
    index: number,
    isFirst: boolean,
    isLast: boolean,
  ): void;
}
