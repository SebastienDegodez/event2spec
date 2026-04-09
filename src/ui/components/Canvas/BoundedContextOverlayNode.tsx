import { memo } from 'react';
import type { NodeProps } from '@xyflow/react';

export type BoundedContextOverlayNodeData = {
  name: string;
  color: string;
};

const PALETTE = [
  'rgba(99, 102, 241, 0.12)',   // indigo
  'rgba(20, 184, 166, 0.12)',   // teal
  'rgba(244, 63, 94, 0.12)',    // rose
  'rgba(234, 179, 8, 0.12)',    // yellow
  'rgba(168, 85, 247, 0.12)',   // purple
  'rgba(34, 197, 94, 0.12)',    // green
];

const BORDER_PALETTE = [
  'rgba(99, 102, 241, 0.40)',
  'rgba(20, 184, 166, 0.40)',
  'rgba(244, 63, 94, 0.40)',
  'rgba(234, 179, 8, 0.40)',
  'rgba(168, 85, 247, 0.40)',
  'rgba(34, 197, 94, 0.40)',
];

export function bcColor(index: number): string {
  return PALETTE[index % PALETTE.length];
}

export function bcBorderColor(index: number): string {
  return BORDER_PALETTE[index % BORDER_PALETTE.length];
}

export const BoundedContextOverlayNode = memo(function BoundedContextOverlayNode({
  data,
}: NodeProps<{ name: string; color: string; borderColor: string }>) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: data.color,
        borderTop: `2px solid ${data.borderColor}`,
        borderBottom: `2px solid ${data.borderColor}`,
        boxSizing: 'border-box',
        pointerEvents: 'none',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 6,
          left: 12,
          fontSize: 11,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: data.borderColor,
          opacity: 0.9,
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        {data.name}
      </div>
    </div>
  );
});
