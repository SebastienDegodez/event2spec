import { describe, it, expect } from 'vitest';
import { GridBoard } from '../../../src/core/domain/GridBoard';
import { GridPosition } from '../../../src/core/domain/GridPosition';
import { AddNodeCommand } from '../../../src/core/usecases/commands/AddNodeCommand';
import { AddNodeCommandHandler } from '../../../src/core/usecases/commands/AddNodeCommandHandler';

const handler = new AddNodeCommandHandler();

describe('AddNodeCommandHandler', () => {
  it('places a node on an empty board at the requested position', () => {
    const board = GridBoard.empty();
    const result = handler.handle(board, new AddNodeCommand('e1', 'OrderPlaced', 2, 0));

    const nodes = result.toArray();
    const placed = nodes[0];

    expect(nodes).toHaveLength(1);
    expect(placed.isAt(new GridPosition(2, 0))).toBe(true);
  });

  it('shifts an occupant right when inserting at its position', () => {
    const board = handler.handle(
      GridBoard.empty(),
      new AddNodeCommand('existing', 'PaymentReceived', 2, 1)
    );

    const result = handler.handle(board, new AddNodeCommand('new', 'OrderPlaced', 2, 1));
    const nodes = result.toArray();

    const shifted = nodes.find((n) => n.id === 'existing');
    const inserted = nodes.find((n) => n.id === 'new');

    expect(shifted?.isAt(new GridPosition(3, 1))).toBe(true);
    expect(inserted?.isAt(new GridPosition(2, 1))).toBe(true);
    expect(nodes).toHaveLength(2);
  });

  it('shifts every node in the same row at the target column or beyond', () => {
    const board = [
      new AddNodeCommand('a', 'A', 2, 1),
      new AddNodeCommand('b', 'B', 3, 1),
      new AddNodeCommand('c', 'C', 4, 1),
    ].reduce((b, cmd) => handler.handle(b, cmd), GridBoard.empty());

    const result = handler.handle(board, new AddNodeCommand('new', 'New', 2, 1));
    const nodes = result.toArray();

    const nodeA = nodes.find((n) => n.id === 'a');
    const nodeB = nodes.find((n) => n.id === 'b');
    const nodeC = nodes.find((n) => n.id === 'c');
    const nodeNew = nodes.find((n) => n.id === 'new');

    expect(nodeA?.isAt(new GridPosition(3, 1))).toBe(true);
    expect(nodeB?.isAt(new GridPosition(4, 1))).toBe(true);
    expect(nodeC?.isAt(new GridPosition(5, 1))).toBe(true);
    expect(nodeNew?.isAt(new GridPosition(2, 1))).toBe(true);
  });

  it('does NOT shift nodes in a different row', () => {
    const board = [
      new AddNodeCommand('same', 'A', 2, 1),
      new AddNodeCommand('other', 'B', 2, 2),
    ].reduce((b, cmd) => handler.handle(b, cmd), GridBoard.empty());

    const result = handler.handle(board, new AddNodeCommand('new', 'New', 2, 1));
    const nodes = result.toArray();

    const other = nodes.find((n) => n.id === 'other');
    const same = nodes.find((n) => n.id === 'same');

    expect(other?.isAt(new GridPosition(2, 2))).toBe(true);
    expect(same?.isAt(new GridPosition(3, 1))).toBe(true);
  });

  it('does NOT shift nodes in the same row that are left of the target column', () => {
    const board = [
      new AddNodeCommand('left', 'Left', 1, 0),
      new AddNodeCommand('target', 'Target', 2, 0),
    ].reduce((b, cmd) => handler.handle(b, cmd), GridBoard.empty());

    const result = handler.handle(board, new AddNodeCommand('new', 'New', 2, 0));
    const nodes = result.toArray();

    const left = nodes.find((n) => n.id === 'left');
    const target = nodes.find((n) => n.id === 'target');
    const nodeNew = nodes.find((n) => n.id === 'new');

    expect(left?.isAt(new GridPosition(1, 0))).toBe(true);
    expect(target?.isAt(new GridPosition(3, 0))).toBe(true);
    expect(nodeNew?.isAt(new GridPosition(2, 0))).toBe(true);
  });

  it('does not mutate the original board', () => {
    const board = handler.handle(
      GridBoard.empty(),
      new AddNodeCommand('x', 'X', 0, 0)
    );
    handler.handle(board, new AddNodeCommand('y', 'Y', 0, 0));

    expect(board.toArray()).toHaveLength(1);
  });
});
