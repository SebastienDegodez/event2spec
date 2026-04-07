import type { NodeKind } from './NodeKind';

/** Editable properties for a DomainEvent node. */
export interface DomainEventProperties {
  data: Record<string, string>;
}

/** Editable properties for a Command node. */
export interface CommandProperties {
  actor: string;
  payload: Record<string, string>;
  guardConditions: string[];
}

/** Editable properties for a ReadModel node. */
export interface ReadModelProperties {
  consumedBy: string;
  data: Record<string, string>;
}

/** Editable properties for a Policy node. */
export interface PolicyProperties {
  condition: string;
}

/** Editable properties for a UIScreen node. */
export interface UIScreenProperties {
  description: string;
}

/** Discriminated union of node properties keyed by node kind. */
export type NodeProperties =
  | { type: 'domainEvent' } & DomainEventProperties
  | { type: 'command' } & CommandProperties
  | { type: 'readModel' } & ReadModelProperties
  | { type: 'policy' } & PolicyProperties
  | { type: 'uiScreen' } & UIScreenProperties;

/** Creates default (empty) properties for the given node kind. */
export function createDefaultNodeProperties(kind: NodeKind): NodeProperties {
  switch (kind) {
    case 'domainEvent':
      return { type: 'domainEvent', data: {} };
    case 'command':
      return { type: 'command', actor: '', payload: {}, guardConditions: [] };
    case 'readModel':
      return { type: 'readModel', consumedBy: '', data: {} };
    case 'policy':
      return { type: 'policy', condition: '' };
    case 'uiScreen':
      return { type: 'uiScreen', description: '' };
  }
}
