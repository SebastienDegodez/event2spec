# Bounded Context Canvas Editing — Spec

**Date:** 2026-04-15
**Status:** Approved
**Builds on:** [2026-04-09-event-modeling-board-redesign](2026-04-09-event-modeling-board-redesign.md), [2026-04-14-board-ui-refinements](2026-04-14-board-ui-refinements.md)

---

## Context

Bounded context management currently lives in a dedicated `BoundedContextPanel` sidebar. All add, rename and delete operations are performed there, disconnected from the visual canvas rows. This spec moves all bounded context editing interactions directly onto the canvas rows, then removes the sidebar panel.

---

## Goal

- **Add** a bounded context via a "+" button displayed between rows and below the last row.
- **Rename** a bounded context by clicking its label inline in the canvas row.
- **Delete** a bounded context via a hover-revealed "×" button, with a custom confirmation modal when the row contains domain events.
- Remove `BoundedContextPanel` entirely from the sidebar and from `App.tsx`.

---

## Section 1 — `BoundedContextRowBackgroundNode` (interactive row)

### Current state

`pointerEvents: 'none'` — fully passive. Displays `name` and `color` only.

### Target state

The node becomes interactive. Its `data` shape expands:

```ts
type BoundedContextRowBackgroundNodeData = {
  id: string;
  name: string;
  color: string;
  hasDomainEvents: boolean;
  onRename: (id: string, name: string) => void;
  onDelete: (id: string) => void;
};
```

`pointerEvents` is set to `'auto'` on the label zone only (the left ~220px), keeping the wide row non-blocking for node interactions elsewhere.

#### Rename interaction

- The left zone renders the BC name as a clickable `<button>`.
- Clicking enters **inline edit mode**: replaces the button with a focused `<input>` pre-filled with the current name.
- Committing on `blur` or `Enter` calls `onRename(id, trimmedValue)` if the value changed and is non-empty; otherwise reverts.
- `Escape` reverts without saving.

#### Delete interaction

- A "×" button sits to the right of the name, visible only on hover of the label zone (`opacity: 0` → `opacity: 1`).
- Click behavior:
  - If `hasDomainEvents === false` → calls `onDelete(id)` directly.
  - If `hasDomainEvents === true` → opens `ConfirmDeleteModal`.

---

## Section 2 — `ConfirmDeleteModal`

A new generic component at `src/ui/components/ConfirmDeleteModal.tsx`.

### Props

```ts
interface ConfirmDeleteModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}
```

### Behaviour

- Rendered as a React portal into `document.body`.
- Overlay: full-screen dark semi-transparent backdrop.
- Card: centered, ~400px wide, containing:
  - Title: "Supprimer le bounded context ?"
  - `message` paragraph (e.g. *"Ce bounded context contient 3 domain events qui seront supprimés."*)
  - Two buttons: **Annuler** (calls `onCancel`) and **Supprimer** (calls `onConfirm`, styled destructive red).
- `Escape` keypress calls `onCancel`.
- Click on backdrop calls `onCancel`.

### State ownership

Modal open/close state is local to `BoundedContextRowBackgroundNode` — no store involvement.

---

## Section 3 — `BoundedContextInsertNode` (add row button)

A new node type `boundedContextInsert` rendered by a new component `src/ui/components/Canvas/BoundedContextInsertNode.tsx`.

### Data shape

```ts
type BoundedContextInsertNodeData = {
  onCreate: () => void;
};
```

### Appearance

- A thin horizontal line with a "+" button centered on it.
- Subtle, low-visual-weight (dashed line, muted color matching the BC row color scheme).
- `pointerEvents: 'auto'` on the button only.

### Positioning (computed in `GridCanvas`)

`GridCanvas` generates one insert node per "gap":
- Between row `2 + i` and row `2 + i + 1` for each pair of adjacent BC rows.
- After the last BC row (i.e., below the last bounded context).

Position Y: the insert node sits at `(lastBCRow + 1) * GRID_SIZE` for the "after last" slot, and between rows for inter-row gaps.

`onCreate` calls `createBoundedContext(crypto.randomUUID(), 'New Bounded Context')` via `useBoundedContextActions`.

---

## Section 4 — `GridCanvas` changes

### `boundedContextRowRenderData` memo

Enriched to compute `hasDomainEvents` per BC:

```ts
// After collecting bgNodes and rows, scan board for domain events
const bcIdsWithEvents = new Set<string>();
board.describeTo({
  onDomainEventNode(_id, _label, _col, _row, boundedContextId) {
    if (boundedContextId) bcIdsWithEvents.add(boundedContextId);
  },
  // other handlers: noop
});
```

Each `bgNode.data` receives `hasDomainEvents: bcIdsWithEvents.has(id)`.

### Callbacks

`onRename` and `onDelete` are stable `useCallback` references defined in `GridCanvas`, pulling `renameBoundedContext` and `deleteBoundedContext` from `useBoundedContextActions`. Passed into each `bgNode.data`.

### Insert nodes

`GridCanvas` generates `BoundedContextInsertNode` entries in `reactFlowNodes` alongside the background nodes. They use `draggable: false`, `selectable: false`, `focusable: false`, `zIndex: 0`.

The `nodeTypes` map gains two new entries:
```ts
boundedContextRowBackground: BoundedContextRowBackgroundNode,
boundedContextInsert: BoundedContextInsertNode,
```

---

## Section 5 — Removals

| File | Action |
|------|--------|
| `src/ui/components/Slices/BoundedContextPanel.tsx` | Deleted |
| `tests/` (BoundedContextPanel tests, if any) | Deleted |
| `src/App.tsx` — `<BoundedContextPanel />` import and usage | Removed |

---

## Section 6 — Tests

### `BoundedContextRowBackgroundNode`

| Scenario | Assertion |
|----------|-----------|
| Click label | Input appears, pre-filled with name |
| Input blur with new value | `onRename` called with trimmed value |
| Input `Escape` | Reverts to original name, `onRename` not called |
| Hover + click "×", `hasDomainEvents: false` | `onDelete` called directly |
| Hover + click "×", `hasDomainEvents: true` | `ConfirmDeleteModal` rendered |
| Modal "Annuler" | Modal closes, `onDelete` not called |
| Modal "Supprimer" | `onDelete` called |

### `BoundedContextInsertNode`

| Scenario | Assertion |
|----------|-----------|
| Click "+" | `onCreate` called |

### `ConfirmDeleteModal`

| Scenario | Assertion |
|----------|-----------|
| Rendered | Shows title and message |
| Click "Annuler" | `onCancel` called |
| Click "Supprimer" | `onConfirm` called |
| Press `Escape` | `onCancel` called |
| Click backdrop | `onCancel` called |
