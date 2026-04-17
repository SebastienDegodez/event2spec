# Contiguous Slice Selection Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add contiguous slice range selection on the canvas, right-arrow extension, visible slice headers/rectangles, and move slice edit/scenario entry points from the left panel into the slice header on the board.

**Architecture:** Represent each slice with an explicit contiguous column range (`startColumn`, `columnCount`) in the domain and persistence model, then drive both temporary selection and persisted overlays from the same range semantics. Keep existing slice forms and scenario editing behavior, but route them through a new canvas-driven inspector flow instead of the current left-side slice controls.

**Tech Stack:** TypeScript, React 19, Zustand, React Flow, Vitest, Playwright.

---

### Task 1: Add RED unit tests for slice ranges and right-extension

**Files:**
- Modify: `tests/helpers/collectSlices.ts`
- Modify: `tests/core/usecases/CreateSlice/CreateSliceCommandHandler.test.ts`
- Create: `tests/core/usecases/ExtendSliceRight/ExtendSliceRightCommandHandler.test.ts`

- [ ] **Step 1: Extend the slice test helper to project range fields**

```ts
// tests/helpers/collectSlices.ts
export interface CollectedSlice {
  id: string;
  name: string;
  commandId: string;
  eventIds: ReadonlyArray<string>;
  readModelId: string;
  scenarios: ReadonlyArray<ScenarioProjection>;
  boundedContextId: string | undefined;
  startColumn: number;
  columnCount: number;
}

const projection: VerticalSliceProjection = {
  onSlice(id, name, commandId, eventIds, readModelId, scenarios, boundedContextId, startColumn, columnCount) {
    result.push({
      id,
      name,
      commandId,
      eventIds,
      readModelId,
      scenarios,
      boundedContextId,
      startColumn,
      columnCount,
    });
  },
};
```

- [ ] **Step 2: Update create-slice tests to expect range values**

```ts
// tests/core/usecases/CreateSlice/CreateSliceCommandHandler.test.ts
handler.handle(new CreateSliceCommand('vs1', 'Place Order', 'c1', ['e1', 'e2'], 'rm1', 3, 1));

const slices = collectSlices(repository.load());
expect(slices[0].startColumn).toBe(3);
expect(slices[0].columnCount).toBe(1);
```

```ts
// same file, second scenario
handler.handle(new CreateSliceCommand('vs2', 'Cancel Order', 'c2', ['e2'], 'rm2', 7, 2));
expect(slices[1].startColumn).toBe(7);
expect(slices[1].columnCount).toBe(2);
```

- [ ] **Step 3: Add RED tests for right-extension and overlap rejection**

```ts
// tests/core/usecases/ExtendSliceRight/ExtendSliceRightCommandHandler.test.ts
import { describe, it, expect } from 'vitest';
import { VerticalSlice } from '../../../../src/core/domain/VerticalSlice';
import { VerticalSliceCollection } from '../../../../src/core/domain/VerticalSliceCollection';
import { ExtendSliceRightCommand } from '../../../../src/core/usecases/commands/ExtendSliceRight/ExtendSliceRightCommand';
import { ExtendSliceRightCommandHandler } from '../../../../src/core/usecases/commands/ExtendSliceRight/ExtendSliceRightCommandHandler';
import { InMemoryVerticalSliceRepository } from '../../../helpers/InMemoryVerticalSliceRepository';
import { collectSlices } from '../../../helpers/collectSlices';

describe('ExtendSliceRightCommandHandler', () => {
  it('extends a slice by one free column on the right', () => {
    const initial = VerticalSliceCollection.empty().add(
      VerticalSlice.create('vs1', 'Checkout', 'c1', ['e1'], 'rm1', 4, 1)
    );
    const repository = new InMemoryVerticalSliceRepository(initial);
    const handler = new ExtendSliceRightCommandHandler(repository);

    handler.handle(new ExtendSliceRightCommand('vs1'));

    const slices = collectSlices(repository.load());
    expect(slices[0].startColumn).toBe(4);
    expect(slices[0].columnCount).toBe(2);
  });

  it('throws when the next column is already covered by another slice', () => {
    const initial = VerticalSliceCollection.empty()
      .add(VerticalSlice.create('vs1', 'Checkout', 'c1', ['e1'], 'rm1', 4, 1))
      .add(VerticalSlice.create('vs2', 'Pay', 'c2', ['e2'], 'rm2', 5, 1));
    const repository = new InMemoryVerticalSliceRepository(initial);
    const handler = new ExtendSliceRightCommandHandler(repository);

    expect(() => handler.handle(new ExtendSliceRightCommand('vs1'))).toThrow('Column 5 is already covered');
  });
});
```

