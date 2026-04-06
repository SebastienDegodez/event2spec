import { SwimlaneCollection } from '../../../domain/SwimlaneCollection';
import { type SwimlaneProjection } from '../../../domain/SwimlaneProjection';
import { GetSwimlaneByIdQuery } from './GetSwimlaneByIdQuery';

export class GetSwimlaneByIdQueryHandler {
  handle(collection: SwimlaneCollection, query: GetSwimlaneByIdQuery, projection: SwimlaneProjection): void {
    collection.describeTo({
      onSwimlane(id, actorName, actorType, color, index, isFirst, isLast) {
        if (id === query.id) {
          projection.onSwimlane(id, actorName, actorType, color, index, isFirst, isLast);
        }
      },
    });
  }
}
