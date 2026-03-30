import { describe, it, expect } from 'vitest';
import { GridPosition } from '../../../src/core/domain/GridPosition';
import { DomainEventNode } from '../../../src/core/domain/DomainEventNode';
import { GridBoard } from '../../../src/core/domain/GridBoard';

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

    const nodes = result.toArray();
    const firstNode = nodes[0];
    const position = firstNode.position;

    expect(nodes).toHaveLength(1);
    expect(position.column).toBe(2);
  });

  it('shifts an occupant right when inserting at its position', () => {
    const occupant = new DomainEventNode('existing', 'PaymentReceived', new GridPosition(2, 1));
    const board = GridBoard.empty().insertNode(occupant);
    const incoming = new DomainEventNode('new', 'OrderPlaced', new GridPosition(2, 1));

    const result = board.insertNode(incoming);

    const nodes = result.toArray();
    const shifted = nodes.find((n) => n.id === 'existing');
    const inserted = nodes.find((n) => n.id === 'new');
    const shiftedPosition = shifted?.position;
    const insertedPosition = inserted?.position;

    expect(shiftedPosition?.column).toBe(3);
    expect(insertedPosition?.column).toBe(2);
    expect(nodes).toHaveLength(2);
  });

  it('shifts every node in the same row at targetCol or beyond', () => {
    const board = GridBoard.empty()
      .insertNode(new DomainEventNode('a', 'A', new GridPosition(2, 1)))
      .insertNode(new DomainEventNode('b', 'B', new GridPosition(3, 1)))
      .insertNode(new DomainEventNode('c', 'C', new GridPosition(4, 1)));

    const result = board.insertNode(new DomainEventNode('new', 'New', new GridPosition(2, 1)));
    const nodes = result.toArray();

    const nodeA = nodes.find((n) => n.id === 'a');
    const nodeB = nodes.find((n) => n.id === 'b');
    const nodeC = nodes.find((n) => n.id === 'c');
    const nodeNew = nodes.find((n) => n.id === 'new');

    expect(nodeA?.position.column).toBe(3);
    expect(nodeB?.position.column).toBe(4);
    expect(nodeC?.position.column).toBe(5);
    expect(nodeNew?.position.column).toBe(2);
  });

  it('does NOT shift nodes in a different row', () => {
    const board = GridBoard.empty()
      .insertNode(new DomainEventNode('same', 'A', new GridPosition(2, 1)))
      .insertNode(new DomainEventNode('other', 'B', new GridPosition(2, 2)));

    const result = board.insertNode(new DomainEventNode('new', 'New', new GridPosition(2, 1)));
    const nodes = result.toArray();

    const other = nodes.find((n) => n.id === 'other');
    const same = nodes.find((n) => n.id === 'same');

    expect(other?.position.column).toBe(2);
    expect(same?.position.column).toBe(3);
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
    const nodes = result.toArray();
    const keptNode = nodes[0];

    expect(nodes).toHaveLength(1);
    expect(keptNode.id).toBe('keep');
  });

  it('moves a node and resolves collisions', () => {
    const board = GridBoard.empty()
      .insertNode(new DomainEventNode('a', 'A', new GridPosition(0, 0)))
      .insertNode(new DomainEventNode('b', 'B', new GridPosition(1, 0)));

    const result = board.moveNode('a', new GridPosition(1, 0));
    const nodes = result.toArray();

    const nodeA = nodes.find((n) => n.id === 'a');
    const nodeB = nodes.find((n) => n.id === 'b');

    expect(nodeA?.position.column).toBe(1);
    expect(nodeB?.position.column).toBe(2);
  });

  it('updates the label of a node', () => {
    const board = GridBoard.empty().insertNode(
      new DomainEventNode('n1', 'OldLabel', new GridPosition(0, 0))
    );
    const result = board.updateLabel('n1', 'NewLabel');
    const nodes = result.toArray();
    const updatedNode = nodes[0];

    expect(updatedNode.label).toBe('NewLabel');
  });
});