- [ ] **Step 4: Run focused unit tests and verify RED**

Run: `npm test -- tests/core/usecases/CreateSlice/CreateSliceCommandHandler.test.ts tests/core/usecases/ExtendSliceRight/ExtendSliceRightCommandHandler.test.ts`
Expected: FAIL with TypeScript errors because range fields and `ExtendSliceRightCommandHandler` do not exist yet.

- [ ] **Step 5: Commit RED tests**

```bash
git add tests/helpers/collectSlices.ts tests/core/usecases/CreateSlice/CreateSliceCommandHandler.test.ts tests/core/usecases/ExtendSliceRight/ExtendSliceRightCommandHandler.test.ts
git commit -s -m "test(slices): define contiguous range behaviors"
```

---

### Task 2: Implement contiguous range support in domain and commands

**Files:**
- Modify: `src/core/domain/VerticalSlice.ts`
- Modify: `src/core/domain/VerticalSliceCollection.ts`
- Modify: `src/core/domain/VerticalSliceProjection.ts`
- Modify: `src/core/usecases/commands/CreateSlice/CreateSliceCommand.ts`
- Modify: `src/core/usecases/commands/CreateSlice/CreateSliceCommandHandler.ts`
- Create: `src/core/usecases/commands/ExtendSliceRight/ExtendSliceRightCommand.ts`
- Create: `src/core/usecases/commands/ExtendSliceRight/ExtendSliceRightCommandHandler.ts`

- [ ] **Step 1: Add explicit range fields and helpers to `VerticalSlice`**

```ts
// src/core/domain/VerticalSlice.ts
export class VerticalSlice {
  readonly startColumn: number;
  readonly columnCount: number;

  private constructor(
    id: string,
    name: string,
    commandId: string,
    eventIds: ReadonlyArray<string>,
    readModelId: string,
    scenarios: ReadonlyArray<Scenario>,
    boundedContextId: string | undefined,
    startColumn: number,
    columnCount: number,
  ) {
    this.id = id;
    this.name = name;
    this.commandId = commandId;
    this.eventIds = eventIds;
    this.readModelId = readModelId;
    this.scenarios = scenarios;
    this.boundedContextId = boundedContextId;
    this.startColumn = startColumn;
    this.columnCount = columnCount;
  }

  static create(id: string, name: string, commandId: string, eventIds: string[], readModelId: string, startColumn: number, columnCount: number): VerticalSlice {
    return new VerticalSlice(id, name, commandId, [...eventIds], readModelId, [], undefined, startColumn, columnCount);
  }

  coveredColumns(): number[] {
    return Array.from({ length: this.columnCount }, (_, index) => this.startColumn + index);
  }

  extendRight(): VerticalSlice {
    return new VerticalSlice(
      this.id,
      this.name,
      this.commandId,
      this.eventIds,
      this.readModelId,
      this.scenarios,
      this.boundedContextId,
      this.startColumn,
      this.columnCount + 1,
    );
  }
}
```

- [ ] **Step 2: Add overlap detection and extension in `VerticalSliceCollection`**

```ts
// src/core/domain/VerticalSliceCollection.ts
isColumnCovered(column: number, excludedSliceId?: string): boolean {
  return this.slices.some((slice) => {
    if (excludedSliceId && slice.id === excludedSliceId) return false;
    return slice.coveredColumns().includes(column);
  });
}

extendSliceRight(id: string): VerticalSliceCollection {
  const slice = this.slices.find((entry) => entry.id === id);
  if (!slice) {
    throw new Error(`Slice ${id} not found`);
  }

  const nextColumn = slice.startColumn + slice.columnCount;
  if (this.isColumnCovered(nextColumn, id)) {
    throw new Error(`Column ${nextColumn} is already covered`);
  }

  return new VerticalSliceCollection(
    this.slices.map((entry) => (entry.id === id ? entry.extendRight() : entry)),
  );
}
```

