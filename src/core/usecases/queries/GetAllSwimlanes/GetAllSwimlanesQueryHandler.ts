import { SwimlaneCollection } from '../../../domain/SwimlaneCollection';
import { type SwimlaneProjection } from '../../../domain/SwimlaneProjection';
import { GetAllSwimlanesQuery } from './GetAllSwimlanesQuery';

export class GetAllSwimlanesQueryHandler {
  handle(collection: SwimlaneCollection, query: GetAllSwimlanesQuery, projection: SwimlaneProjection): void {
    void query;
    collection.describeTo(projection);
  }
}
