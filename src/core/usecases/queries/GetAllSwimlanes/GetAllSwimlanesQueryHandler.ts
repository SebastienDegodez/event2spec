import { SwimlaneCollection } from '../../../domain/SwimlaneCollection';
import { type SwimlaneProjection } from '../../../domain/SwimlaneProjection';
import { GetAllSwimlanesQuery } from './GetAllSwimlanesQuery';

export class GetAllSwimlanesQueryHandler {
  handle(collection: SwimlaneCollection, projection: SwimlaneProjection, query: GetAllSwimlanesQuery): void {
    void query;
    collection.describeTo(projection);
  }
}
