import { test, expect } from '@playwright/test';

test.describe('GridCanvas — Snap-to-Grid Acceptance', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.react-flow__pane');
    await page.evaluate(() => {
      const minimap = document.querySelector('.react-flow__minimap');
      if (minimap) (minimap as HTMLElement).style.display = 'none';
    });
  });

  test('displays a dot-grid background on an empty board', async ({ page }) => {
    const background = page.locator('.react-flow__background');
    await expect(background).toBeVisible();
  });

  test('adding a domain event from row-2 quick-add creates a note', async ({ page }) => {
    const eventCell = page.locator('.cell-quick-add[data-row="2"]').first();
    await eventCell.hover();
    await eventCell.locator('.cell-quick-add-btn[aria-label="Add Domain Event"]').click();

    const note = page.locator('.domain-event-node').first();
    await expect(note).toBeVisible();
    await expect(note.locator('.note-type-badge')).toHaveText('Domain Event');
  });

  test('dropping a note onto an occupied cell shifts the existing note right', async ({
    page,
  }) => {
    // Create note A from row-2 quick-add
    const eventCells = page.locator('.cell-quick-add[data-row="2"]');
    await eventCells.first().hover();
    await eventCells.first().locator('.cell-quick-add-btn[aria-label="Add Domain Event"]').click();
    await expect(page.locator('.domain-event-node')).toHaveCount(1);

    // Read the column of note A
    const noteA = page.locator('.domain-event-node').first();
    const columnA = await noteA.getAttribute('data-column');
    const idA = await noteA.getAttribute('data-id');
    expect(columnA).not.toBeNull();

    // Create note B at a different column
    const nextEventCell = page.locator('.cell-quick-add[data-row="2"]').first();
    await nextEventCell.hover();
    await nextEventCell.locator('.cell-quick-add-btn[aria-label="Add Domain Event"]').click();
    await expect(page.locator('.domain-event-node')).toHaveCount(2);

    // Find both notes by their data-id — wait for note B to have a data-column attribute
    const noteB = page.locator(`.domain-event-node:not([data-id="${idA}"])`);
    await expect(noteB).toHaveAttribute('data-column');
    const columnB = await noteB.getAttribute('data-column');
    expect(columnB).not.toBeNull();

    // Verify A and B are on distinct columns
    expect(columnA).not.toBe(columnB);

    // Drag note B to note A's position
    const sourceBBox = await noteB.boundingBox();
    const targetBBox = await noteA.boundingBox();
    if (!sourceBBox || !targetBBox) throw new Error('Could not get note bounding boxes');

    const bCenter = {
      x: sourceBBox.x + sourceBBox.width / 2,
      y: sourceBBox.y + sourceBBox.height / 2,
    };
    const aCenter = {
      x: targetBBox.x + targetBBox.width / 2,
      y: targetBBox.y + targetBBox.height / 2,
    };

    await page.mouse.move(bCenter.x, bCenter.y);
    await page.mouse.down();
    await page.mouse.move(bCenter.x + (aCenter.x - bCenter.x) / 2, bCenter.y, { steps: 5 });
    await page.mouse.move(aCenter.x, aCenter.y, { steps: 10 });
    await page.mouse.up();

    // Wait for A to reflect its new (shifted) column in the DOM
    await expect(
      page.locator(`.domain-event-node[data-id="${idA}"]`)
    ).toHaveAttribute('data-column', String(Number(columnA) + 1));

    // After drop: B should now occupy A's original column, A should have been shifted right
    const newColumnA = await page.locator(`.domain-event-node[data-id="${idA}"]`).getAttribute('data-column');
    const newColumnB = await noteB.getAttribute('data-column');

    // B was dragged to A's cell, so B's column should equal A's original column
    expect(newColumnB).toBe(columnA);
    // A should have been pushed right (column increased by 1)
    expect(Number(newColumnA)).toBe(Number(columnA) + 1);
  });

  test('right-clicking a node shows insert before and after options', async ({ page }) => {
    // Create a note from row-2 quick-add
    const eventCell = page.locator('.cell-quick-add[data-row="2"]').first();
    await eventCell.hover();
    await eventCell.locator('.cell-quick-add-btn[aria-label="Add Domain Event"]').click();
    await expect(page.locator('.domain-event-node')).toHaveCount(1);

    // Right-click the note to get the node context menu
    const note = page.locator('.domain-event-node').first();
    await note.click({ button: 'right' });

    await expect(page.locator('.context-menu-item', { hasText: 'Insert event before' })).toBeVisible();
    await expect(page.locator('.context-menu-item', { hasText: 'Insert event after' })).toBeVisible();
  });

  test('inserting an event before shifts the existing node right', async ({ page }) => {
    // Create a note from row-2 quick-add
    const eventCell = page.locator('.cell-quick-add[data-row="2"]').first();
    await eventCell.hover();
    await eventCell.locator('.cell-quick-add-btn[aria-label="Add Domain Event"]').click();
    await expect(page.locator('.domain-event-node')).toHaveCount(1);

    const originalNote = page.locator('.domain-event-node').first();
    const originalColumn = await originalNote.getAttribute('data-column');
    const originalId = await originalNote.getAttribute('data-id');

    // Right-click on the note and insert before
    await originalNote.click({ button: 'right' });
    await page.locator('.context-menu-item', { hasText: 'Insert event before' }).click();

    await expect(page.locator('.domain-event-node')).toHaveCount(2);

    // The original note should have shifted right
    const shiftedColumn = await page.locator(`.domain-event-node[data-id="${originalId}"]`).getAttribute('data-column');
    expect(Number(shiftedColumn)).toBe(Number(originalColumn) + 1);
  });

  test('inserting an event after places it in the next column', async ({ page }) => {
    // Create a note from row-2 quick-add
    const eventCell = page.locator('.cell-quick-add[data-row="2"]').first();
    await eventCell.hover();
    await eventCell.locator('.cell-quick-add-btn[aria-label="Add Domain Event"]').click();
    await expect(page.locator('.domain-event-node')).toHaveCount(1);

    const originalNote = page.locator('.domain-event-node').first();
    const originalColumn = await originalNote.getAttribute('data-column');
    const originalId = await originalNote.getAttribute('data-id');

    // Right-click on the note and insert after
    await originalNote.click({ button: 'right' });
    await page.locator('.context-menu-item', { hasText: 'Insert event after' }).click();

    await expect(page.locator('.domain-event-node')).toHaveCount(2);

    // The original note should NOT have shifted
    const currentColumn = await page.locator(`.domain-event-node[data-id="${originalId}"]`).getAttribute('data-column');
    expect(Number(currentColumn)).toBe(Number(originalColumn));

    // The new note should be at originalColumn + 1
    const newNote = page.locator(`.domain-event-node:not([data-id="${originalId}"])`);
    const newColumn = await newNote.getAttribute('data-column');
    expect(Number(newColumn)).toBe(Number(originalColumn) + 1);
  });
});

