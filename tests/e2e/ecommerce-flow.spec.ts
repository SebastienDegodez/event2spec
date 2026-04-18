import { test, expect, type Page } from '@playwright/test';

// ─── Helpers ────────────────────────────────────────────────────

const EMPTY_BOARD_STATE = {
  version: 2,
  nodes: [],
  links: [],
  slices: [],
  boundedContexts: [{ id: 'default-bc', name: 'Bounded Context 1' }],
  nodeProperties: {},
};

async function seedEmptyBoard(page: Page) {
  await page.addInitScript((state) => {
    window.localStorage.clear();
    window.localStorage.setItem('event2spec-board', JSON.stringify(state));
  }, EMPTY_BOARD_STATE);
}

async function hideMinimap(page: Page) {
  await page.evaluate(() => {
    const minimap = document.querySelector('.react-flow__minimap');
    if (minimap) (minimap as HTMLElement).style.display = 'none';
  });
}

/** Create a node via quick-add button in a specific row and return it. */
async function quickAdd(
  page: Page,
  row: number,
  ariaLabel: string,
  nodeClass: string,
  expectedCount: number,
) {
  const cells = page.locator(`.cell-quick-add[data-row="${row}"]`);
  const cell = cells.first();
  await cell.hover();
  await cell.locator(`.cell-quick-add-btn[aria-label="${ariaLabel}"]`).click();
  await expect(page.locator(`.${nodeClass}`)).toHaveCount(expectedCount);
  // The newest node is in editing mode — return it
  const node = page.locator(`.${nodeClass}`).nth(expectedCount - 1);
  return node;
}

/** Rename a node that is currently in inline-editing mode. */
async function renameInlineEditor(page: Page, node: ReturnType<typeof page.locator>, newLabel: string) {
  const editor = node.locator('.note-editor');
  await expect(editor).toBeVisible();
  await editor.fill(newLabel);
  await editor.press('Enter');
  await expect(node.locator('.note-label')).toHaveText(newLabel);
}

/** Drag node from its current position to a target pixel offset. */
async function dragNode(page: Page, node: ReturnType<typeof page.locator>, deltaX: number, deltaY: number) {
  const box = await node.boundingBox();
  if (!box) throw new Error('Could not get node bounding box');
  const cx = box.x + box.width / 2;
  const cy = box.y + box.height / 2;
  await page.mouse.move(cx, cy);
  await page.mouse.down();
  await page.mouse.move(cx + deltaX / 2, cy + deltaY / 2, { steps: 5 });
  await page.mouse.move(cx + deltaX, cy + deltaY, { steps: 10 });
  await page.mouse.up();
}

// ─── Full E-commerce Event Storming Flow ────────────────────────

