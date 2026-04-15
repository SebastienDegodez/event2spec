# Event Modeling Board Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace actor-based swimlanes with Event Modeling-faithful fixed rows plus dynamic bounded-context rows, including row-constrained interactions, v2 persistence reset policy, and updated exports.

**Architecture:** Keep `GridBoard` and node immutability, but move row semantics to a deterministic row-mapping layer: rows `0` and `1` are fixed by node kind, rows `2+` are bound to bounded-context index. `DomainEventNode` gains `boundedContextId`; canvas rendering, quick-add, drag/drop rules, and persistence all consume this source of truth. Store/use-cases remain CQS-compliant with repository ports for bounded contexts and slices, while board mutation stays command-driven.

**Tech Stack:** TypeScript, React 19, React Flow (`@xyflow/react`), Zustand, Vitest, Playwright.

---

### Task 1: Replace Category-Based Row Model With Absolute Row Rules

**Files:**
- Create: `src/core/domain/nodeKindToRow.ts`
- Modify: `src/core/domain/CellNodeOptions.ts`
- Delete: `src/core/domain/nodeKindToCategory.ts`
- Delete: `src/core/domain/SwimlaneCategory.ts`
- Delete: `src/core/domain/SwimlaneLayout.ts`
- Delete: `tests/core/domain/nodeKindToCategory.test.ts`
- Delete: `tests/core/domain/SwimlaneLayout.test.ts`
- Create: `tests/core/domain/nodeKindToRow.test.ts`
- Create: `tests/core/domain/cellNodeOptions.test.ts`

- [x] **Step 1: Write failing tests for row mapping and row-based quick-add options**

```ts
// tests/core/domain/nodeKindToRow.test.ts
import { describe, it, expect } from 'vitest';
import { nodeKindToRow } from '../../../src/core/domain/nodeKindToRow';

describe('nodeKindToRow', () => {
  it('maps uiScreen to row 0', () => {
    expect(nodeKindToRow('uiScreen')).toBe(0);
  });

  it('maps command/readModel/policy to row 1', () => {
    expect(nodeKindToRow('command')).toBe(1);
    expect(nodeKindToRow('readModel')).toBe(1);
    expect(nodeKindToRow('policy')).toBe(1);
  });

  it('maps domainEvent to bounded context row (2 + index)', () => {
    expect(nodeKindToRow('domainEvent', 0)).toBe(2);
    expect(nodeKindToRow('domainEvent', 3)).toBe(5);
  });
});
```

```ts
// tests/core/domain/cellNodeOptions.test.ts
import { describe, it, expect } from 'vitest';
import { cellNodeOptions } from '../../../src/core/domain/CellNodeOptions';

describe('cellNodeOptions', () => {
  it('returns only UI screen in row 0', () => {
    expect(cellNodeOptions(0).map((o) => o.kind)).toEqual(['uiScreen']);
  });

  it('returns command, read model and policy in row 1', () => {
    expect(cellNodeOptions(1).map((o) => o.kind)).toEqual(['command', 'readModel', 'policy']);
  });

  it('returns only domain event in row >= 2', () => {
    expect(cellNodeOptions(2).map((o) => o.kind)).toEqual(['domainEvent']);
    expect(cellNodeOptions(9).map((o) => o.kind)).toEqual(['domainEvent']);
  });
});
```

- [x] **Step 2: Run tests to verify they fail**

Run: `npm run test -- tests/core/domain/nodeKindToRow.test.ts tests/core/domain/cellNodeOptions.test.ts`
Expected: FAIL with missing module/functions (`nodeKindToRow`, new `cellNodeOptions` signature).

- [x] **Step 3: Implement absolute row utility and row-based quick-add options**

```ts
// src/core/domain/nodeKindToRow.ts
import { type NodeKind } from './NodeKind';

export function nodeKindToRow(kind: NodeKind, boundedContextIndex?: number): number {
  if (kind === 'uiScreen') return 0;
  if (kind === 'command' || kind === 'readModel' || kind === 'policy') return 1;
  if (kind === 'domainEvent') return 2 + (boundedContextIndex ?? 0);
  return 0;
}
```

```ts
// src/core/domain/CellNodeOptions.ts (signature-focused diff)
export function cellNodeOptions(row: number): readonly CellNodeOption[] {
  if (row === 0) return ACTOR_UI_OPTIONS;
  if (row === 1) return COMMAND_READMODEL_OPTIONS;
  return EVENT_OPTIONS;
}
```

