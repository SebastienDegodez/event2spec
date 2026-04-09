import { type BoundedContextCollection } from '../../../domain/BoundedContextCollection';
import { type BoundedContextProjection } from '../../../domain/BoundedContextProjection';
import { type GetAllBoundedContextsQuery } from './GetAllBoundedContextsQuery';

export class GetAllBoundedContextsQueryHandler {
  handle(collection: BoundedContextCollection, query: GetAllBoundedContextsQuery, projection: BoundedContextProjection): void {
    void query;
    collection.describeTo(projection);
  }
}
