# Bounded Context Canvas Editing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move bounded context add/rename/delete interactions from the sidebar to the canvas rows, including a custom delete confirmation modal when domain events exist.

**Architecture:** Keep domain and usecases unchanged. Implement canvas-focused UI controls via React Flow node data callbacks in `GridCanvas.tsx`, plus two new UI components (`ConfirmDeleteModal`, `BoundedContextInsertNode`). Remove the sidebar panel integration from `App.tsx`.

**Tech Stack:** TypeScript, React 19, Zustand, React Flow, Playwright, Vitest.

---

### Task 1: Add RED Playwright tests for canvas bounded context editing

**Files:**
- Modify: `tests/e2e/grid-canvas.spec.ts`

- [ ] **Step 1: Add rename interaction test (RED)**

```ts
// Add in tests/e2e/grid-canvas.spec.ts

test('renames a bounded context from its row label', async ({ page }) => {
  const labelButton = page.getByTestId('bounded-context-row-label').first();
  await labelButton.click();

  const nameInput = page.getByLabel('Bounded context name');
  await expect(nameInput).toBeVisible();
  await nameInput.fill('Payments');
  await nameInput.press('Enter');

  await expect(page.getByTestId('bounded-context-row-label').first()).toHaveText('Payments');
});
```

- [ ] **Step 2: Add delete-with-modal test (RED)**

```ts
// Add in tests/e2e/grid-canvas.spec.ts

test('shows a confirmation modal when deleting a bounded context containing domain events', async ({ page }) => {
  const eventCell = page.locator('.cell-quick-add[data-row="2"]').first();
  await eventCell.hover();
  await eventCell.locator('.cell-quick-add-btn[aria-label="Add Domain Event"]').click();
  await expect(page.locator('.domain-event-node')).toHaveCount(1);

  const deleteButton = page.getByTestId('bounded-context-delete-button').first();
  await deleteButton.click();

  const modal = page.getByRole('dialog', { name: 'Delete bounded context' });
  await expect(modal).toBeVisible();
  await expect(modal).toContainText('contains 1 domain event');

  await modal.getByRole('button', { name: 'Cancel' }).click();
  await expect(modal).toBeHidden();
});
```

- [ ] **Step 3: Add insert-button test (RED)**

```ts
// Add in tests/e2e/grid-canvas.spec.ts

test('adds bounded contexts with insert buttons between rows and below the last row', async ({ page }) => {
  const insertButtons = page.getByTestId('bounded-context-insert-button');
  await expect(insertButtons).toHaveCount(1);

  await insertButtons.first().click();
  await expect(page.getByTestId('bounded-context-row-label')).toHaveCount(2);

  await expect(page.getByTestId('bounded-context-insert-button')).toHaveCount(2);
});
```

- [ ] **Step 4: Run e2e tests and verify fail**

Run: `npx playwright test tests/e2e/grid-canvas.spec.ts -g "Bounded Context Canvas Editing"`
Expected: FAIL because test ids/modal do not exist yet.

- [ ] **Step 5: Commit RED tests**

```bash
git add tests/e2e/grid-canvas.spec.ts
git commit -s -m "test(e2e): add bounded context canvas editing scenarios"
```

---

### Task 2: Implement interactive bounded context row node

**Files:**
- Modify: `src/ui/components/Canvas/BoundedContextRowBackgroundNode.tsx`
- Create: `src/ui/components/ConfirmDeleteModal.tsx`

- [ ] **Step 1: Build `ConfirmDeleteModal` component**

```tsx
// src/ui/components/ConfirmDeleteModal.tsx
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ConfirmDeleteModalProps {
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDeleteModal({
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: ConfirmDeleteModalProps) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onCancel]);

  return createPortal(
    <div className="confirm-dialog-overlay" onClick={onCancel}>
      <div
        className="confirm-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="confirm-dialog-title">{title}</h3>
        <p className="confirm-dialog-message">{message}</p>
        <div className="confirm-dialog-actions">
          <button className="confirm-dialog-btn" onClick={onCancel}>{cancelLabel}</button>
          <button className="confirm-dialog-btn confirm-dialog-btn--danger" onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </div>,
    document.body
  );
}
```

- [ ] **Step 2: Make BC row node editable and deletable**

```tsx
// In BoundedContextRowBackgroundNode.tsx, expand data and interactions
export type BoundedContextRowBackgroundNodeData = {
  id: string;
  name: string;
  color: string;
  hasDomainEvents: boolean;
  domainEventCount: number;
  onRename: (id: string, name: string) => void;
  onDelete: (id: string) => void;
};
```

Implement state:
- `isEditing`, `draftName`, `isConfirmOpen`
- Inline `<input aria-label="Bounded context name" />`
- Label `<button data-testid="bounded-context-row-label">...`
- Delete `<button data-testid="bounded-context-delete-button">×</button>`
- Show `ConfirmDeleteModal` when `hasDomainEvents` is true

- [ ] **Step 3: Run focused e2e tests**

Run: `npx playwright test tests/e2e/grid-canvas.spec.ts -g "Bounded Context Canvas Editing"`
Expected: still FAIL (insert button not implemented yet), but rename + modal paths should progress.