- [x] **Step 4: Run tests to verify pass**

Run: `npm run test -- tests/core/domain/nodeKindToRow.test.ts tests/core/domain/cellNodeOptions.test.ts`
Expected: PASS.

- [x] **Step 5: Commit**

```bash
git add src/core/domain/nodeKindToRow.ts src/core/domain/CellNodeOptions.ts src/core/domain/nodeKindToCategory.ts src/core/domain/SwimlaneCategory.ts src/core/domain/SwimlaneLayout.ts tests/core/domain/nodeKindToRow.test.ts tests/core/domain/cellNodeOptions.test.ts tests/core/domain/nodeKindToCategory.test.ts tests/core/domain/SwimlaneLayout.test.ts
git commit -s -m "refactor(domain): replace swimlane categories with absolute row mapping"
```

### Task 2: Add Bounded Context Identity To Domain Events

**Files:**
- Modify: `src/core/domain/DomainEventNode.ts`
- Modify: `src/core/domain/BoardProjection.ts`
- Modify: `tests/helpers/collectNodes.ts`
- Modify: `tests/core/usecases/AddDomainEventNode/AddDomainEventNodeCommandHandler.test.ts`

- [x] **Step 1: Write failing tests for boundedContextId propagation in domain events**

```ts
// tests/core/usecases/AddDomainEventNode/AddDomainEventNodeCommandHandler.test.ts (new assertion)
it('stores boundedContextId on created domain event', () => {
  const board = handler.handle(
    GridBoard.empty(),
    new AddDomainEventNodeCommand('e1', 'OrderPlaced', 2, 2, 'bc-1')
  );

  const nodes = collectNodes(board);
  expect(nodes[0].type).toBe('domainEvent');
  expect(nodes[0].boundedContextId).toBe('bc-1');
});
```

- [x] **Step 2: Run test to verify it fails**

Run: `npm run test -- tests/core/usecases/AddDomainEventNode/AddDomainEventNodeCommandHandler.test.ts`
Expected: FAIL because command/node/projection do not expose `boundedContextId`.

- [x] **Step 3: Implement boundedContextId in event node and projection contracts**

```ts
// src/core/domain/BoardProjection.ts (callback change)
onDomainEventNode(id: string, label: string, column: number, row: number, boundedContextId: string | undefined): void;
```

```ts
// src/core/domain/DomainEventNode.ts (core change)
export class DomainEventNode extends BoardNode {
  readonly boundedContextId: string | undefined;

  constructor(id: string, label: string, position: GridPosition, boundedContextId: string | undefined) {
    super(id, label, position);
    this.boundedContextId = boundedContextId;
  }

  static create(id: string, label: string, column: number, row: number, boundedContextId?: string): DomainEventNode {
    return new DomainEventNode(id, label, new GridPosition(column, row), boundedContextId);
  }

  describeTo(projection: BoardProjection): void {
    const position = this.gridPosition();
    projection.onDomainEventNode(this.id, this.label, position.column, position.row, this.boundedContextId);
  }
}
```

```ts
// tests/helpers/collectNodes.ts (domainEvent shape)
export interface CollectedNode {
  id: string;
  label: string;
  column: number;
  row: number;
  type: 'domainEvent' | 'command' | 'readModel' | 'policy' | 'uiScreen';
  boundedContextId?: string;
}
```

- [x] **Step 4: Run test to verify pass**

Run: `npm run test -- tests/core/usecases/AddDomainEventNode/AddDomainEventNodeCommandHandler.test.ts`
Expected: PASS.

- [x] **Step 5: Commit**

```bash
git add src/core/domain/DomainEventNode.ts src/core/domain/BoardProjection.ts tests/helpers/collectNodes.ts tests/core/usecases/AddDomainEventNode/AddDomainEventNodeCommandHandler.test.ts
git commit -s -m "feat(domain): add bounded context identity to domain events"
```

### Task 3: Update Add/Move Commands To Enforce Row Constraints

**Files:**
- Modify: `src/core/usecases/commands/AddDomainEventNode/AddDomainEventNodeCommand.ts`
- Modify: `src/core/usecases/commands/AddDomainEventNode/AddDomainEventNodeCommandHandler.ts`
- Modify: `src/core/usecases/commands/MoveNode/MoveNodeCommandHandler.ts`
- Create: `src/core/domain/isRowValidForKind.ts`
- Create: `tests/core/domain/isRowValidForKind.test.ts`
- Create: `tests/core/usecases/MoveNode/MoveNodeCommandHandler.rowRules.test.ts`