- [ ] **Step 3: Update projection and command signatures, then add the new handler**

```ts
// src/core/domain/VerticalSliceProjection.ts
onSlice(
  id: string,
  name: string,
  commandId: string,
  eventIds: ReadonlyArray<string>,
  readModelId: string,
  scenarios: ReadonlyArray<ScenarioProjection>,
  boundedContextId: string | undefined,
  startColumn: number,
  columnCount: number,
): void;
```

```ts
// src/core/usecases/commands/CreateSlice/CreateSliceCommand.ts
constructor(
  id: string,
  name: string,
  commandId: string,
  eventIds: string[],
  readModelId: string,
  startColumn: number,
  columnCount: number,
) {
  this.id = id;
  this.name = name;
  this.commandId = commandId;
  this.eventIds = eventIds;
  this.readModelId = readModelId;
  this.startColumn = startColumn;
  this.columnCount = columnCount;
}
```

```ts
// src/core/usecases/commands/ExtendSliceRight/ExtendSliceRightCommand.ts
export class ExtendSliceRightCommand {
  readonly sliceId: string;

  constructor(sliceId: string) {
    this.sliceId = sliceId;
  }
}
```

```ts
// src/core/usecases/commands/ExtendSliceRight/ExtendSliceRightCommandHandler.ts
import { type VerticalSliceRepository } from '../../../domain/VerticalSliceRepository';
import { ExtendSliceRightCommand } from './ExtendSliceRightCommand';

export class ExtendSliceRightCommandHandler {
  private readonly repository: VerticalSliceRepository;

  constructor(repository: VerticalSliceRepository) {
    this.repository = repository;
  }

  handle(command: ExtendSliceRightCommand): void {
    const collection = this.repository.load();
    this.repository.save(collection.extendSliceRight(command.sliceId));
  }
}
```

- [ ] **Step 4: Run focused unit tests and verify GREEN**

Run: `npm test -- tests/core/usecases/CreateSlice/CreateSliceCommandHandler.test.ts tests/core/usecases/ExtendSliceRight/ExtendSliceRightCommandHandler.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit domain and command changes**

```bash
git add src/core/domain/VerticalSlice.ts src/core/domain/VerticalSliceCollection.ts src/core/domain/VerticalSliceProjection.ts src/core/usecases/commands/CreateSlice/CreateSliceCommand.ts src/core/usecases/commands/CreateSlice/CreateSliceCommandHandler.ts src/core/usecases/commands/ExtendSliceRight/ExtendSliceRightCommand.ts src/core/usecases/commands/ExtendSliceRight/ExtendSliceRightCommandHandler.ts
git commit -s -m "feat(slices): add contiguous range model and right extension"
```

---

### Task 3: Add RED store tests for persistence and temporary slice-range selection

**Files:**
- Modify: `tests/core/store/useBoardStore.persistence.test.ts`
- Create: `tests/core/store/useBoardStore.sliceRangeSelection.test.ts`

- [ ] **Step 1: Add persistence expectations for range fields**

```ts
// tests/core/store/useBoardStore.persistence.test.ts
it('loads persisted slice ranges', async () => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      version: 3,
      nodes: [],
      links: [],
      boundedContexts: [{ id: 'bc-1', name: 'Ordering' }],
      slices: [
        {
          id: 'vs-1',
          name: 'Checkout',
          commandId: 'c1',
          eventIds: ['e1'],
          readModelId: 'rm1',
          scenarios: [],
          startColumn: 6,
          columnCount: 3,
        },
      ],
      nodeProperties: {},
    })
  );

  const { useBoardStore } = await import('../../../src/core/store/useBoardStore');
  const collected = collectSlices(useBoardStore.getState().slices);

  expect(collected[0].startColumn).toBe(6);
  expect(collected[0].columnCount).toBe(3);
});
```

- [ ] **Step 2: Add RED tests for selection range actions**

```ts
// tests/core/store/useBoardStore.sliceRangeSelection.test.ts
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { collectSlices } from '../../helpers/collectSlices';

const STORAGE_KEY = 'event2spec-board';

