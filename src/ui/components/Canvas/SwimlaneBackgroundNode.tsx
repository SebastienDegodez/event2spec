import { memo, useMemo } from 'react';
import type { NodeProps } from '@xyflow/react';
import { type SwimlaneColor } from '../../../core/domain/SwimlaneColor';
import { type SwimlaneCategory, SWIMLANE_CATEGORIES, ROWS_PER_SWIMLANE } from '../../../core/domain/SwimlaneCategory';
import { GRID_SIZE } from './gridConstants';

export type SwimlaneBackgroundNodeData = {
  actorName: string;
  color: SwimlaneColor;
  /** Number of grid rows this swimlane background spans (always ROWS_PER_SWIMLANE = 3). */
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

/** Base RGB values per category (without alpha), used to derive tint and accent colors. */
const CATEGORY_BASE_RGB: Record<SwimlaneCategory, string> = {
  actor_ui: '234, 179, 8',
  command_readmodel: '59, 130, 246',
  event: '245, 158, 11',
};

/** Category-specific tint overlaid on top of the swimlane base color. */
const CATEGORY_TINT: Record<SwimlaneCategory, string> = Object.fromEntries(
  Object.entries(CATEGORY_BASE_RGB).map(([k, rgb]) => [k, `rgba(${rgb}, 0.04)`])
) as Record<SwimlaneCategory, string>;

/** Subtle left-side accent bar color per category for quick visual identification. */
const CATEGORY_ACCENT: Record<SwimlaneCategory, string> = Object.fromEntries(
  Object.entries(CATEGORY_BASE_RGB).map(([k, rgb]) => [k, `rgba(${rgb}, 0.35)`])
) as Record<SwimlaneCategory, string>;

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
  const height = GRID_SIZE * ROWS_PER_SWIMLANE;
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
        borderBottom: `1px solid ${COLOR_BORDER[nodeData.color]}`,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {SWIMLANE_CATEGORIES.map((category, i) => (
        <div
          key={category}
          className={`swimlane-subrow swimlane-subrow--${category}`}
          style={{
            width: '100%',
            height: `${GRID_SIZE}px`,
            background: `linear-gradient(${CATEGORY_TINT[category]}, ${CATEGORY_TINT[category]}), ${COLOR_BG[nodeData.color]}`,
            borderBottom: i < SWIMLANE_CATEGORIES.length - 1
              ? `1px dashed ${COLOR_BORDER[nodeData.color]}`
              : undefined,
            borderLeft: `3px solid ${CATEGORY_ACCENT[category]}`,
            boxSizing: 'border-box',
          }}
        />
      ))}
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
