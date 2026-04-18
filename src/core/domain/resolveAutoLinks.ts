import { type NodeKind } from './node/NodeKind';
import { type ConnectionType } from './ConnectionType';
import { resolveConnectionType } from './resolveConnectionType';

/** A node already on the board with its kind and grid position. */
export interface BoardNodeSummary {
  id: string;
  kind: NodeKind;
  column: number;
  row: number;
}

/** A link to be created automatically. */
export interface AutoLink {
  sourceNodeId: string;
  targetNodeId: string;
  connectionType: ConnectionType;
}

/**
 * Computes automatic links between a newly added node and adjacent nodes
 * in the same column (rows that are directly above or below).
 */
export function resolveAutoLinks(
  newNodeId: string,
  newNodeKind: NodeKind,
  newNodeColumn: number,
  newNodeRow: number,
  existingNodes: readonly BoardNodeSummary[],
): AutoLink[] {
  const links: AutoLink[] = [];

  const adjacentNodes = existingNodes.filter(
    (n) => n.column === newNodeColumn && Math.abs(n.row - newNodeRow) === 1,
  );

  for (const adj of adjacentNodes) {
    const outgoing = resolveConnectionType(newNodeKind, adj.kind);
    if (outgoing) {
      links.push({ sourceNodeId: newNodeId, targetNodeId: adj.id, connectionType: outgoing });
      continue;
    }
    const incoming = resolveConnectionType(adj.kind, newNodeKind);
    if (incoming) {
      links.push({ sourceNodeId: adj.id, targetNodeId: newNodeId, connectionType: incoming });
    }
  }

  return links;
}
