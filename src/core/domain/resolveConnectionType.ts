import { type ConnectionType } from './ConnectionType';
import { type NodeKind } from './node/NodeKind';

/**
 * Returns the semantic connection type for the given source → target node kinds,
 * or `null` when the connection is not allowed.
 *
 * Allowed connections:
 * - Command  → DomainEvent : "triggers"
 * - DomainEvent → ReadModel : "feeds"
 * - DomainEvent → Policy    : "triggers policy"
 * - Policy   → Command      : "executes"
 * - UIScreen → Command      : "user action"
 * - ReadModel → UIScreen    : "displays"
 */
export function resolveConnectionType(sourceKind: NodeKind, targetKind: NodeKind): ConnectionType | null {
  if (sourceKind === 'command' && targetKind === 'domainEvent') return 'triggers';
  if (sourceKind === 'domainEvent' && targetKind === 'readModel') return 'feeds';
  if (sourceKind === 'domainEvent' && targetKind === 'policy') return 'triggers policy';
  if (sourceKind === 'policy' && targetKind === 'command') return 'executes';
  if (sourceKind === 'uiScreen' && targetKind === 'command') return 'user action';
  if (sourceKind === 'readModel' && targetKind === 'uiScreen') return 'displays';
  return null;
}