- [ ] **Step 4: Commit row/modal implementation**

```bash
git add src/ui/components/Canvas/BoundedContextRowBackgroundNode.tsx src/ui/components/ConfirmDeleteModal.tsx
git commit -s -m "feat(canvas): add inline bounded context rename and delete modal"
```

---

### Task 3: Implement insert nodes and wire callbacks in GridCanvas

**Files:**
- Create: `src/ui/components/Canvas/BoundedContextInsertNode.tsx`
- Modify: `src/ui/components/Canvas/GridCanvas.tsx`

- [ ] **Step 1: Create `BoundedContextInsertNode`**

```tsx
// src/ui/components/Canvas/BoundedContextInsertNode.tsx
import { memo } from 'react';
import type { NodeProps } from '@xyflow/react';

export type BoundedContextInsertNodeData = {
  onCreate: () => void;
};

export const BoundedContextInsertNode = memo(({ data }: NodeProps) => {
  const nodeData = data as BoundedContextInsertNodeData;
  return (
    <div className="bounded-context-insert">
      <div className="bounded-context-insert-line" />
      <button
        type="button"
        className="bounded-context-insert-button"
        data-testid="bounded-context-insert-button"
        onClick={nodeData.onCreate}
        aria-label="Insert bounded context"
      >
        +
      </button>
    </div>
  );
});
```

- [ ] **Step 2: Wire BC actions and data in `GridCanvas.tsx`**

Add:
- `useBoundedContextActions` import and destructuring (`createBoundedContext`, `renameBoundedContext`, `deleteBoundedContext`)
- callbacks `handleRenameBoundedContext`, `handleDeleteBoundedContext`, `handleCreateBoundedContext`
- compute `domainEventCountByBoundedContextId` from board projection
- pass new data into `boundedContextRowBackground` nodes
- generate insert nodes between BC rows and after the last BC row
- register `boundedContextInsert` in `nodeTypes`

- [ ] **Step 3: Run focused e2e tests and verify GREEN**

Run: `npx playwright test tests/e2e/grid-canvas.spec.ts -g "Bounded Context Canvas Editing"`
Expected: PASS for the new three tests.

- [ ] **Step 4: Commit insert/canvas wiring**

```bash
git add src/ui/components/Canvas/BoundedContextInsertNode.tsx src/ui/components/Canvas/GridCanvas.tsx
git commit -s -m "feat(canvas): add bounded context insert controls on board"
```

---

### Task 4: Remove sidebar bounded context panel

**Files:**
- Modify: `src/App.tsx`
- Delete: `src/ui/components/Slices/BoundedContextPanel.tsx`

- [ ] **Step 1: Remove panel import/usage in `App.tsx`**

```tsx
// remove:
import { BoundedContextPanel } from './ui/components/Slices/BoundedContextPanel';

// remove JSX:
<BoundedContextPanel />
```

- [ ] **Step 2: Delete obsolete component file**

Delete: `src/ui/components/Slices/BoundedContextPanel.tsx`

- [ ] **Step 3: Run lint and unit tests**

Run: `npm run lint && npm test`
Expected: PASS.

- [ ] **Step 4: Commit panel removal**

```bash
git add src/App.tsx src/ui/components/Slices/BoundedContextPanel.tsx
git commit -s -m "refactor(ui): remove bounded context sidebar panel"
```

---

### Task 5: Style new canvas controls and modal

**Files:**
- Modify: `src/App.css`

- [ ] **Step 1: Add BC row interaction styles**

Add classes:
- `.bounded-context-row-label-shell`
- `.bounded-context-row-label`
- `.bounded-context-row-input`
- `.bounded-context-row-delete`

Behavior:
- delete button appears on hover/focus
- inline input matches current UI theme tokens

- [ ] **Step 2: Add insert button styles**

Add classes:
- `.bounded-context-insert`
- `.bounded-context-insert-line`
- `.bounded-context-insert-button`

- [ ] **Step 3: Add confirmation modal styles**

Add classes:
- `.confirm-dialog-overlay`
- `.confirm-dialog`
- `.confirm-dialog-title`
- `.confirm-dialog-message`
- `.confirm-dialog-actions`
- `.confirm-dialog-btn`
- `.confirm-dialog-btn--danger`

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 5: Commit styling**

```bash
git add src/App.css
git commit -s -m "style(canvas): add bounded context row, insert, and confirm modal styles"
```

---

### Task 6: Final verification and cleanup

**Files:**
- Modify: `tests/e2e/grid-canvas.spec.ts` (if selectors need final stabilization)

- [ ] **Step 1: Run full verification suite**

Run:
```bash
npm run lint
npm test
npm run test:e2e
npm run build
```
Expected: all commands exit 0.

- [ ] **Step 2: Check git state**

Run: `git status --short`
Expected: clean working tree.

- [ ] **Step 3: Prepare branch for PR**

Run:
```bash
git log --oneline --decorate -n 8
git status
```
Expected: feature commits present with sign-off and no pending changes.
