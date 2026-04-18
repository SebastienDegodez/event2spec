import { type NodeKind } from './node/NodeKind';

export function nodeKindToRow(kind: NodeKind, bcIndex?: number): number {
  if (kind === 'uiScreen') return 0;
  if (kind === 'command' || kind === 'readModel' || kind === 'policy') return 1;
  if (kind === 'domainEvent') return 2 + (bcIndex ?? 0);
  return 0;
}