- [x] **Step 1: Write failing tests for row-validity rules**

```ts
// tests/core/domain/isRowValidForKind.test.ts
import { describe, it, expect } from 'vitest';
import { isRowValidForKind } from '../../../src/core/domain/isRowValidForKind';

describe('isRowValidForKind', () => {
  it('accepts uiScreen only on row 0', () => {
    expect(isRowValidForKind('uiScreen', 0)).toBe(true);
    expect(isRowValidForKind('uiScreen', 1)).toBe(false);
  });

  it('accepts command/readModel/policy only on row 1', () => {
    expect(isRowValidForKind('command', 1)).toBe(true);
    expect(isRowValidForKind('command', 2)).toBe(false);
  });

  it('accepts domainEvent only on row >= 2', () => {
    expect(isRowValidForKind('domainEvent', 2)).toBe(true);
    expect(isRowValidForKind('domainEvent', 1)).toBe(false);
  });
});
```

```ts
// tests/core/usecases/MoveNode/MoveNodeCommandHandler.rowRules.test.ts
it('ignores invalid move of uiScreen to row 1', () => {
  // setup board with ui node at row 0, attempt move to row 1
  // assert board remains unchanged
});
```

- [x] **Step 2: Run tests to verify they fail**

Run: `npm run test -- tests/core/domain/isRowValidForKind.test.ts tests/core/usecases/MoveNode/MoveNodeCommandHandler.rowRules.test.ts`
Expected: FAIL because row-rules helper and move guards are missing.

- [x] **Step 3: Implement row constraints in use cases**

```ts
// src/core/domain/isRowValidForKind.ts
import { type NodeKind } from './NodeKind';

export function isRowValidForKind(kind: NodeKind, row: number): boolean {
  if (kind === 'uiScreen') return row === 0;
  if (kind === 'command' || kind === 'readModel' || kind === 'policy') return row === 1;
  if (kind === 'domainEvent') return row >= 2;
  return false;
}
```

```ts
// src/core/usecases/commands/MoveNode/MoveNodeCommandHandler.ts (behavior)
// project node kind from board, validate destination row via isRowValidForKind,
// return original board on invalid moves (silent ignore)
```

- [x] **Step 4: Run tests to verify pass**

Run: `npm run test -- tests/core/domain/isRowValidForKind.test.ts tests/core/usecases/MoveNode/MoveNodeCommandHandler.rowRules.test.ts`
Expected: PASS.

- [x] **Step 5: Commit**

```bash
git add src/core/domain/isRowValidForKind.ts src/core/usecases/commands/AddDomainEventNode/AddDomainEventNodeCommand.ts src/core/usecases/commands/AddDomainEventNode/AddDomainEventNodeCommandHandler.ts src/core/usecases/commands/MoveNode/MoveNodeCommandHandler.ts tests/core/domain/isRowValidForKind.test.ts tests/core/usecases/MoveNode/MoveNodeCommandHandler.rowRules.test.ts
git commit -s -m "feat(usecases): enforce fixed-row placement constraints"
```

### Task 4: Migrate Store Persistence To Version 2 With Reset-on-v1

**Files:**
- Modify: `src/core/store/useBoardStore.ts`
- Create: `tests/core/store/useBoardStore.persistence.test.ts`

- [x] **Step 1: Write failing tests for persistence versioning behavior**

```ts
// tests/core/store/useBoardStore.persistence.test.ts
import { describe, it, expect, beforeEach } from 'vitest';

describe('useBoardStore persistence v2', () => {
  beforeEach(() => localStorage.clear());

  it('resets storage when version is missing', () => {
    localStorage.setItem('event2spec-board', JSON.stringify({ nodes: [] }));
    // initialize store
    expect(localStorage.getItem('event2spec-board')).toBeNull();
  });

  it('loads state only when version === 2', () => {
    localStorage.setItem('event2spec-board', JSON.stringify({ version: 2, nodes: [], links: [], boundedContexts: [], slices: [], nodeProperties: {} }));
    // initialize store and expect no reset
  });
});
```

- [x] **Step 2: Run tests to verify they fail**

Run: `npm run test -- tests/core/store/useBoardStore.persistence.test.ts`
Expected: FAIL because persisted shape has no `version` and no reset logic.

