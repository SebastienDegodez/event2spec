import { describe, it, expect } from 'vitest';
import { insertNodeAt } from '../../../src/core/usecases/insertNodeAt';
import type { GridNode } from '../../../src/core/domain/GridBoard';

// ─── Scenario 1: Empty board → node placed at exact target cell ────────────────
describe('insertNodeAt — empty board', () => {
  it('places the node at the requested column and row when the board is empty', () => {
    const initial: GridNode[] = [];
    const result = insertNodeAt(initial, { id: 'e1', label: 'OrderPlaced', column: 2, row: 3 });

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ id: 'e1', column: 2, row: 3 });
  });

  it('places the node at column 0, row 0 (origin)', () => {
    const result = insertNodeAt([], { id: 'e2', label: 'UserRegistered', column: 0, row: 0 });

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ id: 'e2', column: 0, row: 0 });
  });
});

// ─── Scenario 2: Occupied cell → shift existing nodes right ───────────────────
describe('insertNodeAt — collision right-shift', () => {
  it('shifts a single occupant one column to the right', () => {
    const occupant: GridNode = { id: 'existing', label: 'PaymentReceived', column: 2, row: 1 };
    const result = insertNodeAt([occupant], { id: 'new', label: 'OrderPlaced', column: 2, row: 1 });

    const shifted = result.find((n) => n.id === 'existing');
    const inserted = result.find((n) => n.id === 'new');

    expect(shifted?.column).toBe(3);
    expect(inserted?.column).toBe(2);
    expect(result).toHaveLength(2);
  });

  it('shifts every occupant in the same row at targetCol or beyond', () => {
    const board: GridNode[] = [
      { id: 'a', label: 'A', column: 2, row: 1 },
      { id: 'b', label: 'B', column: 3, row: 1 },
      { id: 'c', label: 'C', column: 4, row: 1 },
    ];
    const result = insertNodeAt(board, { id: 'new', label: 'New', column: 2, row: 1 });

    const nodeA = result.find((n) => n.id === 'a');
    const nodeB = result.find((n) => n.id === 'b');
    const nodeC = result.find((n) => n.id === 'c');
    const nodeNew = result.find((n) => n.id === 'new');

    expect(nodeA?.column).toBe(3);
    expect(nodeB?.column).toBe(4);
    expect(nodeC?.column).toBe(5);
    expect(nodeNew?.column).toBe(2);
  });

  it('does NOT shift nodes in a different row', () => {
    const board: GridNode[] = [
      { id: 'same-row', label: 'A', column: 2, row: 1 },
      { id: 'other-row', label: 'B', column: 2, row: 2 },
    ];
    const result = insertNodeAt(board, { id: 'new', label: 'New', column: 2, row: 1 });

    const otherRow = result.find((n) => n.id === 'other-row');
    const sameRow = result.find((n) => n.id === 'same-row');
    const nodeNew = result.find((n) => n.id === 'new');

    expect(otherRow?.column).toBe(2);
    expect(sameRow?.column).toBe(3);
    expect(nodeNew?.column).toBe(2);
  });

  it('does NOT shift nodes in the same row that are left of targetCol', () => {
    const board: GridNode[] = [
      { id: 'left', label: 'Left', column: 1, row: 0 },
      { id: 'target', label: 'Target', column: 2, row: 0 },
    ];
    const result = insertNodeAt(board, { id: 'new', label: 'New', column: 2, row: 0 });

    const left = result.find((n) => n.id === 'left');
    const target = result.find((n) => n.id === 'target');
    const nodeNew = result.find((n) => n.id === 'new');

    expect(left?.column).toBe(1);
    expect(target?.column).toBe(3);
    expect(nodeNew?.column).toBe(2);
  });
});

// ─── Scenario 3: No pixel coordinates stored ──────────────────────────────────
describe('insertNodeAt — immutability and shape', () => {
  it('does not mutate the original board array', () => {
    const board: GridNode[] = [{ id: 'x', label: 'X', column: 0, row: 0 }];
    const original = [...board];
    insertNodeAt(board, { id: 'y', label: 'Y', column: 0, row: 0 });

    expect(board).toEqual(original);
  });

  it('returns nodes that only have id, label, column, row — no pixel coordinates', () => {
    const result = insertNodeAt([], { id: 'z', label: 'Z', column: 3, row: 2 });
    const node = result[0];

    expect(node).toHaveProperty('id');
    expect(node).toHaveProperty('label');
    expect(node).toHaveProperty('column');
    expect(node).toHaveProperty('row');
    expect(node).not.toHaveProperty('x');
    expect(node).not.toHaveProperty('y');
  });
});
