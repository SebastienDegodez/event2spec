import { type ConnectionType } from '../ConnectionType';

/** A directed, typed link between two board nodes. */
export interface NodeLink {
  sourceNodeId: string;
  targetNodeId: string;
  connectionType: ConnectionType;
}
