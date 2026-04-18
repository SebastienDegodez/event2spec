import { type BoundedContextCollection } from '../../../domain/bounded-context/BoundedContextCollection';
import { type BoundedContextProjection } from '../../../domain/bounded-context/BoundedContextProjection';
import { type GetAllBoundedContextsQuery } from './GetAllBoundedContextsQuery';

export class GetAllBoundedContextsQueryHandler {
  handle(collection: BoundedContextCollection, query: GetAllBoundedContextsQuery, projection: BoundedContextProjection): void {
    void query;
    collection.describeTo(projection);
  }
}