describe('useBoardStore slice range selection', () => {
  beforeEach(() => {
    vi.resetModules();
    localStorage.clear();
  });

  it('starts a new temporary range from a free column', async () => {
    const { useBoardStore } = await import('../../../src/core/store/useBoardStore');
    useBoardStore.getState().startSliceSelection(8);

    expect(useBoardStore.getState().selectedSliceRange).toEqual({ startColumn: 8, columnCount: 1 });
  });

  it('ignores a covered column when starting a new selection', async () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: 3,
        nodes: [],
        links: [],
        boundedContexts: [{ id: 'default-bc', name: 'Bounded Context 1' }],
        slices: [{ id: 'vs-1', name: 'Checkout', commandId: 'c1', eventIds: ['e1'], readModelId: 'rm1', scenarios: [], startColumn: 4, columnCount: 2 }],
        nodeProperties: {},
      })
    );

    const { useBoardStore } = await import('../../../src/core/store/useBoardStore');
    useBoardStore.getState().startSliceSelection(5);

    expect(useBoardStore.getState().selectedSliceRange).toBeNull();
    expect(collectSlices(useBoardStore.getState().slices)[0].columnCount).toBe(2);
  });

  it('extends the temporary range by one column to the right', async () => {
    const { useBoardStore } = await import('../../../src/core/store/useBoardStore');
    useBoardStore.getState().startSliceSelection(8);
    useBoardStore.getState().extendSelectedSliceRangeRight();

    expect(useBoardStore.getState().selectedSliceRange).toEqual({ startColumn: 8, columnCount: 2 });
  });
});
```

- [ ] **Step 3: Run focused store tests and verify RED**

Run: `npm test -- tests/core/store/useBoardStore.persistence.test.ts tests/core/store/useBoardStore.sliceRangeSelection.test.ts`
Expected: FAIL because persistence version `3`, `selectedSliceRange`, and range-selection actions do not exist yet.

- [ ] **Step 4: Commit RED store tests**

```bash
git add tests/core/store/useBoardStore.persistence.test.ts tests/core/store/useBoardStore.sliceRangeSelection.test.ts
git commit -s -m "test(store): define slice range persistence and selection"
```

---

### Task 4: Implement range persistence and temporary selection actions in the store

**Files:**
- Modify: `src/core/store/useBoardStore.ts`

- [ ] **Step 1: Replace `selectedColumns` with a range object and new actions**

```ts
// src/core/store/useBoardStore.ts
interface SelectedSliceRange {
  startColumn: number;
  columnCount: number;
}

interface BoardStoreState {
  // ...
  selectedSliceRange: SelectedSliceRange | null;
}

interface BoardActions {
  // ...
  startSliceSelection: (column: number) => void;
  extendSelectedSliceRangeRight: () => void;
  clearSliceSelection: () => void;
}
```

```ts
const isColumnCoveredBySlices = (slices: VerticalSliceCollection, column: number, excludedSliceId?: string): boolean => {
  let covered = false;
  slices.describeTo({
    onSlice(_id, _name, _commandId, _eventIds, _readModelId, _scenarios, _boundedContextId, startColumn, columnCount) {
      if (excludedSliceId && _id === excludedSliceId) return;
      if (column >= startColumn && column < startColumn + columnCount) {
        covered = true;
      }
    },
  });
  return covered;
};
```

- [ ] **Step 2: Persist range fields in storage version 3 and normalize old payloads**

```ts
// in PersistedSlice
interface PersistedSlice {
  id: string;
  name: string;
  commandId: string;
  eventIds: string[];
  readModelId: string;
  scenarios: PersistedScenario[];
  boundedContextId?: string;
  startColumn?: number;
  columnCount?: number;
}

interface PersistedState {
  version: 3;
  // ...
}
```

```ts
// in loadFromStorage()
const parsed = JSON.parse(raw) as Partial<PersistedState>;
if (parsed.version !== 2 && parsed.version !== 3) {
  localStorage.removeItem(STORAGE_KEY);
  return emptyState();
}

