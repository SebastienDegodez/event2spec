import { memo } from 'react';
import type { NodeProps } from '@xyflow/react';
import { type SwimlaneColor } from '../../../core/domain/SwimlaneColor';
import { GRID_SIZE } from './gridConstants';

export type SwimlaneBackgroundNodeData = {
  actorName: string;
  color: SwimlaneColor;
};

const COLOR_BG: Record<SwimlaneColor, string> = {
  yellow: 'rgba(253, 224, 71, 0.08)',
  blue: 'rgba(96, 165, 250, 0.08)',
  red: 'rgba(248, 113, 113, 0.08)',
  grey: 'rgba(156, 163, 175, 0.08)',
};

const COLOR_BORDER: Record<SwimlaneColor, string> = {
  yellow: 'rgba(253, 224, 71, 0.25)',
  blue: 'rgba(96, 165, 250, 0.25)',
  red: 'rgba(248, 113, 113, 0.25)',
  grey: 'rgba(156, 163, 175, 0.25)',
};

export const SwimlaneBackgroundNode = memo(({ data }: NodeProps) => {
  const nodeData = data as SwimlaneBackgroundNodeData;
  return (
    <div
      style={{
        width: '20000px',
        height: `${GRID_SIZE}px`,
        background: COLOR_BG[nodeData.color],
        borderBottom: `1px solid ${COLOR_BORDER[nodeData.color]}`,
        pointerEvents: 'none',
      }}
    />
  );
});

SwimlaneBackgroundNode.displayName = 'SwimlaneBackgroundNode';
