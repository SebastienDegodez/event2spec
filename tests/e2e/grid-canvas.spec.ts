import { test, expect } from '@playwright/test';

test.describe('GridCanvas — Snap-to-Grid Acceptance', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.react-flow__pane');
  });

  test('displays a dot-grid background on an empty board', async ({ page }) => {
    const background = page.locator('.react-flow__background');
    await expect(background).toBeVisible();
  });

  test('clicking a palette item creates a new domain event', async ({ page }) => {
    const paletteItem = page.locator('.palette-event');
    await paletteItem.click();

    const note = page.locator('.domain-event-node').first();
    await expect(note).toBeVisible();
    await expect(note.locator('.note-type-badge')).toHaveText('Domain Event');
  });

  test('right-clicking the canvas and selecting "Add domain event" creates a note', async ({ page }) => {
    const pane = page.locator('.react-flow__pane');
    await pane.click({ position: { x: 350, y: 250 }, button: 'right' });

    const menuItem = page.locator('.context-menu-item', { hasText: 'Add domain event' });
    await expect(menuItem).toBeVisible();
    await menuItem.click();

    const note = page.locator('.domain-event-node').first();
    await expect(note).toBeVisible();
    await expect(note.locator('.note-type-badge')).toHaveText('Domain Event');
  });

  test('dropping a note onto an occupied cell shifts the existing note right', async ({
    page,
  }) => {
    const pane = page.locator('.react-flow__pane');

    // Create note A via right-click context menu
    await pane.click({ position: { x: 350, y: 250 }, button: 'right' });
    await page.locator('.context-menu-item', { hasText: 'Add domain event' }).click();
    await expect(page.locator('.domain-event-node')).toHaveCount(1);

    // Read the column of note A
    const noteA = page.locator('.domain-event-node').first();
    const columnA = await noteA.getAttribute('data-column');
    const idA = await noteA.getAttribute('data-id');
    expect(columnA).not.toBeNull();

    // Create note B at a different position (one grid cell to the right)
    await pane.click({ position: { x: 350 + 250, y: 250 }, button: 'right' });
    await page.locator('.context-menu-item', { hasText: 'Add domain event' }).click();
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

  test('clicking the note label enters edit mode and updates the label', async ({ page }) => {
    const pane = page.locator('.react-flow__pane');

    // Create a note via right-click context menu
    await pane.click({ position: { x: 350, y: 250 }, button: 'right' });
    await page.locator('.context-menu-item', { hasText: 'Add domain event' }).click();

    const note = page.locator('.domain-event-node').first();
    await expect(note).toBeVisible();

    // Click the note label to enter edit mode
    const noteLabel = note.locator('.note-label');
    await noteLabel.click();

    const editor = note.locator('.note-editor');
    await expect(editor).toBeVisible();

    await editor.fill('OrderPlaced');
    await editor.press('Enter');

    await expect(note.locator('.note-label')).toHaveText('OrderPlaced');
  });

  test('right-clicking a node shows insert before and after options', async ({ page }) => {
    const pane = page.locator('.react-flow__pane');

    // Create a note via right-click context menu
    await pane.click({ position: { x: 350, y: 250 }, button: 'right' });
    await page.locator('.context-menu-item', { hasText: 'Add domain event' }).click();
    await expect(page.locator('.domain-event-node')).toHaveCount(1);

    // Right-click the note to get the node context menu
    const note = page.locator('.domain-event-node').first();
    await note.click({ button: 'right' });

    await expect(page.locator('.context-menu-item', { hasText: 'Insert event before' })).toBeVisible();
    await expect(page.locator('.context-menu-item', { hasText: 'Insert event after' })).toBeVisible();
  });

  test('inserting an event before shifts the existing node right', async ({ page }) => {
    const pane = page.locator('.react-flow__pane');

    // Create a note via right-click context menu
    await pane.click({ position: { x: 350, y: 250 }, button: 'right' });
    await page.locator('.context-menu-item', { hasText: 'Add domain event' }).click();
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
    const pane = page.locator('.react-flow__pane');

    // Create a note via right-click context menu
    await pane.click({ position: { x: 350, y: 250 }, button: 'right' });
    await page.locator('.context-menu-item', { hasText: 'Add domain event' }).click();
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
