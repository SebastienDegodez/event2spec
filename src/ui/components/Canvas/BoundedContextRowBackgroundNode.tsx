import { memo } from 'react';
import type { NodeProps } from '@xyflow/react';
import { GRID_SIZE } from './gridConstants';

export type BoundedContextRowBackgroundNodeData = {
  name: string;
  color: string;
};

const COLOR_BG: Record<string, string> = {
  yellow: 'rgba(253, 224, 71, 0.08)',
  blue: 'rgba(96, 165, 250, 0.08)',
  red: 'rgba(248, 113, 113, 0.08)',
  grey: 'rgba(156, 163, 175, 0.08)',
};

const COLOR_BORDER: Record<string, string> = {
  yellow: 'rgba(253, 224, 71, 0.25)',
  blue: 'rgba(96, 165, 250, 0.25)',
  red: 'rgba(248, 113, 113, 0.25)',
  grey: 'rgba(156, 163, 175, 0.25)',
};

const COLOR_TEXT: Record<string, string> = {
  yellow: 'rgba(253, 224, 71, 0.6)',
  blue: 'rgba(96, 165, 250, 0.6)',
  red: 'rgba(248, 113, 113, 0.6)',
  grey: 'rgba(156, 163, 175, 0.6)',
};

export const BoundedContextRowBackgroundNode = memo(({ data }: NodeProps) => {
  const nodeData = data as BoundedContextRowBackgroundNodeData;
  const bgColor = COLOR_BG[nodeData.color] || COLOR_BG.grey;
  const borderColor = COLOR_BORDER[nodeData.color] || COLOR_BORDER.grey;
  const textColor = COLOR_TEXT[nodeData.color] || COLOR_TEXT.grey;

  return (
    <div
      style={{
        position: 'relative',
        width: '20000px',
        height: `${GRID_SIZE}px`,
        background: bgColor,
        borderBottom: `1px solid ${borderColor}`,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '12px',
        boxSizing: 'border-box',
      }}
    >
      <span
        style={{
          fontSize: '12px',
          fontWeight: 600,
          color: textColor,
          fontFamily: 'system-ui, sans-serif',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          maxWidth: '200px',
        }}
      >
        {nodeData.name}
      </span>
    </div>
  );
});

BoundedContextRowBackgroundNode.displayName = 'BoundedContextRowBackgroundNode';