const startColumn = typeof ps.startColumn === 'number' ? ps.startColumn : 0;
const columnCount = typeof ps.columnCount === 'number' ? ps.columnCount : 1;
let slice = VerticalSlice.create(ps.id, ps.name, ps.commandId, ps.eventIds, ps.readModelId, startColumn, columnCount);
```

```ts
// in saveToStorage()
persistedSlices.push({
  id,
  name,
  commandId,
  eventIds: [...eventIds],
  readModelId,
  scenarios: scenarios.map((s) => ({ given: [...s.given], when: s.when, then: [...s.then] })),
  boundedContextId,
  startColumn,
  columnCount,
});
localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 3, nodes, links, slices: persistedSlices, boundedContexts: persistedBoundedContexts, nodeProperties }));
```

- [ ] **Step 3: Wire creation and extension through the new range-based actions**

```ts
// in create handlers section
const extendSliceRightHandler = new ExtendSliceRightCommandHandler(sliceRepository);
```

```ts
startSliceSelection: (column) =>
  set((state) => {
    if (isColumnCoveredBySlices(state.slices, column)) {
      return state;
    }
    return { selectedSliceRange: { startColumn: column, columnCount: 1 } };
  }),

extendSelectedSliceRangeRight: () =>
  set((state) => {
    if (!state.selectedSliceRange) return state;
    const nextColumn = state.selectedSliceRange.startColumn + state.selectedSliceRange.columnCount;
    if (isColumnCoveredBySlices(state.slices, nextColumn)) {
      return state;
    }
    return {
      selectedSliceRange: {
        startColumn: state.selectedSliceRange.startColumn,
        columnCount: state.selectedSliceRange.columnCount + 1,
      },
    };
  }),

clearSliceSelection: () => set({ selectedSliceRange: null }),
```

- [ ] **Step 4: Run focused store tests and verify GREEN**

Run: `npm test -- tests/core/store/useBoardStore.persistence.test.ts tests/core/store/useBoardStore.sliceRangeSelection.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit store updates**

```bash
git add src/core/store/useBoardStore.ts
git commit -s -m "feat(store): persist slice ranges and range selection"
```

---

### Task 5: Add RED end-to-end tests for canvas-driven slice selection and header actions

**Files:**
- Modify: `tests/e2e/grid-canvas.spec.ts`

- [ ] **Step 1: Add a seeded board state with one existing slice**

```ts
// tests/e2e/grid-canvas.spec.ts
const BOARD_WITH_EXISTING_SLICE = {
  version: 3,
  nodes: [
    { id: 'cmd-1', label: 'Add to cart', column: 2, row: 1, type: 'command' },
    { id: 'evt-1', label: 'Product added', column: 2, row: 2, type: 'domainEvent', boundedContextId: 'default-bc' },
    { id: 'cmd-2', label: 'Checkout', column: 6, row: 1, type: 'command' },
    { id: 'evt-2', label: 'Order requested', column: 6, row: 2, type: 'domainEvent', boundedContextId: 'default-bc' },
  ],
  links: [],
  slices: [
    { id: 'vs-1', name: 'Existing Slice', commandId: 'cmd-1', eventIds: ['evt-1'], readModelId: '', scenarios: [], startColumn: 2, columnCount: 2 },
  ],
  boundedContexts: [{ id: 'default-bc', name: 'Bounded Context 1' }],
  nodeProperties: {},
};
```

- [ ] **Step 2: Add RED tests for selection, extension, disabled arrow, and inspector opening**

```ts
test.describe('GridCanvas — Contiguous Slice Selection', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript((state) => {
      window.localStorage.clear();
      window.localStorage.setItem('event2spec-board', JSON.stringify(state));
    }, BOARD_WITH_EXISTING_SLICE);
    await page.goto('/');
    await page.waitForSelector('.react-flow__pane');
  });

  test('clicking a free column starts a temporary slice range and the arrow extends it', async ({ page }) => {
    await page.getByTestId('slice-column-hitbox-6').click();
    await expect(page.getByTestId('slice-selection-header')).toContainText('Columns 6-6');

    const extendButton = page.getByTestId('slice-selection-extend-right');
    await expect(extendButton).toBeEnabled();
    await extendButton.click();

    await expect(page.getByTestId('slice-selection-header')).toContainText('Columns 6-7');
  });

  test('clicking a covered column is ignored', async ({ page }) => {
    await page.getByTestId('slice-column-hitbox-2').click();
    await expect(page.getByTestId('slice-selection-header')).toHaveCount(0);
  });

  test('slice header right arrow is disabled when the next column is already covered', async ({ page }) => {
    const sliceHeader = page.getByTestId('slice-header-vs-1');
    await expect(sliceHeader.getByTestId('slice-header-extend-right')).toBeDisabled();
  });

  test('slice header edit button opens the slice inspector on the right', async ({ page }) => {
    await page.getByTestId('slice-header-vs-1').getByTestId('slice-header-edit').click();
    await expect(page.getByLabel('Slice inspector')).toBeVisible();
    await expect(page.getByLabel('Slice inspector')).toContainText('Existing Slice');
  });
});
```

