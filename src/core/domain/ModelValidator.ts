import { type NodeKind } from './node/NodeKind';
import { type NodeLink } from './node/NodeLink';
import { type ValidationWarning } from './ValidationWarning';

/** Minimal node info needed for validation. */
export interface ValidatableNode {
  readonly id: string;
  readonly label: string;
  readonly kind: NodeKind;
}

/** Validates model completeness and returns warnings for orphan/disconnected nodes. */
export function validateModel(
  nodes: ReadonlyArray<ValidatableNode>,
  links: ReadonlyArray<NodeLink>,
): ReadonlyArray<ValidationWarning> {
  const warnings: ValidationWarning[] = [];

  for (const node of nodes) {
    const warning = validateNode(node, links);
    if (warning) warnings.push(warning);
  }

  return warnings;
}

function validateNode(
  node: ValidatableNode,
  links: ReadonlyArray<NodeLink>,
): ValidationWarning | null {
  if (node.kind === 'domainEvent') return validateDomainEvent(node, links);
  if (node.kind === 'command') return validateCommand(node, links);
  if (node.kind === 'readModel') return validateReadModel(node, links);
  if (node.kind === 'policy') return validatePolicy(node, links);
  if (node.kind === 'uiScreen') return validateUIScreen(node, links);
  return null;
}

function validateDomainEvent(
  node: ValidatableNode,
  links: ReadonlyArray<NodeLink>,
): ValidationWarning | null {
  const hasCommandSource = links.some(
    (link) => link.targetNodeId === node.id && link.connectionType === 'triggers',
  );
  if (hasCommandSource) return null;

  return {
    nodeId: node.id,
    nodeLabel: node.label,
    nodeKind: 'domainEvent',
    warningType: 'orphan',
    message: `Event "${node.label}" has no triggering command`,
  };
}

function validateCommand(
  node: ValidatableNode,
  links: ReadonlyArray<NodeLink>,
): ValidationWarning | null {
  const hasResultingEvent = links.some(
    (link) => link.sourceNodeId === node.id && link.connectionType === 'triggers',
  );
  if (hasResultingEvent) return null;

  return {
    nodeId: node.id,
    nodeLabel: node.label,
    nodeKind: 'command',
    warningType: 'incomplete',
    message: `Command "${node.label}" produces no event`,
  };
}

function validateReadModel(
  node: ValidatableNode,
  links: ReadonlyArray<NodeLink>,
): ValidationWarning | null {
  const hasEventSource = links.some(
    (link) => link.targetNodeId === node.id && link.connectionType === 'feeds',
  );
  if (hasEventSource) return null;

  return {
    nodeId: node.id,
    nodeLabel: node.label,
    nodeKind: 'readModel',
    warningType: 'disconnected',
    message: `Read model "${node.label}" is not fed by any event`,
  };
}

function validatePolicy(
  node: ValidatableNode,
  links: ReadonlyArray<NodeLink>,
): ValidationWarning | null {
  const hasEventSource = links.some(
    (link) => link.targetNodeId === node.id && link.connectionType === 'triggers policy',
  );
  const hasCommandTarget = links.some(
    (link) => link.sourceNodeId === node.id && link.connectionType === 'executes',
  );
  if (hasEventSource && hasCommandTarget) return null;

  return {
    nodeId: node.id,
    nodeLabel: node.label,
    nodeKind: 'policy',
    warningType: 'disconnected',
    message: `Policy "${node.label}" is not fully connected`,
  };
}

function validateUIScreen(
  node: ValidatableNode,
  links: ReadonlyArray<NodeLink>,
): ValidationWarning | null {
  const triggersCommand = links.some(
    (link) => link.sourceNodeId === node.id && link.connectionType === 'user action',
  );
  const displaysReadModel = links.some(
    (link) => link.targetNodeId === node.id && link.connectionType === 'displays',
  );
  if (triggersCommand || displaysReadModel) return null;

  return {
    nodeId: node.id,
    nodeLabel: node.label,
    nodeKind: 'uiScreen',
    warningType: 'disconnected',
    message: `UI screen "${node.label}" is disconnected`,
  };
}