test.describe('GridCanvas — Quick-Add Buttons (Fixed Rows + Bounded Context Rows)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.react-flow__pane');

    // Hide the minimap to prevent it from overlapping quick-add buttons
    await page.evaluate(() => {
      const minimap = document.querySelector('.react-flow__minimap');
      if (minimap) (minimap as HTMLElement).style.display = 'none';
    });

    // A default bounded context is always present.
  });

  test('fixed row labels are visible for row 0 and row 1', async ({ page }) => {
    await expect(page.locator('.fixed-row-labels-column')).toBeVisible();
    await expect(page.locator('.fixed-row-label', { hasText: 'UI' })).toBeVisible();
    await expect(page.locator('.fixed-row-label', { hasText: 'Cmd · RM' })).toBeVisible();
  });

  test('quick-add options are row-specific', async ({ page }) => {
    const uiCell = page.locator('.cell-quick-add[data-row="0"]').first();
    await uiCell.hover();
    await expect(uiCell.locator('.cell-quick-add-btn')).toHaveCount(1);
    await expect(uiCell.locator('.cell-quick-add-btn[aria-label="Add UI Screen"]')).toBeVisible();

    const cmdCell = page.locator('.cell-quick-add[data-row="1"]').first();
    await cmdCell.hover();
    await expect(cmdCell.locator('.cell-quick-add-btn')).toHaveCount(3);
    await expect(cmdCell.locator('.cell-quick-add-btn[aria-label="Add Command"]')).toBeVisible();
    await expect(cmdCell.locator('.cell-quick-add-btn[aria-label="Add Read Model"]')).toBeVisible();
    await expect(cmdCell.locator('.cell-quick-add-btn[aria-label="Add Policy"]')).toBeVisible();

    const eventCell = page.locator('.cell-quick-add[data-row="2"]').first();
    await eventCell.hover();
    await expect(eventCell.locator('.cell-quick-add-btn')).toHaveCount(1);
    await expect(eventCell.locator('.cell-quick-add-btn[aria-label="Add Domain Event"]')).toBeVisible();
  });

  test('quick-add buttons appear on hover in empty swimlane cells', async ({ page }) => {
    // Quick-add buttons should exist in the DOM (hidden by CSS)
    const quickAddBtns = page.locator('.cell-quick-add-btn');
    await expect(quickAddBtns.first()).toBeAttached();

    // Hover over a command_readmodel row cell to reveal quick-add buttons
    const cmdCell = page.locator('.cell-quick-add').first();
    await cmdCell.hover();

    // Buttons should become visible
    const visibleBtns = cmdCell.locator('.cell-quick-add-btn');
    await expect(visibleBtns.first()).toBeVisible();
  });

  test('clicking a quick-add button creates a node in the cell', async ({ page }) => {
    // Hover over the event row cell (row 2) to reveal quick-add buttons
    const eventCell = page.locator('.cell-quick-add[data-row="2"]').first();
    await eventCell.hover();

    // Click the "E" button (Domain Event) in the event row
    const eventBtn = eventCell.locator('.cell-quick-add-btn[aria-label="Add Domain Event"]');
    await eventBtn.click();

    // A domain event node should appear
    const note = page.locator('.domain-event-node').first();
    await expect(note).toBeVisible();
    await expect(note.locator('.note-type-badge')).toHaveText('Domain Event');
  });

  test('clicking a quick-add "C" button creates a command node', async ({ page }) => {
    // Hover to reveal buttons in command_readmodel row (row 1)
    const cmdCell = page.locator('.cell-quick-add[data-row="1"]').first();
    await cmdCell.hover();

    const cmdBtn = cmdCell.locator('.cell-quick-add-btn[aria-label="Add Command"]');
    await cmdBtn.click();

    const note = page.locator('.command-node').first();
    await expect(note).toBeVisible();
    await expect(note.locator('.note-type-badge')).toHaveText('Command');
  });

  test('newly created node enters editing mode instantly', async ({ page }) => {
    // Hover to reveal buttons in event row (row 2)
    const eventCell = page.locator('.cell-quick-add[data-row="2"]').first();
    await eventCell.hover();

    const eventBtn = eventCell.locator('.cell-quick-add-btn[aria-label="Add Domain Event"]');
    await eventBtn.click();

    // The node should be in editing mode (textarea visible)
    const note = page.locator('.domain-event-node').first();
    await expect(note).toBeVisible();
    const editor = note.locator('.note-editor');
    await expect(editor).toBeVisible();
  });

  test('quick-add creates automatic links between adjacent nodes', async ({ page }) => {
    // Add a command node in the command_readmodel row (row 1)
    const cmdCell = page.locator('.cell-quick-add[data-row="1"]').first();
    await cmdCell.hover();
    await cmdCell.locator('.cell-quick-add-btn[aria-label="Add Command"]').click();

    // Commit the edit (press Enter or blur)
    const cmdEditor = page.locator('.command-node .note-editor');
    await expect(cmdEditor).toBeVisible();
    await cmdEditor.press('Enter');

    // Add a domain event node in the same column, event row (row 2)
    const eventCell = page.locator('.cell-quick-add[data-row="2"]').first();
    await eventCell.hover();
    await eventCell.locator('.cell-quick-add-btn[aria-label="Add Domain Event"]').click();

    // An edge with label "triggers" should appear between the two nodes
    const edgeLabel = page.locator('.react-flow__edge-text');
    await expect(edgeLabel).toBeVisible();
    await expect(edgeLabel).toHaveText('triggers');
  });

  test('quick-add button disappears after a node is placed in the cell', async ({ page }) => {
    // Count quick-add nodes before adding
    const quickAddsBefore = await page.locator('.cell-quick-add').count();

    // Hover and click to add a domain event node in event row (row 2)
    const eventCell = page.locator('.cell-quick-add[data-row="2"]').first();
    await eventCell.hover();
    await eventCell.locator('.cell-quick-add-btn[aria-label="Add Domain Event"]').click();

    // Wait for DOM to update
    await page.locator('.domain-event-node').first().waitFor();

    // After placing, the quick-add placeholder at that cell should be gone
    const quickAddsAfter = await page.locator('.cell-quick-add').count();
    expect(quickAddsAfter).toBeLessThan(quickAddsBefore);
  });
});

