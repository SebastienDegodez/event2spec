import { describe, it, expect } from 'vitest';
import { GridBoard } from '../../../../src/core/domain/GridBoard';
import { GridPosition } from '../../../../src/core/domain/GridPosition';
import { CommandNode } from '../../../../src/core/domain/CommandNode';
import { AddNodeCommand } from '../../../../src/core/usecases/commands/AddNode/AddNodeCommand';
import { AddNodeCommandHandler } from '../../../../src/core/usecases/commands/AddNode/AddNodeCommandHandler';
import { AddCommandNodeCommand } from '../../../../src/core/usecases/commands/AddCommandNode/AddCommandNodeCommand';
import { AddCommandNodeCommandHandler } from '../../../../src/core/usecases/commands/AddCommandNode/AddCommandNodeCommandHandler';

const addEventHandler = new AddNodeCommandHandler();
const handler = new AddCommandNodeCommandHandler();

describe('AddCommandNodeCommandHandler', () => {
  it('places a command node on the board at the requested position', () => {
    const board = GridBoard.empty();
    const result = handler.handle(board, new AddCommandNodeCommand('c1', 'PlaceOrder', 2, 0, 'e1'));

    const nodes = result.toArray();
    const placed = nodes[0];

    expect(nodes).toHaveLength(1);
    expect(placed.isAt(new GridPosition(2, 0))).toBe(true);
    expect(placed).toBeInstanceOf(CommandNode);
    expect(placed.label).toBe('PlaceOrder');
  });

  it('places a command node above a domain event on the same grid', () => {
    const board = addEventHandler.handle(
      GridBoard.empty(),
      new AddNodeCommand('e1', 'OrderPlaced', 2, 1)
    );

    const result = handler.handle(board, new AddCommandNodeCommand('c1', 'PlaceOrder', 2, 0, 'e1'));
    const nodes = result.toArray();

    const event = nodes.find((n) => n.id === 'e1');
    const command = nodes.find((n) => n.id === 'c1');

    expect(nodes).toHaveLength(2);
    expect(event?.isAt(new GridPosition(2, 1))).toBe(true);
    expect(command?.isAt(new GridPosition(2, 0))).toBe(true);
    expect(command).toBeInstanceOf(CommandNode);
  });

  it('shifts existing nodes in the same row when inserting at an occupied position', () => {
    const board = handler.handle(
      GridBoard.empty(),
      new AddCommandNodeCommand('c1', 'Existing', 2, 0, 'e1')
    );

    const result = handler.handle(board, new AddCommandNodeCommand('c2', 'New', 2, 0, 'e2'));
    const nodes = result.toArray();

    const existing = nodes.find((n) => n.id === 'c1');
    const inserted = nodes.find((n) => n.id === 'c2');

    expect(existing?.isAt(new GridPosition(3, 0))).toBe(true);
    expect(inserted?.isAt(new GridPosition(2, 0))).toBe(true);
  });

  it('does not mutate the original board', () => {
    const board = handler.handle(
      GridBoard.empty(),
      new AddCommandNodeCommand('c1', 'X', 0, 0, 'e1')
    );
    handler.handle(board, new AddCommandNodeCommand('c2', 'Y', 0, 0, 'e2'));

    expect(board.toArray()).toHaveLength(1);
  });
});
