import { memo, useMemo } from 'react';
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

const COLOR_TEXT: Record<SwimlaneColor, string> = {
  yellow: 'rgba(253, 224, 71, 0.12)',
  blue: 'rgba(96, 165, 250, 0.12)',
  red: 'rgba(248, 113, 113, 0.12)',
  grey: 'rgba(156, 163, 175, 0.12)',
};

/** Escape XML-special characters for safe SVG embedding. */
function escapeXml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

const CELL_LABEL_FONT_SIZE = 16;
const CELL_LABEL_FONT_WEIGHT = 700;
const CELL_CENTER = GRID_SIZE / 2;

/** Build a data-URI SVG that tiles one cell-sized label. */
function buildCellLabelSvg(actorName: string, color: SwimlaneColor): string {
  const fill = COLOR_TEXT[color];
  const escaped = escapeXml(actorName);
  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${GRID_SIZE}" height="${GRID_SIZE}">`,
    `<text x="${CELL_CENTER}" y="${CELL_CENTER}"`,
    ` dominant-baseline="middle" text-anchor="middle"`,
    ` fill="${fill}" font-size="${CELL_LABEL_FONT_SIZE}" font-weight="${CELL_LABEL_FONT_WEIGHT}"`,
    ` font-family="system-ui,sans-serif">${escaped}</text>`,
    `</svg>`,
  ].join('');
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

export const SwimlaneBackgroundNode = memo(({ data }: NodeProps) => {
  const nodeData = data as SwimlaneBackgroundNodeData;
  // Defensive default: persisted data from before the rowSpan field was introduced may lack this value
  const rowSpan = nodeData.rowSpan ?? 1;
  const height = GRID_SIZE * rowSpan;
  const subRowBorder = rowSpan > 1
    ? `repeating-linear-gradient(to bottom, transparent, transparent ${GRID_SIZE - 1}px, ${COLOR_SUBROW[nodeData.color]} ${GRID_SIZE - 1}px, ${COLOR_SUBROW[nodeData.color]} ${GRID_SIZE}px)`
    : undefined;
  const cellLabelBg = useMemo(
    () => buildCellLabelSvg(nodeData.actorName, nodeData.color),
    [nodeData.actorName, nodeData.color],
  );
  return (
    <div
      style={{
        position: 'relative',
        width: '20000px',
        height: `${height}px`,
        background: COLOR_BG[nodeData.color],
        backgroundImage: subRowBorder,
        borderBottom: `1px solid ${COLOR_BORDER[nodeData.color]}`,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: cellLabelBg,
          backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
          backgroundRepeat: 'repeat',
        }}
      />
    </div>
  );
});

SwimlaneBackgroundNode.displayName = 'SwimlaneBackgroundNode';
