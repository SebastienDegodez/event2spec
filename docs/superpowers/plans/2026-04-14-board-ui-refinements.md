# Board UI Refinements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce grid density, remove the NodePalette and "+" button, enlarge connection handles, and extend quick-add cells to fill the visible viewport.

**Architecture:** All size constants move to a new `gridTheme.ts` consumed by `gridConstants.ts` (no consumers change). A new `useViewportCells` hook replaces the fixed-range loop in `GridCanvas.tsx`. `DomainEventNode.tsx` and `App.tsx` lose dead UI elements. All changes are purely UI — no domain, store, or use-case changes.

**Tech Stack:** TypeScript, React 19, React Flow (`@xyflow/react`), Vitest (unit), Playwright (e2e).

---

### Task 1: Centralise Grid Size Constants

**Files:**
- Create: `src/ui/components/Canvas/gridTheme.ts`
- Modify: `src/ui/components/Canvas/gridConstants.ts`

- [ ] **Step 1: Create `gridTheme.ts`**

```ts
// src/ui/components/Canvas/gridTheme.ts

/** Fixed grid cell size in pixels */
export const GRID_SIZE = 200;

/** Visual size of a sticky note (centered inside the cell) */
export const NOTE_SIZE = 160;

/** Margin around the note inside its grid cell */
export const NOTE_MARGIN = (GRID_SIZE - NOTE_SIZE) / 2;

/** Width of the fixed row label column (outside ReactFlow) */
export const LABEL_COLUMN_WIDTH = 72;

/** Diameter of React Flow connection handles */
export const HANDLE_SIZE = 16;
```

- [ ] **Step 2: Update `gridConstants.ts` to import from theme**

Replace the hardcoded constants at the top of `gridConstants.ts` with imports, keeping all functions and colour exports unchanged:

```ts
// src/ui/components/Canvas/gridConstants.ts
export { GRID_SIZE, NOTE_SIZE, NOTE_MARGIN } from './gridTheme';

/** Color used for command nodes on the minimap */
export const COMMAND_NODE_COLOR = '#3b82f6';

/** Color used for domain event nodes on the minimap */
export const DOMAIN_EVENT_NODE_COLOR = '#f59e0b';

/** Color used for read model nodes on the minimap */
export const READ_MODEL_NODE_COLOR = '#22c55e';

/** Color used for policy nodes on the minimap */
export const POLICY_NODE_COLOR = '#a855f7';

/** Color used for UI screen nodes on the minimap */
export const UI_SCREEN_NODE_COLOR = '#eab308';

/** Color used for edges between command and event nodes */
export const EDGE_COLOR = '#60a5fa';

import { GRID_SIZE, NOTE_MARGIN } from './gridTheme';

/** Convert discrete grid coordinates to React Flow pixel position (top-left of note). */
export function gridToPixel(column: number, row: number): { x: number; y: number } {
  return {
    x: column * GRID_SIZE + NOTE_MARGIN,
    y: row * GRID_SIZE + NOTE_MARGIN,
  };
}

/** Convert a pixel drop position back to the nearest grid cell. */
export function pixelToGrid(x: number, y: number): { column: number; row: number } {
  return {
    column: Math.round((x - NOTE_MARGIN) / GRID_SIZE),
    row: Math.round((y - NOTE_MARGIN) / GRID_SIZE),
  };
}

/** Convert a domain grid position to a React Flow pixel position. */
export function domainNodeToPixelPosition(gridPos: { column: number; row: number }): { x: number; y: number } {
  return gridToPixel(gridPos.column, gridPos.row);
}
```

- [ ] **Step 3: Run tests to verify nothing broke**

Run: `npm run test -- --run`
Expected: all tests pass (no snapshot or pixel-value tests exist that reference 250/200).

- [ ] **Step 4: Commit**

```bash
git add src/ui/components/Canvas/gridTheme.ts src/ui/components/Canvas/gridConstants.ts
git commit -s -m "refactor(canvas): extract grid size constants into gridTheme.ts"
```

---

### Task 2: CSS — Resize Notes, Label Column and Handles

**Files:**
- Modify: `src/App.css`

- [ ] **Step 1: Resize all node components from 200px to 160px**

In `src/App.css`, change every occurrence of `width: 200px; height: 200px` to `width: 160px; height: 160px` for the five node classes AND `.cell-quick-add`:

```css
/* these six blocks each get: */
width: 160px;
height: 160px;
```

Classes to update: `.domain-event-node`, `.command-node`, `.read-model-node`, `.policy-node`, `.ui-screen-node`, `.cell-quick-add`.

- [ ] **Step 2: Resize the fixed row label column from 100px to 72px**

```css
.fixed-row-labels-column {
  width: 72px;
  /* (keep all other properties) */
}

.fixed-row-label {
  width: 72px;
  font-size: 9px;   /* was 10px */
  /* (keep all other properties) */
}
```

- [ ] **Step 3: Enlarge all connection handles from 10px to 16px**

All five handle classes share the same two lines. Change:
```css
width: 10px !important;
height: 10px !important;
```
to:
```css
width: 16px !important;
height: 16px !important;
```

