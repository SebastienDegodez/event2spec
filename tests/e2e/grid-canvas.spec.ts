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

  test('double-clicking the canvas creates a Domain Event note', async ({ page }) => {
    const pane = page.locator('.react-flow__pane');
    await pane.dblclick({ position: { x: 350, y: 250 } });

    const note = page.locator('.domain-event-node').first();
    await expect(note).toBeVisible();
    await expect(note.locator('.note-type-badge')).toHaveText('Domain Event');
  });

  test('dropping a note onto an occupied cell shifts the existing note right', async ({
    page,
  }) => {
    const pane = page.locator('.react-flow__pane');

    // Create note A by double-clicking at position (350, 250) in the pane
    await pane.dblclick({ position: { x: 350, y: 250 } });
    await expect(page.locator('.domain-event-node')).toHaveCount(1);

    // Read the column of note A
    const noteA = page.locator('.domain-event-node').first();
    const columnA = await noteA.getAttribute('data-column');
    const idA = await noteA.getAttribute('data-id');
    expect(columnA).not.toBeNull();

    // Create note B at a different position (one grid cell to the right of A's click position)
    await pane.dblclick({ position: { x: 350 + 250, y: 250 } });
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

  test('inline editing updates the note label', async ({ page }) => {
    const pane = page.locator('.react-flow__pane');
    await pane.dblclick({ position: { x: 350, y: 250 } });

    const note = page.locator('.domain-event-node').first();
    await expect(note).toBeVisible();

    // Double-click the note label area to enter edit mode
    const noteLabel = note.locator('.note-label');
    await noteLabel.dblclick();

    const editor = note.locator('.note-editor');
    await expect(editor).toBeVisible();

    await editor.fill('OrderPlaced');
    await editor.press('Enter');

    await expect(note.locator('.note-label')).toHaveText('OrderPlaced');
  });
});