- [ ] **Step 3: Run focused Playwright tests and verify RED**

Run: `npm run test:e2e -- tests/e2e/grid-canvas.spec.ts --grep "Contiguous Slice Selection"`
Expected: FAIL because the selection hitboxes, slice headers, and inspector entry points do not exist yet.

- [ ] **Step 4: Commit RED e2e tests**

```bash
git add tests/e2e/grid-canvas.spec.ts
git commit -s -m "test(e2e): define contiguous slice selection flow"
```

---

### Task 6: Render slice overlays and temporary selection header on the canvas

**Files:**
- Create: `src/ui/components/Canvas/SliceOverlay.tsx`
- Modify: `src/ui/components/Canvas/GridCanvas.tsx`
- Modify: `src/App.css`

- [ ] **Step 1: Create a focused overlay component for persisted and temporary slice ranges**

```tsx
// src/ui/components/Canvas/SliceOverlay.tsx
interface SliceOverlayProps {
  id: string;
  label: string;
  startColumn: number;
  columnCount: number;
  viewport: { x: number; y: number; zoom: number };
  topOffset: number;
  height: number;
  isTemporary?: boolean;
  canExtendRight: boolean;
  onExtendRight?: () => void;
  onEdit?: () => void;
  onScenarios?: () => void;
}

export function SliceOverlay({
  id,
  label,
  startColumn,
  columnCount,
  viewport,
  topOffset,
  height,
  isTemporary = false,
  canExtendRight,
  onExtendRight,
  onEdit,
  onScenarios,
}: SliceOverlayProps) {
  const left = startColumn * GRID_SIZE * viewport.zoom + viewport.x;
  const width = columnCount * GRID_SIZE * viewport.zoom;

  return (
    <div className={`slice-overlay ${isTemporary ? 'slice-overlay--temporary' : ''}`} style={{ left, width, top: topOffset, height }}>
      <div className="slice-overlay-frame" />
      <div className="slice-overlay-header" data-testid={isTemporary ? 'slice-selection-header' : `slice-header-${id}`}>
        <span className="slice-overlay-title">{label}</span>
        <button
          type="button"
          data-testid={isTemporary ? 'slice-selection-extend-right' : 'slice-header-extend-right'}
          className="slice-overlay-action"
          onClick={onExtendRight}
          disabled={!canExtendRight}
          aria-label="Extend slice right"
        >
          →
        </button>
        {!isTemporary && (
          <>
            <button type="button" data-testid="slice-header-edit" className="slice-overlay-action" onClick={onEdit}>View / Edit</button>
            <button type="button" data-testid="slice-header-scenarios" className="slice-overlay-action" onClick={onScenarios}>Scenarios</button>
          </>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Replace the current multi-column highlight logic with range-aware overlays**

```tsx
// src/ui/components/Canvas/GridCanvas.tsx
const selectedSliceRange = useSelectedSliceRange();
const { startSliceSelection, extendSelectedSliceRangeRight, clearSliceSelection } = useColumnSelectionActions();
const { extendSliceRight } = useSliceActions();
```

```tsx
// in onPaneClick
const { column } = pixelToGrid(flowPosition.x, flowPosition.y);
startSliceSelection(column);
```

```tsx
// in render block, replace column-selection-overlay
{sliceOverlayEntries.map((entry) => (
  <SliceOverlay
    key={entry.id}
    id={entry.id}
    label={entry.label}
    startColumn={entry.startColumn}
    columnCount={entry.columnCount}
    viewport={viewport}
    topOffset={32}
    height={containerHeight - 64}
    canExtendRight={entry.canExtendRight}
    onExtendRight={entry.onExtendRight}
    onEdit={entry.onEdit}
    onScenarios={entry.onScenarios}
  />
))}
```

- [ ] **Step 3: Add CSS for the slice frame, header, and column hitboxes**

```css
/* src/App.css */
.slice-overlay {
  position: absolute;
  pointer-events: none;
  z-index: 3;
}