- [x] **Step 3: Implement v2 persisted state and reset policy**

```ts
// src/core/store/useBoardStore.ts (persisted contract)
interface PersistedState {
  version: 2;
  nodes: PersistedNode[];
  links: NodeLink[];
  boundedContexts: PersistedBoundedContext[];
  slices: PersistedSlice[];
  nodeProperties: Record<string, NodeProperties>;
}

if (!parsed.version || parsed.version !== 2) {
  localStorage.removeItem(STORAGE_KEY);
  return emptyInitialState();
}
```

- [x] **Step 4: Run tests to verify pass**

Run: `npm run test -- tests/core/store/useBoardStore.persistence.test.ts`
Expected: PASS.

- [x] **Step 5: Commit**

```bash
git add src/core/store/useBoardStore.ts tests/core/store/useBoardStore.persistence.test.ts
git commit -s -m "feat(store): add v2 persistence and reset legacy board data"
```

### Task 5: Remove Swimlane Aggregate Usage From Store and Keep Fixed Rows Always Visible

**Files:**
- Modify: `src/core/store/useBoardStore.ts`
- Delete: `src/core/usecases/commands/AddSwimlane/*`
- Delete: `src/core/usecases/commands/RemoveSwimlane/*`
- Delete: `src/core/usecases/commands/RenameSwimlane/*`
- Delete: `src/core/usecases/commands/ReorderSwimlanes/*`
- Delete: `src/core/usecases/commands/ChangeSwimlaneActorType/*`
- Modify: `src/core/store/useBoardStore.ts` (remove `swimlanes` state/actions/selectors)
- Modify: `src/core/usecases/queries/ExportJSON/ExportJSONQueryHandler.ts`
- Modify: `src/core/usecases/queries/ExportMarkdown/ExportMarkdownQueryHandler.ts`

- [x] **Step 1: Write failing tests showing store no longer depends on swimlane collection**

```ts
// tests/core/store/useBoardStore.noSwimlanes.test.ts
import { describe, it, expect } from 'vitest';
import { useBoardStore } from '../../../src/core/store/useBoardStore';

describe('store without swimlanes aggregate', () => {
  it('initializes with boundedContexts and fixed-row semantics only', () => {
    const state = useBoardStore.getState();
    expect('swimlanes' in state).toBe(false);
  });
});
```

- [x] **Step 2: Run tests to verify fail**

Run: `npm run test -- tests/core/store/useBoardStore.noSwimlanes.test.ts`
Expected: FAIL because `swimlanes` state still exists.

- [x] **Step 3: Implement store cleanup and query signatures**

```ts
// useBoardStore.ts (remove swimlane repository wiring)
interface BoardStoreState {
  board: GridBoard;
  links: ReadonlyArray<NodeLink>;
  slices: VerticalSliceCollection;
  boundedContexts: BoundedContextCollection;
  // no swimlanes
}

// exportJSON/exportMarkdown calls now omit SwimlaneCollection argument
```

- [x] **Step 4: Run targeted suite**

Run: `npm run test -- tests/core/store/useBoardStore.noSwimlanes.test.ts tests/core/usecases/ExportJSON/ExportJSONQueryHandler.test.ts tests/core/usecases/ExportMarkdown/ExportMarkdownQueryHandler.test.ts`
Expected: PASS.

- [x] **Step 5: Commit** 

```bash
git add src/core/store/useBoardStore.ts src/core/usecases/queries/ExportJSON/ExportJSONQueryHandler.ts src/core/usecases/queries/ExportMarkdown/ExportMarkdownQueryHandler.ts src/core/usecases/commands/AddSwimlane src/core/usecases/commands/RemoveSwimlane src/core/usecases/commands/RenameSwimlane src/core/usecases/commands/ReorderSwimlanes src/core/usecases/commands/ChangeSwimlaneActorType tests/core/store/useBoardStore.noSwimlanes.test.ts tests/core/usecases/ExportJSON/ExportJSONQueryHandler.test.ts tests/core/usecases/ExportMarkdown/ExportMarkdownQueryHandler.test.ts
git commit -s -m "refactor(store): remove actor swimlane aggregate and commands"
```

### Task 6: Delete Domain Events And Links When Bounded Context Is Deleted

