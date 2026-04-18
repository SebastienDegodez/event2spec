import { type VerticalSliceCollection } from './vertical-slice/VerticalSliceCollection';

/** Port interface for vertical slice persistence — used by command handlers to load and save the collection. */
export interface VerticalSliceRepository {
  load(): VerticalSliceCollection;
  save(collection: VerticalSliceCollection): void;
}
