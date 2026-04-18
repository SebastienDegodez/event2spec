import { type Edge } from '@xyflow/react';
import { type NodeLink } from '../../../core/domain/node/NodeLink';
import { EDGE_COLOR } from './gridConstants';

const HANDLE_MAP: Record<string, { sourceHandle: string; targetHandle: string }> = {
  'triggers':        { sourceHandle: 'bottom',     targetHandle: 'top' },        // Command→DomainEvent ↓
  'feeds':           { sourceHandle: 'top-out',    targetHandle: 'bottom' },     // DomainEvent→ReadModel ↑
  'triggers policy': { sourceHandle: 'top-out',    targetHandle: 'bottom' },     // DomainEvent→Policy ↑
  'executes':        { sourceHandle: 'right',      targetHandle: 'left' },       // Policy→Command →
  'user action':     { sourceHandle: 'bottom-out', targetHandle: 'top' },        // UIScreen→Command ↓
  'displays':        { sourceHandle: 'top',        targetHandle: 'bottom' },     // ReadModel→UIScreen ↑
};

export function buildReactFlowEdges(links: ReadonlyArray<NodeLink>): Edge[] {
  return links.map((link) => {
    const handles = HANDLE_MAP[link.connectionType] ?? { sourceHandle: null, targetHandle: null };
    return {
      id: `edge-${link.sourceNodeId}-${link.targetNodeId}`,
      source: link.sourceNodeId,
      target: link.targetNodeId,
      sourceHandle: handles.sourceHandle,
      targetHandle: handles.targetHandle,
      type: 'default',
      animated: true,
      label: link.connectionType,
      style: { stroke: EDGE_COLOR, strokeWidth: 2 },
      labelStyle: { fill: '#fff', fontWeight: 600, fontSize: 11 },
      labelBgStyle: { fill: 'rgba(30,30,40,0.75)', rx: 4 },
    };
  });
}
