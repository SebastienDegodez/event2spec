import { describe, it, expect } from 'vitest';
import { GridBoard } from '../../../src/core/domain/GridBoard';
import { GridPosition } from '../../../src/core/domain/GridPosition';
import { AddNodeCommand } from '../../../src/core/usecases/commands/AddNodeCommand';
import { AddNodeCommandHandler } from '../../../src/core/usecases/commands/AddNodeCommandHandler';
import { MoveNodeCommand } from '../../../src/core/usecases/commands/MoveNodeCommand';
import { MoveNodeCommandHandler } from '../../../src/core/usecases/commands/MoveNodeCommandHandler';

const addHandler = new AddNodeCommandHandler();
const handler = new MoveNodeCommandHandler();

describe('MoveNodeCommandHandler', () => {
  it('moves a node to a new position', () => {
    const board = addHandler.handle(GridBoard.empty(), new AddNodeCommand('a', 'A', 0, 0));

    const result = handler.handle(board, new MoveNodeCommand('a', 2, 1));
    const nodes = result.toArray();
    const moved = nodes.find((n) => n.id === 'a');

    expect(moved?.isAt(new GridPosition(2, 1))).toBe(true);
  });

  it('resolves collisions when moving to an occupied position', () => {
    const board = [
      new AddNodeCommand('a', 'A', 0, 0),
      new AddNodeCommand('b', 'B', 1, 0),
    ].reduce((b, cmd) => addHandler.handle(b, cmd), GridBoard.empty());

    const result = handler.handle(board, new MoveNodeCommand('a', 1, 0));
    const nodes = result.toArray();

    const nodeA = nodes.find((n) => n.id === 'a');
    const nodeB = nodes.find((n) => n.id === 'b');

    expect(nodeA?.isAt(new GridPosition(1, 0))).toBe(true);
    expect(nodeB?.isAt(new GridPosition(2, 0))).toBe(true);
  });

  it('leaves the board unchanged when moving an unknown id', () => {
    const board = addHandler.handle(GridBoard.empty(), new AddNodeCommand('a', 'A', 0, 0));

    const result = handler.handle(board, new MoveNodeCommand('unknown', 1, 0));

    expect(result.toArray()).toHaveLength(1);
  });
});
