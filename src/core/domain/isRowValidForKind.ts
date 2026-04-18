import { type NodeKind } from './node/NodeKind';

export function isRowValidForKind(kind: NodeKind, row: number): boolean {
  if (kind === 'uiScreen') return row === 0;
  if (kind === 'command' || kind === 'readModel' || kind === 'policy') return row === 1;
  if (kind === 'domainEvent') return row >= 2;
  return false;
}