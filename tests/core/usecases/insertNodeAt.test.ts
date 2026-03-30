import { describe, it, expect } from 'vitest';
import { insertNodeAt } from '../../../src/core/usecases/insertNodeAt';
import { DomainEventNode } from '../../../src/core/domain/DomainEventNode';
import { GridPosition } from '../../../src/core/domain/GridPosition';

// ─── Scenario 1: Empty board → node placed at exact target cell ────────────────
describe('insertNodeAt — empty board', () => {
  it('places the node at the requested column and row when the board is empty', () => {
    const result = insertNodeAt(
      [],
      new DomainEventNode('e1', 'OrderPlaced', new GridPosition(2, 3))
    );

    expect(result).toHaveLength(1);
    const placed = result[0];
    expect(placed.isAt(new GridPosition(2, 3))).toBe(true);
  });

  it('places the node at column 0, row 0 (origin)', () => {
    const result = insertNodeAt(
      [],
      new DomainEventNode('e2', 'UserRegistered', new GridPosition(0, 0))
    );

    expect(result).toHaveLength(1);
    const placed = result[0];
    expect(placed.isAt(new GridPosition(0, 0))).toBe(true);
  });
});

// ─── Scenario 2: Occupied cell → shift existing nodes right ───────────────────
describe('insertNodeAt — collision right-shift', () => {
  it('shifts a single occupant one column to the right', () => {
    const occupant = new DomainEventNode('existing', 'PaymentReceived', new GridPosition(2, 1));
    const result = insertNodeAt(
      [occupant],
      new DomainEventNode('new', 'OrderPlaced', new GridPosition(2, 1))
    );

    const shifted = result.find((n) => n.id === 'existing');
    const inserted = result.find((n) => n.id === 'new');

    expect(shifted?.isAt(new GridPosition(3, 1))).toBe(true);
    expect(inserted?.isAt(new GridPosition(2, 1))).toBe(true);
    expect(result).toHaveLength(2);
  });

  it('shifts every occupant in the same row at targetCol or beyond', () => {
    const board = [
      new DomainEventNode('a', 'A', new GridPosition(2, 1)),
      new DomainEventNode('b', 'B', new GridPosition(3, 1)),
      new DomainEventNode('c', 'C', new GridPosition(4, 1)),
    ];
    const result = insertNodeAt(
      board,
      new DomainEventNode('new', 'New', new GridPosition(2, 1))
    );

    const nodeA = result.find((n) => n.id === 'a');
    const nodeB = result.find((n) => n.id === 'b');
    const nodeC = result.find((n) => n.id === 'c');
    const nodeNew = result.find((n) => n.id === 'new');

    expect(nodeA?.isAt(new GridPosition(3, 1))).toBe(true);
    expect(nodeB?.isAt(new GridPosition(4, 1))).toBe(true);
    expect(nodeC?.isAt(new GridPosition(5, 1))).toBe(true);
    expect(nodeNew?.isAt(new GridPosition(2, 1))).toBe(true);
  });

  it('does NOT shift nodes in a different row', () => {
    const board = [
      new DomainEventNode('same-row', 'A', new GridPosition(2, 1)),
      new DomainEventNode('other-row', 'B', new GridPosition(2, 2)),
    ];
    const result = insertNodeAt(
      board,
      new DomainEventNode('new', 'New', new GridPosition(2, 1))
    );

    const otherRow = result.find((n) => n.id === 'other-row');
    const sameRow = result.find((n) => n.id === 'same-row');
    const nodeNew = result.find((n) => n.id === 'new');

    expect(otherRow?.isAt(new GridPosition(2, 2))).toBe(true);
    expect(sameRow?.isAt(new GridPosition(3, 1))).toBe(true);
    expect(nodeNew?.isAt(new GridPosition(2, 1))).toBe(true);
  });

  it('does NOT shift nodes in the same row that are left of targetCol', () => {
    const board = [
      new DomainEventNode('left', 'Left', new GridPosition(1, 0)),
      new DomainEventNode('target', 'Target', new GridPosition(2, 0)),
    ];
    const result = insertNodeAt(
      board,
      new DomainEventNode('new', 'New', new GridPosition(2, 0))
    );

    const left = result.find((n) => n.id === 'left');
    const target = result.find((n) => n.id === 'target');
    const nodeNew = result.find((n) => n.id === 'new');

    expect(left?.isAt(new GridPosition(1, 0))).toBe(true);
    expect(target?.isAt(new GridPosition(3, 0))).toBe(true);
    expect(nodeNew?.isAt(new GridPosition(2, 0))).toBe(true);
  });
});

// ─── Scenario 3: Immutability ─────────────────────────────────────────────────
describe('insertNodeAt — immutability', () => {
  it('does not mutate the original board array', () => {
    const node = new DomainEventNode('x', 'X', new GridPosition(0, 0));
    const board = [node];
    const original = [...board];
    insertNodeAt(board, new DomainEventNode('y', 'Y', new GridPosition(0, 0)));

    expect(board).toHaveLength(original.length);
    expect(board[0]).toBe(original[0]);
  });

  it('returns DomainEventNode instances with no pixel coordinates', () => {
    const result = insertNodeAt(
      [],
      new DomainEventNode('z', 'Z', new GridPosition(3, 2))
    );
    const node = result[0];

    expect(node).toBeInstanceOf(DomainEventNode);
    expect(node).not.toHaveProperty('x');
    expect(node).not.toHaveProperty('y');
  });
});
