# Board UI Refinements — Spec

**Date:** 2026-04-14  
**Status:** Draft  
**Builds on:** [2026-04-09-event-modeling-board-redesign](2026-04-09-event-modeling-board-redesign.md)

---

## Context

The board redesign (2026-04-09) established the correct Event Modeling structure. This follow-up addresses UI ergonomics: the sidebar palette is now redundant (hover-to-add suffices), the grid cells are too large, the label column too wide, the "+" button on Domain Events no longer needed, and quick-add cells don't extend to the full visible viewport.

---

## Goal

Refine the board's visual density, remove redundant controls, extend hover-to-add to the full viewport, and enlarge connection handles for easier drag-to-connect.

---

## Section 1 — Grid Theme Centralization

Extract size constants into a dedicated `src/ui/components/Canvas/gridTheme.ts` file:

| Constant | Old value | New value |
|----------|-----------|-----------|
| `GRID_SIZE` | 250px | 200px |
| `NOTE_SIZE` | 200px | 160px |
| `NOTE_MARGIN` | 25px | 20px (computed) |
| `LABEL_COLUMN_WIDTH` | 100px | 72px |
| `HANDLE_SIZE` | 10px | 16px |

`gridConstants.ts` imports from `gridTheme.ts` and re-exports existing functions (`gridToPixel`, `pixelToGrid`, `domainNodeToPixelPosition`) using the new values.

---

## Section 2 — Viewport-Aware Quick-Add Cells

### Problem

Quick-add cells are currently generated for columns `0..maxColumn+1` and rows `0..maxRow`. Hovering beyond the last occupied column shows nothing.

### Solution

A new hook `src/ui/hooks/useViewportCells.ts`:

- Inputs: React Flow viewport (`x`, `y`, `zoom`), container dimensions, set of occupied cell keys
- Computes visible grid range from the viewport corners using `pixelToGrid`
- Adds a 2-column / 1-row buffer around the visible range
- Clamps `column >= 0` and `row >= 0`
- Returns `Array<{ column: number; row: number }>` (empty cells only)
- Uses `useMemo` with a coarsened viewport key (rounded to nearest grid cell) to avoid recalculating every frame during panning

`GridCanvas.tsx` replaces its `for (let row…) for (let col…)` loop with this hook's output. Quick-add cells now extend to the entire visible area and beyond.

### Row filtering

The hook generates cells for all visible rows. Rows beyond `maxBoundedContextRow` are included — they just won't have CellNodeOptions until a bounded context exists at that row. The `cellNodeOptions(row)` function already handles this correctly (returns domain event options for any `row >= 2`).

---

## Section 3 — UI Removals

### 3a. Remove NodePalette

- Remove `<NodePalette />` from `App.tsx` sidebar
- `NodePalette.tsx` remains in the codebase (not deleted), just unreferenced
- Sidebar retains `BoundedContextPanel` and `SlicePanel`

### 3b. Remove "+" button on DomainEventNode

- Remove the `<button className="note-add-command">` element and `handleAddCommand` callback from `DomainEventNode.tsx`
- Remove `addCommandNode` from the `useBoardActions()` destructuring in that component
- Remove `.note-add-command` CSS rules from `App.css`

### 3c. Update header hint text

Old: `"Right-click to add · Click + to add Command · Drag to move · Alt+click to select column"`

New: `"Hover to add · Drag handles to connect · Drag to move · Alt+click to select column"`

---

## Section 4 — Larger Connection Handles

All handle classes (`.event-handle`, `.command-handle`, `.read-model-handle`, `.policy-handle`, `.ui-screen-handle`) change from `10×10px` to `16×16px`.

The handles remain hidden by default and appear on hover/selection (existing behavior). The larger size makes drag-to-connect significantly easier.

Connection validation remains unchanged — `resolveConnectionType` already restricts to the 6 valid Event Modeling connections:

| Source | Target | Connection |
|--------|--------|------------|
| Command | DomainEvent | triggers |
| DomainEvent | ReadModel | feeds |
| DomainEvent | Policy | triggers policy |
| Policy | Command | executes |
| UIScreen | Command | user action |
| ReadModel | UIScreen | displays |

---

## Section 5 — CSS Size Adjustments

### Notes (160×160px)

All node classes (`.domain-event-node`, `.command-node`, `.read-model-node`, `.policy-node`, `.ui-screen-node`, `.cell-quick-add`) set `width: 160px; height: 160px`.

The inline `style={{ width: NOTE_SIZE, height: NOTE_SIZE }}` in `GridCanvas.tsx` already consumes `NOTE_SIZE` from `gridConstants.ts`, so the JS side is automatic after the theme change.

### Label column (72px)

- `.fixed-row-labels-column` → `width: 72px`
- `.fixed-row-label` → `width: 72px`
- Font-size reduced from `10px` to `9px` for label text

---

## Files Changed

| File | Change |
|------|--------|
| `src/ui/components/Canvas/gridTheme.ts` | **New** — centralized size constants |
| `src/ui/components/Canvas/gridConstants.ts` | Import from `gridTheme.ts` instead of hardcoded values |
| `src/ui/hooks/useViewportCells.ts` | **New** — viewport-aware empty cell computation |
| `src/ui/components/Canvas/GridCanvas.tsx` | Use `useViewportCells`, remove old column/row loop |
| `src/ui/components/Canvas/DomainEventNode.tsx` | Remove "+" button and `handleAddCommand` |
| `src/App.tsx` | Remove `NodePalette`, update hint text |
| `src/App.css` | Handle sizes 16px, note sizes 160px, label column 72px, remove `.note-add-command` styles |

---

## Out of Scope

- Removing `NodePalette.tsx` file from the repo
- Refactoring other node components
- Changing connection types or adding new ones
- Touch/mobile optimizations
