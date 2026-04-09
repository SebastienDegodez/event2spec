# Event Modeling Board Redesign — Spec

**Date:** 2026-04-09  
**Status:** Approved

---

## Context

The current board uses swimlanes as actor-typed rows (Human, System, External). This does not match the Event Modeling standard (Adam Dymitruk). In the real Event Modeling process, the board has fixed rows for UI and Commands/ReadModels, and dynamic swimlanes representing **Bounded Contexts** that contain Domain Events.

---

## Goal

Restructure the board so it is 100% faithful to Event Modeling:

- 2 fixed rows (UI Mockups, Commands + Read Models)
- Dynamic swimlanes = Bounded Contexts, containing only Domain Events
- Left-to-right timeline is enforced; arrows never go backward
- `actorType` concept removed entirely

---

## Section 1 — Board Structure

The board is composed of 3 zones:

```
Row 0  │  UI Mockups         │  Fixed, non-deletable, label "UI"
Row 1  │  Commands / RM      │  Fixed, non-deletable, label "Cmd · RM"
Row 2  │  Bounded Context 0  │  Dynamic swimlane (DomainEvents only)
Row 3  │  Bounded Context 1  │  Dynamic swimlane (DomainEvents only)
Row N  │  Bounded Context N-2│  Dynamic swimlane (DomainEvents only)
```

- Rows 0 and 1 are structurally fixed — no swimlane label, no delete, no reorder.
- Swimlanes (rows 2+) are Bounded Contexts: named, addable, deletable, renameable.
- Slices group columns vertically across all rows.
- The localStorage format is versioned (`v2`). If a `v1` format is detected on load, the board resets silently (no migration).

---

## Section 2 — Domain Changes

### Removed

| Symbol | Reason |
|--------|--------|
| `ActorType` | Replaced by Bounded Context concept |
| `SwimlaneCategory` (`actor_ui`, `command_readmodel`, `event`) | Rows are now absolute (0, 1, 2+) |
| `ROWS_PER_SWIMLANE` | No longer meaningful |
| `SwimlaneLayout.ts` (`swimlaneGridRow`, `gridRowToSwimlane`) | Row = absolute index |
| `Swimlane` (old domain object with `actorType`) | Replaced by `BoundedContext` |
| `SwimlaneCollection` | Replaced by `BoundedContextCollection` |
| `SwimlaneRepository` / `SwimlaneProjection` | Replaced by BC equivalents |
| `BoundedContextOverlayNode` (canvas overlay) | Swimlanes are the BCs |

### Kept unchanged

- `GridBoard`, `BoardNode`, `GridPosition` — no change
- `VerticalSlice` with `boundedContextId` — already present
- `NodeLink`, `ConnectionType`, `resolveConnectionType` — no change
- `Scenario`, `ScenarioDialog` — no change
- Export handlers (JSON, Markdown) — minor update for new structure

### Updated

**`DomainEventNode`** gains a `boundedContextId: string` field (which BC swimlane it belongs to). This determines its `row` at render time: `row = 2 + bcIndex`.

**`BoundedContext(id, name)`** — already exists, unchanged.

**`BoundedContextCollection`** — already exists, becomes the primary swimlane collection.

**`nodeKindToCategory`** — deleted. Replaced by a simpler `nodeKindToRow(kind, bcIndex?)`:

```typescript
function nodeKindToRow(kind: NodeKind, bcIndex?: number): number {
  if (kind === 'uiScreen') return 0;
  if (kind === 'command' || kind === 'readModel' || kind === 'policy') return 1;
  if (kind === 'domainEvent') return 2 + (bcIndex ?? 0);
  return 0;
}
```

---

## Section 3 — Canvas & Visual Rendering

### Row layout (pixels)

```
Row 0 : y = 0            → uiScreen
Row 1 : y = GRID_SIZE    → command, readModel, policy
Row 2 : y = 2*GRID_SIZE  → domainEvent (BC index 0)
Row 3 : y = 3*GRID_SIZE  → domainEvent (BC index 1)
```

### Fixed row labels

A fixed, non-interactive overlay at the left edge of the canvas (outside ReactFlow) displays:
- `UI` at y = 0
- `Cmd · RM` at y = GRID_SIZE

These are purely visual, not part of the node system.

### Bounded Context swimlanes

Each BC rendered as a `SwimlaneBackgroundNode` spanning the full canvas width and `GRID_SIZE` height. The BC name is displayed as the lane label (same visual pattern as current swimlanes).

The `BoundedContextOverlayNode` (column-based colored overlay) is removed. Swimlanes *are* the BCs.

### CellQuickAdd behavior

| Row | Available options |
|-----|------------------|
| Row 0 | `U` (UIScreen) |
| Row 1 | `C` (Command), `R` (ReadModel), `P` (Policy) |
| Row ≥ 2 (BC row) | `E` (DomainEvent) only |

On hover, the cell shows only the relevant letter button(s). Clicking adds the node at that column+row and assigns `boundedContextId` for domain events.

### Drag & drop placement rules

| Node type | Valid rows | Invalid rows |
|-----------|-----------|--------------|
| `uiScreen` | 0 only | 1, 2+ |
| `command`, `readModel`, `policy` | 1 only | 0, 2+ |
| `domainEvent` | 2+ only | 0, 1 |

Invalid drops are silently ignored. On a valid drop to a BC row, the node's `boundedContextId` is updated to match the BC at that row.

---

## Section 4 — Persistence & Migration

### localStorage version

The persisted state gains a `version` field:

```typescript
interface PersistedState {
  version: 2;
  nodes: PersistedNode[];
  links: NodeLink[];
  boundedContexts: PersistedBoundedContext[];
  slices: PersistedSlice[];
  nodeProperties: Record<string, NodeProperties>;
}
```

On load: if `version !== 2` or missing → `localStorage.removeItem(STORAGE_KEY)` → load defaults.

### Default state (empty board)

On first load (or after reset), the board initializes with **no swimlanes** — the user creates their first Bounded Context from the sidebar panel. The fixed rows (UI, Cmd·RM) are always visible without any swimlane data.

---

## Section 5 — UI / Sidebar

The "Bounded Contexts" panel (already present) becomes the **primary swimlane manager**:

- Create BC → adds a new swimlane row at the bottom
- Rename BC → renames the swimlane label
- Delete BC → removes the swimlane. Domain Events in that BC have their `boundedContextId` cleared and are placed in a "orphan" holding area (or deleted — TBD, see below)

**Deletion behavior for orphaned events:** When a BC is deleted, its Domain Events are also deleted from the board.

The old `SwimlanePanel` (actor-based) is removed.

---

## Out of Scope

- Multi-row BCs (a BC spanning multiple rows)
- Drag to reorder BC swimlanes (can be added later)
- Undo/redo

---

## Open Questions (resolved)

| Question | Answer |
|----------|--------|
| Migration strategy | Reset (`v1` → delete localStorage) |
| Orphaned events on BC delete | Delete the events too |
| Fixed row labels | Simple CSS overlay, not a React Flow node |
