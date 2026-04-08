import { type NodeKind } from './NodeKind';
import { type SwimlaneCategory } from './SwimlaneCategory';

/** Maps a node kind to the swimlane category sub-row where it should be placed. */
export function nodeKindToCategory(kind: NodeKind): SwimlaneCategory {
  const mapping: Record<NodeKind, SwimlaneCategory> = {
    uiScreen: 'actor_ui',
    command: 'command_readmodel',
    readModel: 'command_readmodel',
    policy: 'command_readmodel',
    domainEvent: 'event',
  };
  return mapping[kind];
}