Classes to update: `.event-handle`, `.command-handle`, `.read-model-handle`, `.policy-handle`, `.ui-screen-handle`.

- [ ] **Step 4: Remove `.note-add-command` block**

Delete all CSS rules under the comment `/* ─── Add command button on domain event ──────────────── */` including the `.note-add-command`, `.domain-event-node:hover .note-add-command`, `.domain-event-node.selected .note-add-command`, and `.note-add-command:hover` rule blocks.

- [ ] **Step 5: Run lint and build to verify no CSS issues**

Run: `npm run lint && npm run build`
Expected: PASS with no errors.

- [ ] **Step 6: Commit**

```bash
git add src/App.css
git commit -s -m "style(canvas): resize notes to 160px, label column to 72px, handles to 16px"
```

---

### Task 3: Remove NodePalette and "+" Button

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/ui/components/Canvas/DomainEventNode.tsx`

- [ ] **Step 1: Remove `NodePalette` from `App.tsx`**

Remove the import and JSX usage:

```tsx
// src/App.tsx — remove these two lines:
import { NodePalette } from './ui/components/Toolbar/NodePalette';

// and remove from JSX:
<NodePalette />
```

Also update the hint text in the header:

```tsx
// old:
Right-click to add · Click + to add Command · Drag to move · Alt+click to select column
// new:
Hover to add · Drag handles to connect · Drag to move · Alt+click to select column
```

- [ ] **Step 2: Remove "+" button from `DomainEventNode.tsx`**

Remove `addCommandNode` from the destructuring, the `handleAddCommand` callback, and the `<button className="note-add-command">` JSX:

```tsx
// Remove from destructuring:
const { updateLabel, removeNode, addCommandNode } = useBoardActions();
// becomes:
const { updateLabel, removeNode } = useBoardActions();

// Remove entirely:
const handleAddCommand = useCallback(() => {
  const commandId = `command-${crypto.randomUUID()}`;
  addCommandNode(commandId, 'Command', nodeData.column, nodeData.row - 1, id);
}, [addCommandNode, id, nodeData.column, nodeData.row]);

// Remove entirely from JSX:
<button
  className="note-add-command"
  onClick={handleAddCommand}
  title="Add command"
  aria-label="Add command"
>
  +
</button>
```

- [ ] **Step 3: Run tests**

Run: `npm run test -- --run`
Expected: PASS — no test references `note-add-command` or `addCommandNode` from the node component.

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx src/ui/components/Canvas/DomainEventNode.tsx
git commit -s -m "feat(ui): remove NodePalette and domain event add-command button"
```

---

### Task 4: Viewport-Aware Quick-Add Cells Hook

**Files:**
- Create: `src/ui/hooks/useViewportCells.ts`

- [ ] **Step 1: Create `useViewportCells.ts`**

```ts
// src/ui/hooks/useViewportCells.ts
import { useMemo } from 'react';
import { pixelToGrid } from '../components/Canvas/gridConstants';
import { GRID_SIZE } from '../components/Canvas/gridTheme';

interface Viewport {
  x: number;
  y: number;
  zoom: number;
}

interface ViewportCellsOptions {
  viewport: Viewport;
  containerWidth: number;
  containerHeight: number;
  occupiedCells: ReadonlySet<string>;
  rows: readonly number[];
  columnBuffer?: number;
  rowBuffer?: number;
}

/** Returns the list of {column, row} positions that are visible in the viewport and not occupied. */
export function useViewportCells({
  viewport,
  containerWidth,
  containerHeight,
  occupiedCells,
  rows,
  columnBuffer = 2,
  rowBuffer = 1,
}: ViewportCellsOptions): Array<{ column: number; row: number }> {
  // Coarsen key: round viewport offset to nearest grid cell to avoid recomputing every pixel during panning
  const coarseX = Math.round(viewport.x / GRID_SIZE);
  const coarseY = Math.round(viewport.y / GRID_SIZE);

  return useMemo(() => {
    // Convert viewport corners to flow coordinates
    const topLeftFlow = {
      x: -viewport.x / viewport.zoom,
      y: -viewport.y / viewport.zoom,
    };
    const bottomRightFlow = {
      x: (containerWidth - viewport.x) / viewport.zoom,
      y: (containerHeight - viewport.y) / viewport.zoom,
    };

    const minGrid = pixelToGrid(topLeftFlow.x, topLeftFlow.y);
    const maxGrid = pixelToGrid(bottomRightFlow.x, bottomRightFlow.y);

    const minCol = Math.max(0, minGrid.column - columnBuffer);
    const maxCol = maxGrid.column + columnBuffer;

    const cells: Array<{ column: number; row: number }> = [];

    for (const row of rows) {
      const minRow = Math.max(0, row - rowBuffer);
      const maxRow = row + rowBuffer;
      for (let r = minRow; r <= maxRow; r++) {
        if (!rows.includes(r) && r !== row) continue;
        for (let col = minCol; col <= maxCol; col++) {
          if (!occupiedCells.has(`${col},${r}`)) {
            cells.push({ column: col, row: r });
          }
        }
      }
    }

    // Deduplicate
    const seen = new Set<string>();
    return cells.filter(({ column, row }) => {
      const key = `${column},${row}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coarseX, coarseY, viewport.zoom, containerWidth, containerHeight, occupiedCells, rows, columnBuffer, rowBuffer]);
}
```

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/ui/hooks/useViewportCells.ts
git commit -s -m "feat(canvas): add useViewportCells hook for viewport-aware quick-add cells"
```

