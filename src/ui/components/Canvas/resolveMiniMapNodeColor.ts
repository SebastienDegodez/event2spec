import {
  COMMAND_NODE_COLOR,
  DOMAIN_EVENT_NODE_COLOR,
  POLICY_NODE_COLOR,
  READ_MODEL_NODE_COLOR,
  UI_SCREEN_NODE_COLOR,
} from './gridConstants';

export function resolveMiniMapNodeColor(nodeType: string | undefined): string {
  if (nodeType === 'command') return COMMAND_NODE_COLOR;
  if (nodeType === 'readModel') return READ_MODEL_NODE_COLOR;
  if (nodeType === 'policy') return POLICY_NODE_COLOR;
  if (nodeType === 'uiScreen') return UI_SCREEN_NODE_COLOR;
  return DOMAIN_EVENT_NODE_COLOR;
}