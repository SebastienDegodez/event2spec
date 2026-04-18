import { MiniMap } from '@xyflow/react';
import { resolveMiniMapNodeColor } from './resolveMiniMapNodeColor';

export function CanvasMiniMap() {
  return (
    <MiniMap
      nodeColor={(node) => resolveMiniMapNodeColor(node.type)}
      maskColor="rgba(15,15,25,0.7)"
      position="bottom-left"
    />
  );
}