---

### Task 5: Wire `useViewportCells` Into `GridCanvas.tsx`

**Files:**
- Modify: `src/ui/components/Canvas/GridCanvas.tsx`

- [ ] **Step 1: Add container size tracking and import the hook**

At the top of `GridCanvasInner`, add a ref + ResizeObserver to track the container dimensions, and import the hook:

```tsx
// Add import at top of file:
import { useViewportCells } from '../../hooks/useViewportCells';
import { useRef, useEffect } from 'react'; // (already imported via React, just ensure useRef/useEffect are included)

// Inside GridCanvasInner, after existing state declarations:
const containerRef = useRef<HTMLDivElement>(null);
const [containerSize, setContainerSize] = useState({ width: 800, height: 600 });

useEffect(() => {
  const el = containerRef.current;
  if (!el) return;
  const observer = new ResizeObserver(([entry]) => {
    const { width, height } = entry.contentRect;
    setContainerSize({ width, height });
  });
  observer.observe(el);
  return () => observer.disconnect();
}, []);
```

- [ ] **Step 2: Replace the fixed quick-add loop with the hook**

Inside `reactFlowNodes` useMemo, remove the `for (let row…) for (let col…)` loop and replace it with a call to `useViewportCells`. Because hooks cannot be called inside `useMemo`, compute `occupiedCells` and `rowsToRender` outside the memo, call the hook at the component level, and consume the result inside the memo:

```tsx
// Outside the reactFlowNodes memo — collect occupiedCells and rowsToRender:
const { occupiedCells, rowsToRender } = useMemo(() => {
  const occupied = new Set<string>();
  const boundedContextRows = boundedContextRowRenderData.rows.map((e) => 2 + e.index);
  const allRows = [...FIXED_ROWS, ...boundedContextRows];
  const projection: BoardProjection = {
    onDomainEventNode(_id, _l, col, row) { occupied.add(`${col},${row}`); },
    onCommandNode(_id, _l, col, row) { occupied.add(`${col},${row}`); },
    onReadModelNode(_id, _l, col, row) { occupied.add(`${col},${row}`); },
    onPolicyNode(_id, _l, col, row) { occupied.add(`${col},${row}`); },
    onUIScreenNode(_id, _l, col, row) { occupied.add(`${col},${row}`); },
  };
  board.describeTo(projection);
  return { occupiedCells: occupied, rowsToRender: allRows };
}, [board, boundedContextRowRenderData]);

// At component level (not inside useMemo):
const viewportCells = useViewportCells({
  viewport,
  containerWidth: containerSize.width,
  containerHeight: containerSize.height,
  occupiedCells,
  rows: rowsToRender,
});

// Inside reactFlowNodes useMemo, replace the double loop with:
for (const { column, row } of viewportCells) {
  const options = cellNodeOptions(row);
  const position = domainNodeToPixelPosition({ column, row });
  result.push({
    id: `quick-add-${column}-${row}`,
    type: 'cellQuickAdd',
    position,
    data: { column, row, options },
    style: { width: NOTE_SIZE, height: NOTE_SIZE },
    draggable: false,
    selectable: false,
    focusable: false,
  });
}
```

Also attach `containerRef` to the outer div wrapping ReactFlow:

```tsx
<div ref={containerRef} style={{ flex: 1, position: 'relative' }}>
```

- [ ] **Step 3: Run full test suite**

Run: `npm run test -- --run`
Expected: PASS.

- [ ] **Step 4: Run e2e tests**

Run: `npx playwright test tests/e2e/grid-canvas.spec.ts`
Expected: PASS (14 tests).

- [ ] **Step 5: Run build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/ui/components/Canvas/GridCanvas.tsx
git commit -s -m "feat(canvas): replace fixed quick-add loop with viewport-aware cells"
```

---

## Self-Review

**Spec coverage:**
- Section 1 (theme centralization): Task 1 ✓
- Section 2 (viewport-aware quick-add): Tasks 4 + 5 ✓
- Section 3a (remove NodePalette): Task 3 Step 1 ✓
- Section 3b (remove "+" button): Task 3 Step 2 ✓
- Section 3c (hint text): Task 3 Step 1 ✓
- Section 4 (larger handles): Task 2 Step 3 ✓
- Section 5 (note 160px, label 72px): Task 2 Steps 1–2 ✓

**Placeholder scan:** All steps contain concrete code. No TBD.

**Type consistency:** `useViewportCells` takes `rows: readonly number[]` which matches `rowsToRender: number[]` passed from `GridCanvas.tsx`. `GRID_SIZE` / `NOTE_SIZE` / `NOTE_MARGIN` exported from `gridTheme.ts` and re-exported via `gridConstants.ts` — all consumers unchanged.
