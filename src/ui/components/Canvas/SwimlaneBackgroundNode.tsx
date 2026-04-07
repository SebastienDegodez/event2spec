import { memo } from 'react';
import type { NodeProps } from '@xyflow/react';
import { type SwimlaneColor } from '../../../core/domain/SwimlaneColor';
import { GRID_SIZE } from './gridConstants';

export type SwimlaneBackgroundNodeData = {
  actorName: string;
  color: SwimlaneColor;
  /** Number of grid rows this swimlane background spans (1 in classic mode, 3 in swimlane mode). */
  rowSpan: number;
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

const COLOR_SUBROW: Record<SwimlaneColor, string> = {
  yellow: 'rgba(253, 224, 71, 0.10)',
  blue: 'rgba(96, 165, 250, 0.10)',
  red: 'rgba(248, 113, 113, 0.10)',
  grey: 'rgba(156, 163, 175, 0.10)',
};

export const SwimlaneBackgroundNode = memo(({ data }: NodeProps) => {
  const nodeData = data as SwimlaneBackgroundNodeData;
  const rowSpan = nodeData.rowSpan ?? 1;
  const height = GRID_SIZE * rowSpan;
  const subRowBorder = rowSpan > 1
    ? `repeating-linear-gradient(to bottom, transparent, transparent ${GRID_SIZE - 1}px, ${COLOR_SUBROW[nodeData.color]} ${GRID_SIZE - 1}px, ${COLOR_SUBROW[nodeData.color]} ${GRID_SIZE}px)`
    : undefined;
  return (
    <div
      style={{
        width: '20000px',
        height: `${height}px`,
        background: COLOR_BG[nodeData.color],
        backgroundImage: subRowBorder,
        borderBottom: `1px solid ${COLOR_BORDER[nodeData.color]}`,
        pointerEvents: 'none',
      }}
    />
  );
});

SwimlaneBackgroundNode.displayName = 'SwimlaneBackgroundNode';
