import { describe, it, expect } from 'vitest';
import { GridBoard } from '../../../../src/core/domain/GridBoard';
import { AddNodeCommand } from '../../../../src/core/usecases/commands/AddNode/AddNodeCommand';
import { AddNodeCommandHandler } from '../../../../src/core/usecases/commands/AddNode/AddNodeCommandHandler';
import { RemoveNodeCommand } from '../../../../src/core/usecases/commands/RemoveNode/RemoveNodeCommand';
import { RemoveNodeCommandHandler } from '../../../../src/core/usecases/commands/RemoveNode/RemoveNodeCommandHandler';
import { collectNodes } from '../../../helpers/collectNodes';

const addHandler = new AddNodeCommandHandler();
const handler = new RemoveNodeCommandHandler();

describe('RemoveNodeCommandHandler', () => {
  it('removes a node by id', () => {
    const board = [
      new AddNodeCommand('keep', 'Keep', 0, 0),
      new AddNodeCommand('remove', 'Remove', 1, 0),
    ].reduce((b, cmd) => addHandler.handle(b, cmd), GridBoard.empty());

    const result = handler.handle(board, new RemoveNodeCommand('remove'));
    const nodes = collectNodes(result);

    expect(nodes).toHaveLength(1);
    expect(nodes[0].id).toBe('keep');
  });

  it('leaves the board unchanged when removing an unknown id', () => {
    const board = addHandler.handle(GridBoard.empty(), new AddNodeCommand('a', 'A', 0, 0));

    const result = handler.handle(board, new RemoveNodeCommand('unknown'));

    expect(collectNodes(result)).toHaveLength(1);
  });
});
