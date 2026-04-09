import { type NodeKind } from './NodeKind';

/** Visual descriptor for a quick-add button inside a cell. */
export interface CellNodeOption {
  kind: NodeKind;
  letter: string;
  label: string;
  color: string;
}

const ACTOR_UI_OPTIONS: readonly CellNodeOption[] = [
  { kind: 'uiScreen', letter: 'U', label: 'UI Screen', color: '#eab308' },
];

const COMMAND_READMODEL_OPTIONS: readonly CellNodeOption[] = [
  { kind: 'command', letter: 'C', label: 'Command', color: '#3b82f6' },
  { kind: 'readModel', letter: 'R', label: 'Read Model', color: '#22c55e' },
  { kind: 'policy', letter: 'P', label: 'Policy', color: '#a855f7' },
];

const EVENT_OPTIONS: readonly CellNodeOption[] = [
  { kind: 'domainEvent', letter: 'E', label: 'Domain Event', color: '#f59e0b' },
];

/** Returns the node types that can be added to a given absolute row. */
export function cellNodeOptions(row: number): readonly CellNodeOption[] {
  if (row === 0) return ACTOR_UI_OPTIONS;
  if (row === 1) return COMMAND_READMODEL_OPTIONS;
  return EVENT_OPTIONS;
}