**Files:**
- Create: `src/core/usecases/commands/DeleteDomainEventsInBoundedContext/DeleteDomainEventsInBoundedContextCommand.ts`
- Create: `src/core/usecases/commands/DeleteDomainEventsInBoundedContext/DeleteDomainEventsInBoundedContextCommandHandler.ts`
- Modify: `src/core/store/useBoardStore.ts`
- Modify: `tests/core/usecases/DeleteBoundedContext/DeleteBoundedContextCommandHandler.test.ts`
- Create: `tests/core/usecases/DeleteDomainEventsInBoundedContext/DeleteDomainEventsInBoundedContextCommandHandler.test.ts`

- [x] **Step 1: Write failing test for cascade deletion of events on BC deletion**

```ts
// tests/core/usecases/DeleteDomainEventsInBoundedContext/DeleteDomainEventsInBoundedContextCommandHandler.test.ts
it('removes all domain events that belong to the deleted bounded context', () => {
  // board has events in bc-1 and bc-2
  // run handler for bc-1
  // assert only bc-2 event remains
});
```

```ts
// tests/core/store/useBoardStore.deleteBoundedContextCascade.test.ts
it('removes links attached to deleted bounded-context events', () => {
  // create command -> event(bc-1) link
  // delete bc-1
  // expect link removed
});
```

- [x] **Step 2: Run tests to verify fail**

Run: `npm run test -- tests/core/usecases/DeleteDomainEventsInBoundedContext/DeleteDomainEventsInBoundedContextCommandHandler.test.ts tests/core/store/useBoardStore.deleteBoundedContextCascade.test.ts`
Expected: FAIL because cascade behavior is missing.

- [x] **Step 3: Implement cascade deletion in store orchestration**

```ts
// store behavior sketch
// 1) collect domain event ids whose boundedContextId === deleted id
// 2) remove those nodes from board
// 3) remove links touching removed ids
// 4) persist board + links + boundedContexts + slices
```

- [x] **Step 4: Run tests to verify pass**

Run: `npm run test -- tests/core/usecases/DeleteDomainEventsInBoundedContext/DeleteDomainEventsInBoundedContextCommandHandler.test.ts tests/core/store/useBoardStore.deleteBoundedContextCascade.test.ts tests/core/usecases/DeleteBoundedContext/DeleteBoundedContextCommandHandler.test.ts`
Expected: PASS.

- [x] **Step 5: Commit**

```bash
git add src/core/usecases/commands/DeleteDomainEventsInBoundedContext src/core/store/useBoardStore.ts tests/core/usecases/DeleteBoundedContext/DeleteBoundedContextCommandHandler.test.ts tests/core/usecases/DeleteDomainEventsInBoundedContext/DeleteDomainEventsInBoundedContextCommandHandler.test.ts tests/core/store/useBoardStore.deleteBoundedContextCascade.test.ts
git commit -s -m "feat(bounded-context): cascade delete domain events on context removal"
```

### Task 7: Refactor Canvas Rendering To Fixed Rows + Bounded Context Rows

**Files:**
- Modify: `src/ui/components/Canvas/GridCanvas.tsx`
- Modify: `src/ui/components/Canvas/SwimlaneBackgroundNode.tsx`
- Delete: `src/ui/components/Canvas/BoundedContextOverlayNode.tsx`
- Modify: `src/ui/components/Canvas/CellQuickAddNode.tsx`
- Modify: `src/ui/components/Canvas/gridConstants.ts`
- Modify: `src/App.css`

- [x] **Step 1: Write failing UI tests for row overlays and quick-add rules**

```ts
// tests/e2e/grid-canvas.spec.ts (new cases)
test('shows fixed left labels UI and Cmd · RM', async ({ page }) => {
  await expect(page.getByText('UI')).toBeVisible();
  await expect(page.getByText('Cmd · RM')).toBeVisible();
});

test('row 0 quick-add offers only U', async ({ page }) => {
  // hover row 0 empty cell
  // assert only U button visible
});

test('row 1 quick-add offers C R P only', async ({ page }) => {
  // hover row 1 empty cell
});
```

- [x] **Step 2: Run tests to verify fail**

Run: `npm run test:e2e -- tests/e2e/grid-canvas.spec.ts`
Expected: FAIL because old sub-row model and overlays are still active.

- [x] **Step 3: Implement fixed-row and bounded-context row rendering**

```tsx
// GridCanvas.tsx (core rendering intent)
// - render fixed row labels as absolute overlay outside ReactFlow nodes
// - render row 2+ backgrounds from boundedContexts order
// - compute domain event display row from boundedContext index
// - remove boundedContextOverlay node type entirely
```

