import { describe, it, expect } from 'vitest';
import { insertNodeAt } from '../../../src/core/usecases/insertNodeAt';
import type { GridNode } from '../../../src/core/domain/GridBoard';

// ─── Scenario 1: Empty board → node placed at exact target cell ────────────────
describe('insertNodeAt — empty board', () => {
  it('places the node at the requested col and row when the board is empty', () => {
    const initial: GridNode[] = [];
    const result = insertNodeAt(initial, { id: 'e1', label: 'OrderPlaced', col: 2, row: 3 });

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ id: 'e1', col: 2, row: 3 });
  });

  it('places the node at col 0, row 0 (origin)', () => {
    const result = insertNodeAt([], { id: 'e2', label: 'UserRegistered', col: 0, row: 0 });

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ id: 'e2', col: 0, row: 0 });
  });
});

// ─── Scenario 2: Occupied cell → shift existing nodes right ───────────────────
describe('insertNodeAt — collision right-shift', () => {
  it('shifts a single occupant one column to the right', () => {
    const occupant: GridNode = { id: 'existing', label: 'PaymentReceived', col: 2, row: 1 };
    const result = insertNodeAt([occupant], { id: 'new', label: 'OrderPlaced', col: 2, row: 1 });

    const shifted = result.find((n) => n.id === 'existing');
    const inserted = result.find((n) => n.id === 'new');

    expect(shifted?.col).toBe(3);
    expect(inserted?.col).toBe(2);
    expect(result).toHaveLength(2);
  });

  it('shifts every occupant in the same row at targetCol or beyond', () => {
    const board: GridNode[] = [
      { id: 'a', label: 'A', col: 2, row: 1 },
      { id: 'b', label: 'B', col: 3, row: 1 },
      { id: 'c', label: 'C', col: 4, row: 1 },
    ];
    const result = insertNodeAt(board, { id: 'new', label: 'New', col: 2, row: 1 });

    expect(result.find((n) => n.id === 'a')?.col).toBe(3);
    expect(result.find((n) => n.id === 'b')?.col).toBe(4);
    expect(result.find((n) => n.id === 'c')?.col).toBe(5);
    expect(result.find((n) => n.id === 'new')?.col).toBe(2);
  });

  it('does NOT shift nodes in a different row', () => {
    const board: GridNode[] = [
      { id: 'same-row', label: 'A', col: 2, row: 1 },
      { id: 'other-row', label: 'B', col: 2, row: 2 },
    ];
    const result = insertNodeAt(board, { id: 'new', label: 'New', col: 2, row: 1 });

    expect(result.find((n) => n.id === 'other-row')?.col).toBe(2);
    expect(result.find((n) => n.id === 'same-row')?.col).toBe(3);
    expect(result.find((n) => n.id === 'new')?.col).toBe(2);
  });

  it('does NOT shift nodes in the same row that are left of targetCol', () => {
    const board: GridNode[] = [
      { id: 'left', label: 'Left', col: 1, row: 0 },
      { id: 'target', label: 'Target', col: 2, row: 0 },
    ];
    const result = insertNodeAt(board, { id: 'new', label: 'New', col: 2, row: 0 });

    expect(result.find((n) => n.id === 'left')?.col).toBe(1);
    expect(result.find((n) => n.id === 'target')?.col).toBe(3);
    expect(result.find((n) => n.id === 'new')?.col).toBe(2);
  });
});

// ─── Scenario 3: No pixel coordinates stored ──────────────────────────────────
describe('insertNodeAt — immutability and shape', () => {
  it('does not mutate the original board array', () => {
    const board: GridNode[] = [{ id: 'x', label: 'X', col: 0, row: 0 }];
    const original = [...board];
    insertNodeAt(board, { id: 'y', label: 'Y', col: 0, row: 0 });

    expect(board).toEqual(original);
  });

  it('returns nodes that only have id, label, col, row — no pixel coordinates', () => {
    const result = insertNodeAt([], { id: 'z', label: 'Z', col: 3, row: 2 });
    const node = result[0];

    expect(node).toHaveProperty('id');
    expect(node).toHaveProperty('label');
    expect(node).toHaveProperty('col');
    expect(node).toHaveProperty('row');
    expect(node).not.toHaveProperty('x');
    expect(node).not.toHaveProperty('y');
  });
});
