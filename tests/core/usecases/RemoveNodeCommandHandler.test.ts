import { describe, it, expect } from 'vitest';
import { GridBoard } from '../../../src/core/domain/GridBoard';
import { AddNodeCommand } from '../../../src/core/usecases/commands/AddNodeCommand';
import { AddNodeCommandHandler } from '../../../src/core/usecases/commands/AddNodeCommandHandler';
import { RemoveNodeCommand } from '../../../src/core/usecases/commands/RemoveNodeCommand';
import { RemoveNodeCommandHandler } from '../../../src/core/usecases/commands/RemoveNodeCommandHandler';

const addHandler = new AddNodeCommandHandler();
const handler = new RemoveNodeCommandHandler();

describe('RemoveNodeCommandHandler', () => {
  it('removes a node by id', () => {
    const board = [
      new AddNodeCommand('keep', 'Keep', 0, 0),
      new AddNodeCommand('remove', 'Remove', 1, 0),
    ].reduce((b, cmd) => addHandler.handle(b, cmd), GridBoard.empty());

    const result = handler.handle(board, new RemoveNodeCommand('remove'));
    const nodes = result.toArray();

    expect(nodes).toHaveLength(1);
    expect(nodes[0].id).toBe('keep');
  });

  it('leaves the board unchanged when removing an unknown id', () => {
    const board = addHandler.handle(GridBoard.empty(), new AddNodeCommand('a', 'A', 0, 0));

    const result = handler.handle(board, new RemoveNodeCommand('unknown'));

    expect(result.toArray()).toHaveLength(1);
  });
});
