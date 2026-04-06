import { type SwimlaneCollection } from './SwimlaneCollection';

/** Port interface for swimlane persistence — used by command handlers to load and save the collection. */
export interface SwimlaneRepository {
  load(): SwimlaneCollection;
  save(collection: SwimlaneCollection): void;
}