test.describe('GridCanvas — Bounded Context Canvas Editing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.react-flow__pane');
    await page.evaluate(() => {
      const minimap = document.querySelector('.react-flow__minimap');
      if (minimap) (minimap as HTMLElement).style.display = 'none';
    });
  });

  test('renames a bounded context from its row label', async ({ page }) => {
    const viewport = page.locator('.react-flow__viewport');
    const labelButton = viewport.getByRole('button', { name: 'Bounded Context 1' }).first();
    await labelButton.click({ force: true });

    const nameInput = viewport.getByLabel('Bounded context name');
    await expect(nameInput).toBeVisible();
    await nameInput.fill('Payments');
    await nameInput.press('Enter');

    await expect(viewport.getByRole('button', { name: 'Payments' }).first()).toBeVisible();
  });

  test('shows a confirmation modal when deleting a bounded context containing domain events', async ({ page }) => {
    const viewport = page.locator('.react-flow__viewport');
    const eventCell = page.locator('.cell-quick-add[data-row="2"]').first();
    await eventCell.hover();
    await eventCell.locator('.cell-quick-add-btn[aria-label="Add Domain Event"]').click();
    await expect(page.locator('.domain-event-node')).toHaveCount(1);

    const deleteButton = viewport.getByTestId('bounded-context-delete-button').first();
    await deleteButton.click();

    const modal = page.getByRole('dialog', { name: 'Delete bounded context' });
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('contains 1 domain event');

    await modal.getByRole('button', { name: 'Cancel' }).click();
    await expect(modal).toBeHidden();

    await deleteButton.click();
    await modal.getByRole('button', { name: 'Delete' }).click();
    await expect(viewport.getByTestId('bounded-context-row-label')).toHaveCount(0);
  });

  test('adds bounded contexts with insert buttons between rows and below the last row', async ({ page }) => {
    const viewport = page.locator('.react-flow__viewport');
    const insertButtons = viewport.getByTestId('bounded-context-insert-button');
    await expect(insertButtons).toHaveCount(1);

    await insertButtons.first().click();
    await expect(viewport.getByTestId('bounded-context-row-label')).toHaveCount(2);

    await expect(viewport.getByTestId('bounded-context-insert-button')).toHaveCount(2);
    await viewport.getByTestId('bounded-context-insert-button').first().click();
    await expect(viewport.getByTestId('bounded-context-row-label')).toHaveCount(3);
  });
});
