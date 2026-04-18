import { Background, BackgroundVariant, Controls } from '@xyflow/react';
import { GRID_SIZE } from './gridConstants';
import { CanvasMiniMap } from './CanvasMiniMap';

export function CanvasFlowDecorations() {
  return (
    <>
      <Background
        variant={BackgroundVariant.Cross}
        gap={GRID_SIZE}
        size={6}
        color="rgba(255,255,255,0.18)"
      />
      <Controls position="bottom-right" />
      <CanvasMiniMap />
    </>
  );
}