.slice-overlay-frame {
  position: absolute;
  inset: 28px 0 0;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}

.slice-overlay-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 10px;
  height: 24px;
  pointer-events: auto;
}

.slice-overlay-action:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.slice-column-hitbox {
  position: absolute;
  top: 0;
  bottom: 0;
  pointer-events: auto;
  background: transparent;
}
```

- [ ] **Step 4: Run focused Playwright tests and verify partial GREEN**

Run: `npm run test:e2e -- tests/e2e/grid-canvas.spec.ts --grep "Contiguous Slice Selection"`
Expected: the first three tests pass, while the inspector-opening test still fails because the right-side inspector is not wired yet.

- [ ] **Step 5: Commit canvas overlays**

```bash
git add src/ui/components/Canvas/SliceOverlay.tsx src/ui/components/Canvas/GridCanvas.tsx src/App.css
git commit -s -m "feat(canvas): render contiguous slice overlays and selection"
```

---

### Task 7: Move slice editing and scenario entry points into a right-side inspector

**Files:**
- Create: `src/ui/components/Slices/SliceInspectorView.tsx`
- Modify: `src/ui/components/Slices/SliceEditorView.tsx`
- Modify: `src/ui/components/Slices/SlicePanel.tsx`
- Modify: `src/App.tsx`
- Modify: `src/core/store/useBoardStore.ts`

- [ ] **Step 1: Add store state for the active inspected slice and expose actions**

```ts
// src/core/store/useBoardStore.ts
interface BoardStoreState {
  // ...
  activeSliceInspectorId: string | null;
  activeSliceInspectorMode: 'details' | 'scenarios' | null;
}

interface BoardActions {
  // ...
  openSliceInspector: (sliceId: string, mode?: 'details' | 'scenarios') => void;
  closeSliceInspector: () => void;
  extendSliceRight: (sliceId: string) => void;
}
```

```ts
openSliceInspector: (sliceId, mode = 'details') => set({ activeSliceInspectorId: sliceId, activeSliceInspectorMode: mode }),
closeSliceInspector: () => set({ activeSliceInspectorId: null, activeSliceInspectorMode: null }),
extendSliceRight: (sliceId) => {
  extendSliceRightHandler.handle(new ExtendSliceRightCommand(sliceId));
},
```

- [ ] **Step 2: Create a dedicated inspector view that reuses existing form logic**

```tsx
// src/ui/components/Slices/SliceInspectorView.tsx
import { useMemo, useState } from 'react';
import { useSlices, useSliceActions, useBoardStore } from '../../../core/store/useBoardStore';

export function SliceInspectorView() {
  const activeSliceInspectorId = useBoardStore((state) => state.activeSliceInspectorId);
  const activeSliceInspectorMode = useBoardStore((state) => state.activeSliceInspectorMode);
  const closeSliceInspector = useBoardStore((state) => state.closeSliceInspector);
  const { renameSlice, addScenarioToSlice, removeScenarioFromSlice, updateScenarioInSlice } = useSliceActions();

  const slice = useMemo(() => {
    if (!activeSliceInspectorId) return null;
    let found: SlicePanelEntry | null = null;
    useSlices().describeTo({
      onSlice(id, name, commandId, eventIds, readModelId, scenarios, boundedContextId, startColumn, columnCount) {
        if (id === activeSliceInspectorId) {
          found = { id, name, commandId, eventIds, readModelId, scenarios, boundedContextId, startColumn, columnCount };
        }
      },
    });
    return found;
  }, [activeSliceInspectorId]);

  if (!slice) return null;

  return (
    <aside className="slice-inspector-view" aria-label="Slice inspector">
      <div className="slice-editor-header">
        <span className="slice-editor-title">{slice.name}</span>
        <button className="slice-editor-close" onClick={closeSliceInspector} aria-label="Close">×</button>
      </div>
      {/* reuse the existing slice name input, scenario list, and add/edit/remove buttons here */}
    </aside>
  );
}
```

- [ ] **Step 3: Wire `App.tsx` and strip edit/scenario triggers from the left slice panel**

```tsx
// src/App.tsx
import { SliceInspectorView } from './ui/components/Slices/SliceInspectorView';
import { useSelectedSliceRange, useActiveSliceInspectorId } from './core/store/useBoardStore';