```ts
// CellQuickAddNode data remains row-based; options come from cellNodeOptions(row)
```

- [x] **Step 4: Run e2e and component-level tests**

Run: `npm run test:e2e -- tests/e2e/grid-canvas.spec.ts`
Expected: PASS.

- [x] **Step 5: Commit**

```bash
git add src/ui/components/Canvas/GridCanvas.tsx src/ui/components/Canvas/SwimlaneBackgroundNode.tsx src/ui/components/Canvas/CellQuickAddNode.tsx src/ui/components/Canvas/BoundedContextOverlayNode.tsx src/ui/components/Canvas/gridConstants.ts src/App.css tests/e2e/grid-canvas.spec.ts
git commit -s -m "feat(canvas): implement fixed rows and bounded-context swimlane rendering"
```

### Task 8: Enforce Drag-and-Drop Placement Rules And BC Reassignment

**Files:**
- Modify: `src/ui/components/Canvas/GridCanvas.tsx`
- Modify: `src/core/store/useBoardStore.ts`
- Create: `tests/core/store/useBoardStore.moveRules.test.ts`
- Modify: `tests/e2e/grid-canvas.spec.ts`

- [x] **Step 1: Write failing tests for invalid drop ignore and valid BC reassignment**

```ts
// tests/core/store/useBoardStore.moveRules.test.ts
it('ignores moving command to row 0', () => {
  // move command from row 1 to row 0, expect unchanged position
});

it('updates domainEvent boundedContextId when dropped on another BC row', () => {
  // drop event from row 2 (bc-1) to row 3 (bc-2), expect boundedContextId === bc-2
});
```

- [x] **Step 2: Run tests to verify fail**

Run: `npm run test -- tests/core/store/useBoardStore.moveRules.test.ts`
Expected: FAIL before move guards and BC reassignment are wired.

- [x] **Step 3: Implement drag/drop row guards + reassignment**

```ts
// GridCanvas.tsx onNodeDragStop
// 1) derive target row
// 2) ignore if invalid kind/row
// 3) for domainEvent row>=2, resolve bc at row and pass bc id to store move/update action
```

```ts
// useBoardStore.ts
// add action to update domain event boundedContextId on successful move between BC rows
```

- [x] **Step 4: Run tests to verify pass**

Run: `npm run test -- tests/core/store/useBoardStore.moveRules.test.ts && npm run test:e2e -- tests/e2e/grid-canvas.spec.ts`
Expected: PASS.

- [x] **Step 5: Commit**

```bash
git add src/ui/components/Canvas/GridCanvas.tsx src/core/store/useBoardStore.ts tests/core/store/useBoardStore.moveRules.test.ts tests/e2e/grid-canvas.spec.ts
git commit -s -m "feat(interaction): enforce node row-drop rules and bounded context reassignment"
```

### Task 9: Promote Bounded Context Panel As Primary Swimlane Manager

**Files:**
- Modify: `src/App.tsx`
- Delete: `src/ui/components/Toolbar/SwimlanePanel.tsx`
- Modify: `src/ui/components/Slices/BoundedContextPanel.tsx`
- Modify: `src/App.css`
- Modify: `tests/e2e/grid-canvas.spec.ts`

- [x] **Step 1: Write failing tests for sidebar composition and BC creation flow**

```ts
// tests/e2e/grid-canvas.spec.ts
it('does not render swimlane panel and keeps bounded context panel', async ({ page }) => {
  await expect(page.getByRole('complementary', { name: 'Swimlane management' })).toHaveCount(0);
  await expect(page.getByRole('complementary', { name: 'Bounded context management' })).toBeVisible();
});
```

- [x] **Step 2: Run tests to verify fail**

Run: `npm run test:e2e -- tests/e2e/grid-canvas.spec.ts`
Expected: FAIL with existing swimlane panel visible.

- [x] **Step 3: Implement sidebar cleanup and BC-first UX**

```tsx
// App.tsx (sidebar)
<div className="app-sidebar">
  <NodePalette />
  <BoundedContextPanel />
  <SlicePanel />
</div>
```

- [x] **Step 4: Run tests to verify pass**

Run: `npm run test:e2e -- tests/e2e/grid-canvas.spec.ts`
Expected: PASS.

- [x] **Step 5: Commit**