test.describe('Ecommerce Flow — Full Event Storming Journey', () => {
  test.beforeEach(async ({ page }) => {
    await seedEmptyBoard(page);
    await page.goto('/');
    await page.waitForSelector('.react-flow__pane');
    await hideMinimap(page);
  });

  test('complete ecommerce board: events → BCs → commands → read models → drag → slices → edit', async ({ page }) => {
    // ═══════════════════════════════════════════════════════════
    // ACT 1 — Event Discovery (Event Storming)
    // ═══════════════════════════════════════════════════════════

    // Create 3 domain events in bounded-context row (row 2)
    const evt1 = await quickAdd(page, 2, 'Add Domain Event', 'domain-event-node', 1);
    await renameInlineEditor(page, evt1, 'Product Added To Cart');

    const evt2 = await quickAdd(page, 2, 'Add Domain Event', 'domain-event-node', 2);
    await renameInlineEditor(page, evt2, 'Payment Processed');

    const evt3 = await quickAdd(page, 2, 'Add Domain Event', 'domain-event-node', 3);
    await renameInlineEditor(page, evt3, 'Order Confirmed');

    // Verify all 3 events exist
    await expect(page.locator('.domain-event-node')).toHaveCount(3);

    // ═══════════════════════════════════════════════════════════
    // ACT 2 — Bounded Context Organisation
    // ═══════════════════════════════════════════════════════════

    // Rename default BC to "Shopping"
    const bcLabel = page.getByTestId('fixed-bounded-context-row-label').first();
    await bcLabel.hover();
    await bcLabel.getByRole('button', { name: 'Edit' }).click();
    const nameInput = page.getByLabel('New name');
    await nameInput.fill('Shopping');
    await nameInput.press('Enter');
    // Move focus away from the input
    await page.locator('.app-header').hover();
    await expect(page.getByTestId('fixed-bounded-context-row-label').first()).toContainText('Shopping');

    // Add a second BC — "Payment"
    const insertButtons = page.getByTestId('bounded-context-insert-button');
    await insertButtons.last().click();
    await expect(page.getByTestId('fixed-bounded-context-row-label')).toHaveCount(2);

    // Add a third BC — "Typo Context" (deliberate typo, we will rename)
    await page.getByTestId('bounded-context-insert-button').last().click();
    await expect(page.getByTestId('fixed-bounded-context-row-label')).toHaveCount(3);

    // Rename 2nd BC to "Payment"
    const bcLabel2 = page.getByTestId('fixed-bounded-context-row-label').nth(1);
    await bcLabel2.hover();
    await bcLabel2.getByRole('button', { name: 'Edit' }).click();
    const nameInput2 = page.getByLabel('New name');
    await nameInput2.fill('Payment');
    await nameInput2.press('Enter');
    await page.locator('.app-header').hover();
    await expect(page.getByTestId('fixed-bounded-context-row-label').nth(1)).toContainText('Payment');

    // Rename 3rd BC — fix the typo → "Fulfillment"
    const bcLabel3 = page.getByTestId('fixed-bounded-context-row-label').nth(2);
    await bcLabel3.hover();
    await bcLabel3.getByRole('button', { name: 'Edit' }).click();
    const nameInput3 = page.getByLabel('New name');
    await nameInput3.fill('Fulfillment');
    await nameInput3.press('Enter');
    await page.locator('.app-header').hover();
    await expect(page.getByTestId('fixed-bounded-context-row-label').nth(2)).toContainText('Fulfillment');

    // Add an event inside the "Fulfillment" BC (row 4 = 2 fixed + index 2)
    // Scroll the ReactFlow pane down so row 4 is visible
    const pane = page.locator('.react-flow__pane');
    const paneBox = await pane.boundingBox();
    if (!paneBox) throw new Error('Could not get pane bounding box');
    const paneCx = paneBox.x + paneBox.width / 2;
    const paneCy = paneBox.y + paneBox.height / 2;
    await page.mouse.move(paneCx, paneCy);
    await page.mouse.down();
    await page.mouse.move(paneCx, paneCy - 300, { steps: 10 });
    await page.mouse.up();
    // Wait for viewport cells to recalculate
    await page.waitForTimeout(300);

    const fulfillmentEventCell = page.locator('.cell-quick-add[data-row="4"]').first();
    await fulfillmentEventCell.hover();
    await fulfillmentEventCell.locator('.cell-quick-add-btn[aria-label="Add Domain Event"]').click();
    const strayEvent = page.locator('.domain-event-node').last();
    const strayEditor = strayEvent.locator('.note-editor');
    await expect(strayEditor).toBeVisible();
    await strayEditor.fill('Stray Event');
    await strayEditor.press('Enter');
    await expect(page.locator('.domain-event-node')).toHaveCount(4);

    // Try to delete "Fulfillment" — modal appears because it has an event
    await bcLabel3.hover();
    await bcLabel3.getByRole('button', { name: 'Delete' }).click();
    const deleteModal = page.getByRole('dialog', { name: 'Delete Bounded Context?' });
    await expect(deleteModal).toBeVisible();
    await expect(deleteModal).toContainText('Fulfillment');

    // Cancel — we want to save the event first
    await deleteModal.getByRole('button', { name: 'Cancel' }).click();
    await expect(deleteModal).toBeHidden();
    // BC and event still exist
    await expect(page.getByTestId('fixed-bounded-context-row-label')).toHaveCount(3);
    await expect(page.locator('.domain-event-node')).toHaveCount(4);

    // Remove the stray event from the "Fulfillment" BC using its delete button
    await strayEvent.locator('.note-delete').click();
    await expect(page.locator('.domain-event-node')).toHaveCount(3);

    // Now "Fulfillment" is empty — delete succeeds without modal
    const bcLabel3AfterClean = page.getByTestId('fixed-bounded-context-row-label').nth(2);
    await bcLabel3AfterClean.hover();
    await bcLabel3AfterClean.getByRole('button', { name: 'Delete' }).click();
    await expect(page.getByTestId('fixed-bounded-context-row-label')).toHaveCount(2);

    // ═══════════════════════════════════════════════════════════
    // ACT 3 — Associate Commands
    // ═══════════════════════════════════════════════════════════

    // Read event columns to place commands on the same columns
    const evt1Column = await evt1.getAttribute('data-column');
    const evt2Column = await evt2.getAttribute('data-column');
    const evt3Column = await evt3.getAttribute('data-column');

    // Create commands in row 1 (command_readmodel row)
    const cmd1 = await quickAdd(page, 1, 'Add Command', 'command-node', 1);
    await renameInlineEditor(page, cmd1, 'Add To Cart');

    const cmd2 = await quickAdd(page, 1, 'Add Command', 'command-node', 2);
    await renameInlineEditor(page, cmd2, 'Process Payment');

    const cmd3 = await quickAdd(page, 1, 'Add Command', 'command-node', 3);
    await renameInlineEditor(page, cmd3, 'Confirm Order');

    // Verify auto-links "triggers" were created between commands and events
    // (commands placed on same columns as events should auto-link)
    const triggerEdges = page.locator('.react-flow__edge-text', { hasText: 'triggers' });
    // At minimum, commands and events in same columns should be linked
    await expect(triggerEdges.first()).toBeVisible();

    // ═══════════════════════════════════════════════════════════
    // ACT 4 — Add Read Models
    // ═══════════════════════════════════════════════════════════

    const rm1 = await quickAdd(page, 1, 'Add Read Model', 'read-model-node', 1);
    await renameInlineEditor(page, rm1, 'Cart Projection');

    const rm2 = await quickAdd(page, 1, 'Add Read Model', 'read-model-node', 2);
    await renameInlineEditor(page, rm2, 'Order Summary');

    await expect(page.locator('.read-model-node')).toHaveCount(2);

    // ═══════════════════════════════════════════════════════════
    // ACT 5 — Drag & Drop Rearrangement
    // ═══════════════════════════════════════════════════════════

    // Drag the 3rd event one column to the right (200px = 1 grid cell)
    const evt3ColumnBefore = await evt3.getAttribute('data-column');
    await dragNode(page, evt3, 200, 0);
    // Wait for the column attribute to update
    await expect(evt3).not.toHaveAttribute('data-column', evt3ColumnBefore!);

    // Drag it back to its original position
    await dragNode(page, evt3, -200, 0);

    // ═══════════════════════════════════════════════════════════
    // ACT 6 — Slice Creation, Deletion, Recreation
    // ═══════════════════════════════════════════════════════════

    // Select a free column to start a slice
    const firstFreeHitbox = page.locator('[data-testid^="slice-column-hitbox-"]').first();
    await firstFreeHitbox.click();
    await expect(page.getByTestId('slice-selection-header')).toBeVisible();

    // Extend the selection right
    const extendButton = page.getByTestId('slice-selection-extend-right');
    if (await extendButton.isEnabled()) {
      await extendButton.click();
    }

    // The Slice Editor should appear on the right
    const sliceEditor = page.getByLabel('Slice editor');
    await expect(sliceEditor).toBeVisible();

    // Fill the slice name
    await sliceEditor.getByLabel('Slice name').fill('Bad Slice');

    // Select the first command from the dropdown
    const cmdSelect = sliceEditor.getByLabel('Select command');
    await cmdSelect.selectOption({ index: 1 });

    // Create the bad slice
    await sliceEditor.getByRole('button', { name: 'Create Slice' }).click();

    // Verify it appeared in the header
    const badSliceHeader = page.locator('.slice-header-chip:not(.slice-header-chip--temporary)', { hasText: 'Bad Slice' });
    await expect(badSliceHeader).toBeVisible();

    // Delete the bad slice
    await badSliceHeader.getByTestId('slice-header-delete').click();
    await expect(badSliceHeader).toBeHidden();

    // Now create the correct slice — "Add to Cart Flow"
    const hitbox = page.locator('[data-testid^="slice-column-hitbox-"]').first();
    await hitbox.click();
    await expect(page.getByTestId('slice-selection-header')).toBeVisible();

    const sliceEditor2 = page.getByLabel('Slice editor');
    await expect(sliceEditor2).toBeVisible();
    await sliceEditor2.getByLabel('Slice name').fill('Add to Cart Flow');
    const cmdSelect2 = sliceEditor2.getByLabel('Select command');
    await cmdSelect2.selectOption({ index: 1 });
    await sliceEditor2.getByRole('button', { name: 'Create Slice' }).click();

    // Verify the correct slice exists
    const goodSliceHeader = page.locator('.slice-header-chip:not(.slice-header-chip--temporary)', { hasText: 'Add to Cart Flow' });
    await expect(goodSliceHeader).toBeVisible();

    // Open the slice inspector via Edit button
    await goodSliceHeader.getByTestId('slice-header-edit').click();
    const sliceInspector = page.getByLabel('Slice inspector');
    await expect(sliceInspector).toBeVisible();
    await expect(sliceInspector).toContainText('Add to Cart Flow');

    // Close the inspector
    await sliceInspector.getByLabel('Close').click();
    await expect(sliceInspector).toBeHidden();

    // ═══════════════════════════════════════════════════════════
    // ACT 7 — Edit Card Properties via Properties Panel
    // ═══════════════════════════════════════════════════════════

    // Click on a domain event to open the properties panel
    await evt1.click();
    const propsPanel = page.getByLabel('Node properties');
    await expect(propsPanel).toBeVisible();
    await expect(propsPanel).toContainText('Domain Event');

    // Edit the label via the properties panel
    const labelInput = propsPanel.locator('.properties-field-input').first();
    await labelInput.fill('Product Added');
    // Verify the node label updated on the canvas
    await expect(evt1.locator('.note-label')).toHaveText('Product Added');

    // Close the properties panel
    await propsPanel.getByLabel('Close panel').click();
    await expect(propsPanel).toBeHidden();

    // Click on a command to edit its properties
    await cmd1.click();
    const cmdPropsPanel = page.getByLabel('Node properties');
    await expect(cmdPropsPanel).toBeVisible();
    await expect(cmdPropsPanel).toContainText('Command');

    // Edit the actor field
    const actorInput = cmdPropsPanel.locator('input[placeholder="e.g. Customer"]');
    await actorInput.fill('Shopper');
    // Verify the value persisted in the input
    await expect(actorInput).toHaveValue('Shopper');

    // Close panel
    await cmdPropsPanel.getByLabel('Close panel').click();
    await expect(cmdPropsPanel).toBeHidden();

    // Reopen the command properties — verify actor is still "Shopper"
    await cmd1.click();
    const cmdPropsPanel2 = page.getByLabel('Node properties');
    await expect(cmdPropsPanel2).toBeVisible();
    const actorInput2 = cmdPropsPanel2.locator('input[placeholder="e.g. Customer"]');
    await expect(actorInput2).toHaveValue('Shopper');

    // Close and final board state verification
    await cmdPropsPanel2.getByLabel('Close panel').click();

    // Final assertions — board has the expected items
    await expect(page.locator('.domain-event-node')).toHaveCount(3);
    await expect(page.locator('.command-node')).toHaveCount(3);
    await expect(page.locator('.read-model-node')).toHaveCount(2);
    await expect(page.getByTestId('fixed-bounded-context-row-label')).toHaveCount(2);
    await expect(goodSliceHeader).toBeVisible();
  });
});
