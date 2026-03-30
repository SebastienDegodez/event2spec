import { describe, it, expect } from 'vitest';
import { GridPosition } from '../../../src/core/domain/GridPosition';
import { DomainEventNode } from '../../../src/core/domain/DomainEventNode';
import { GridBoard } from '../../../src/core/domain/GridBoard';

// ─── GridPosition ────────────────────────────────────────────────────────────
describe('GridPosition', () => {
  it('reports whether two positions are equal', () => {
    const a = new GridPosition(2, 3);
    const b = new GridPosition(2, 3);
    const c = new GridPosition(1, 3);

    expect(a.equals(b)).toBe(true);
    expect(a.equals(c)).toBe(false);
  });

  it('reports whether this position must shift right given a target insertion position', () => {
    const base = new GridPosition(2, 1);
    const targetBefore = new GridPosition(1, 1);  // target at column=1 → base(column=2) is beyond → shift
    const targetAt = new GridPosition(2, 1);       // target at column=2 → base(column=2) is at → shift
    const targetAfter = new GridPosition(3, 1);    // target at column=3 → base(column=2) is before → no shift
    const differentRow = new GridPosition(2, 2);   // different row → no shift

    expect(base.isSameRowAndAtOrBeyond(targetBefore)).toBe(true);
    expect(base.isSameRowAndAtOrBeyond(targetAt)).toBe(true);
    expect(base.isSameRowAndAtOrBeyond(targetAfter)).toBe(false);
    expect(base.isSameRowAndAtOrBeyond(differentRow)).toBe(false);
  });

  it('returns a new position shifted one column to the right', () => {
    const pos = new GridPosition(2, 1);
    const shifted = pos.shiftRight();

    expect(shifted.column).toBe(3);
    expect(shifted.row).toBe(1);
  });
});

// ─── DomainEventNode ────────────────────────────────────────────────────────
describe('DomainEventNode', () => {
  it('exposes its position', () => {
    const pos = new GridPosition(1, 0);
    const node = new DomainEventNode('n1', 'OrderPlaced', pos);

    expect(node.position.column).toBe(1);
    expect(node.position.row).toBe(0);
  });

  it('returns a new node shifted one column to the right', () => {
    const node = new DomainEventNode('n2', 'PaymentReceived', new GridPosition(3, 2));
    const shifted = node.shiftRight();

    expect(shifted.id).toBe('n2');
    expect(shifted.label).toBe('PaymentReceived');
    expect(shifted.position.column).toBe(4);
    expect(shifted.position.row).toBe(2);
  });

  it('returns a node with an updated label', () => {
    const node = new DomainEventNode('n3', 'OldLabel', new GridPosition(0, 0));
    const updated = node.withLabel('NewLabel');

    expect(updated.id).toBe('n3');
    expect(updated.label).toBe('NewLabel');
  });
});

// ─── GridBoard ───────────────────────────────────────────────────────────────
describe('GridBoard', () => {
  it('is empty when first created', () => {
    const board = GridBoard.empty();
    expect(board.toArray()).toHaveLength(0);
  });

  it('places a node when the target cell is empty', () => {
    const board = GridBoard.empty();
    const node = new DomainEventNode('e1', 'OrderPlaced', new GridPosition(2, 0));

    const result = board.insertNode(node);

    expect(result.toArray()).toHaveLength(1);
    expect(result.toArray()[0].position.column).toBe(2);
  });

  it('shifts an occupant right when inserting at its position', () => {
    const occupant = new DomainEventNode('existing', 'PaymentReceived', new GridPosition(2, 1));
    const board = GridBoard.empty().insertNode(occupant);
    const incoming = new DomainEventNode('new', 'OrderPlaced', new GridPosition(2, 1));

    const result = board.insertNode(incoming);

    const shifted = result.toArray().find((n) => n.id === 'existing');
    const inserted = result.toArray().find((n) => n.id === 'new');

    expect(shifted?.position.column).toBe(3);
    expect(inserted?.position.column).toBe(2);
    expect(result.toArray()).toHaveLength(2);
  });

  it('shifts every node in the same row at targetCol or beyond', () => {
    const board = GridBoard.empty()
      .insertNode(new DomainEventNode('a', 'A', new GridPosition(2, 1)))
      .insertNode(new DomainEventNode('b', 'B', new GridPosition(3, 1)))
      .insertNode(new DomainEventNode('c', 'C', new GridPosition(4, 1)));

    const result = board.insertNode(new DomainEventNode('new', 'New', new GridPosition(2, 1)));
    const nodes = result.toArray();

    expect(nodes.find((n) => n.id === 'a')?.position.column).toBe(3);
    expect(nodes.find((n) => n.id === 'b')?.position.column).toBe(4);
    expect(nodes.find((n) => n.id === 'c')?.position.column).toBe(5);
    expect(nodes.find((n) => n.id === 'new')?.position.column).toBe(2);
  });

  it('does NOT shift nodes in a different row', () => {
    const board = GridBoard.empty()
      .insertNode(new DomainEventNode('same', 'A', new GridPosition(2, 1)))
      .insertNode(new DomainEventNode('other', 'B', new GridPosition(2, 2)));

    const result = board.insertNode(new DomainEventNode('new', 'New', new GridPosition(2, 1)));
    const nodes = result.toArray();

    expect(nodes.find((n) => n.id === 'other')?.position.column).toBe(2);
    expect(nodes.find((n) => n.id === 'same')?.position.column).toBe(3);
  });

  it('does not mutate the original board', () => {
    const board = GridBoard.empty().insertNode(
      new DomainEventNode('x', 'X', new GridPosition(0, 0))
    );
    board.insertNode(new DomainEventNode('y', 'Y', new GridPosition(0, 0)));

    expect(board.toArray()).toHaveLength(1);
  });

  it('removes a node by id', () => {
    const board = GridBoard.empty()
      .insertNode(new DomainEventNode('keep', 'Keep', new GridPosition(0, 0)))
      .insertNode(new DomainEventNode('remove', 'Remove', new GridPosition(1, 0)));

    const result = board.removeNode('remove');
    expect(result.toArray()).toHaveLength(1);
    expect(result.toArray()[0].id).toBe('keep');
  });

  it('moves a node and resolves collisions', () => {
    const board = GridBoard.empty()
      .insertNode(new DomainEventNode('a', 'A', new GridPosition(0, 0)))
      .insertNode(new DomainEventNode('b', 'B', new GridPosition(1, 0)));

    const result = board.moveNode('a', new GridPosition(1, 0));
    const nodes = result.toArray();

    expect(nodes.find((n) => n.id === 'a')?.position.column).toBe(1);
    expect(nodes.find((n) => n.id === 'b')?.position.column).toBe(2);
  });

  it('updates the label of a node', () => {
    const board = GridBoard.empty().insertNode(
      new DomainEventNode('n1', 'OldLabel', new GridPosition(0, 0))
    );
    const result = board.updateLabel('n1', 'NewLabel');

    expect(result.toArray()[0].label).toBe('NewLabel');
  });
});