```bash
git add src/App.tsx src/ui/components/Slices/BoundedContextPanel.tsx src/ui/components/Toolbar/SwimlanePanel.tsx src/App.css tests/e2e/grid-canvas.spec.ts
git commit -s -m "refactor(ui): make bounded context panel the primary swimlane manager"
```

### Task 10: Update Export JSON/Markdown To Reflect New Board Structure

**Files:**
- Modify: `src/core/domain/EventModelSchema.ts`
- Modify: `src/core/usecases/queries/ExportJSON/ExportJSONQueryHandler.ts`
- Modify: `src/core/usecases/queries/ExportMarkdown/ExportMarkdownQueryHandler.ts`
- Modify: `tests/core/usecases/ExportJSON/ExportJSONQueryHandler.test.ts`
- Create: `tests/core/usecases/ExportMarkdown/ExportMarkdownQueryHandler.test.ts`

- [x] **Step 1: Write failing export tests for fixed rows + BC representation**

```ts
// tests/core/usecases/ExportJSON/ExportJSONQueryHandler.test.ts (new expectations)
it('exports domain events with boundedContextId and no actor-based swimlane dependency', () => {
  // assert exported domain event includes boundedContextId or BC-resolved field
});
```

```ts
// tests/core/usecases/ExportMarkdown/ExportMarkdownQueryHandler.test.ts
it('renders bounded contexts section from collection', () => {
  // assert markdown includes listed bounded contexts
});
```

- [x] **Step 2: Run tests to verify fail**

Run: `npm run test -- tests/core/usecases/ExportJSON/ExportJSONQueryHandler.test.ts tests/core/usecases/ExportMarkdown/ExportMarkdownQueryHandler.test.ts`
Expected: FAIL due to old swimlane/actor assumptions.

- [x] **Step 3: Implement export handlers with BC-centric model**

```ts
// ExportJSONQueryHandler
// - remove gridRowToSwimlane dependency
// - source bounded context from domainEvent node projection data
// - keep commands/readModels/policies/uiScreens in fixed rows semantics
```

```ts
// EventModelSchema.ts
// adjust schema docs/types to describe fixed rows + bounded context lanes
```

- [x] **Step 4: Run tests to verify pass**

Run: `npm run test -- tests/core/usecases/ExportJSON/ExportJSONQueryHandler.test.ts tests/core/usecases/ExportMarkdown/ExportMarkdownQueryHandler.test.ts`
Expected: PASS.

- [x] **Step 5: Commit**

```bash
git add src/core/domain/EventModelSchema.ts src/core/usecases/queries/ExportJSON/ExportJSONQueryHandler.ts src/core/usecases/queries/ExportMarkdown/ExportMarkdownQueryHandler.ts tests/core/usecases/ExportJSON/ExportJSONQueryHandler.test.ts tests/core/usecases/ExportMarkdown/ExportMarkdownQueryHandler.test.ts
git commit -s -m "feat(export): align JSON and markdown output with bounded-context row model"
```

### Task 11: Full Regression Verification

**Files:**
- Modify as needed from failing tests only

- [x] **Step 1: Run unit tests**

Run: `npm run test`
Expected: PASS.

- [x] **Step 2: Run lint**

Run: `npm run lint`
Expected: PASS.

- [x] **Step 3: Run e2e tests**

Run: `npm run test:e2e`
Expected: PASS.

- [x] **Step 4: Build production bundle**

Run: `npm run build`
Expected: PASS.

- [x] **Step 5: Final commit for any residual fixes**

```bash
git add -A
git commit -s -m "test(board): finalize event modeling board redesign regression fixes"
```

## Self-Review

- Spec coverage check:
  - Section 1 (board structure): covered by Tasks 1, 5, 7, 9.
  - Section 2 (domain changes): covered by Tasks 1, 2, 3, 5, 10.
  - Section 3 (canvas/rendering/interaction): covered by Tasks 7 and 8.
  - Section 4 (persistence/migration): covered by Task 4.
  - Section 5 (sidebar/BC deletion behavior): covered by Tasks 6 and 9.
- Placeholder scan:
  - Removed generic placeholders except explicit behavior comments in test sketches; each task has concrete files, commands, and expected outcomes.
- Type consistency:
  - `boundedContextId` is consistently introduced in domain event, projection, store, and export flow.
  - Row mapping is centralized via `nodeKindToRow` and `isRowValidForKind`.