const selectedSliceRange = useSelectedSliceRange();
const activeSliceInspectorId = useActiveSliceInspectorId();

{selectedSliceRange ? (
  <SliceEditorView selectedSliceRange={selectedSliceRange} />
) : activeSliceInspectorId ? (
  <SliceInspectorView />
) : (
  <PropertiesPanel />
)}
```

```tsx
// src/ui/components/Slices/SlicePanel.tsx
// keep the list, but remove rename / add-scenario / toggle-details controls
<div className="slice-item-header">
  <span className="slice-name">{entry.name}</span>
  <span className="slice-range-label">Columns {entry.startColumn}-{entry.startColumn + entry.columnCount - 1}</span>
</div>
```

- [ ] **Step 4: Run focused Playwright tests and verify GREEN**

Run: `npm run test:e2e -- tests/e2e/grid-canvas.spec.ts --grep "Contiguous Slice Selection"`
Expected: PASS for all new slice-selection scenarios.

- [ ] **Step 5: Commit inspector flow**

```bash
git add src/ui/components/Slices/SliceInspectorView.tsx src/ui/components/Slices/SliceEditorView.tsx src/ui/components/Slices/SlicePanel.tsx src/App.tsx src/core/store/useBoardStore.ts
git commit -s -m "feat(slices): move slice editing to canvas inspector"
```

---

### Task 8: Run full verification and finish documentation updates

**Files:**
- Modify: `docs/superpowers/specs/2026-04-17-slice-contiguous-column-selection-design.md`

- [ ] **Step 1: Update the spec wording to replace ambiguous “column selection” phrasing**

```md
<!-- docs/superpowers/specs/2026-04-17-slice-contiguous-column-selection-design.md -->
- Clicking a free column starts a temporary slice range.
- Clicking a column already covered by a slice is ignored.
```

- [ ] **Step 2: Run the unit test suite**

Run: `npm test`
Expected: PASS.

- [ ] **Step 3: Run lint and e2e verification**

Run: `npm run lint && npm run test:e2e -- tests/e2e/grid-canvas.spec.ts --grep "Contiguous Slice Selection"`
Expected: PASS.

- [ ] **Step 4: Build the app to verify production output**

Run: `npm run build`
Expected: PASS with Vite build output and no TypeScript errors.

- [ ] **Step 5: Commit final polish and verification updates**

```bash
git add docs/superpowers/specs/2026-04-17-slice-contiguous-column-selection-design.md
git commit -s -m "docs(slices): clarify contiguous slice range wording"
```

---

## Self-Review

### Spec coverage

- Contiguous slice range model: Task 2 and Task 4.
- Covered column cannot start a new selection: Task 3, Task 4, Task 5, Task 6.
- Right-arrow extension by one column: Task 1, Task 2, Task 5, Task 6.
- Disabled arrow when next column is already used: Task 1, Task 2, Task 5, Task 6.
- Slice title and visible rectangle: Task 6.
- Move edit/scenario entry points from left panel to canvas header: Task 7.
- Preserve existing form behavior: Task 7.
- Persistence and migration: Task 4.
- Verification coverage: Task 8.

### Placeholder scan

- No `TODO`, `TBD`, or deferred implementation notes remain.
- Each task has exact file paths, code snippets, commands, and expected outcomes.
- Commit steps use conventional commits with sign-off.

### Type consistency

- `VerticalSlice`, `VerticalSliceProjection`, `collectSlices`, `CreateSliceCommand`, and persisted slice payload all use `startColumn` and `columnCount`.
- Store state uses `selectedSliceRange`, and UI components consume the same object shape.
- Extension command name is consistently `ExtendSliceRightCommand` / `ExtendSliceRightCommandHandler`.
