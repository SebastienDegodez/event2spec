import { describe, it, expect } from 'vitest';
import { GridBoard } from '../../../../src/core/domain/GridBoard';
import { AddDomainEventNodeCommand } from '../../../../src/core/usecases/commands/AddDomainEventNode/AddDomainEventNodeCommand';
import { AddDomainEventNodeCommandHandler } from '../../../../src/core/usecases/commands/AddDomainEventNode/AddDomainEventNodeCommandHandler';
import { RemoveNodeCommand } from '../../../../src/core/usecases/commands/RemoveNode/RemoveNodeCommand';
import { RemoveNodeCommandHandler } from '../../../../src/core/usecases/commands/RemoveNode/RemoveNodeCommandHandler';
import { collectNodes } from '../../../helpers/collectNodes';

const addHandler = new AddDomainEventNodeCommandHandler();
const handler = new RemoveNodeCommandHandler();

describe('RemoveNodeCommandHandler', () => {
  it('removes a node by id', () => {
    const board = [
      new AddDomainEventNodeCommand('keep', 'Keep', 0, 0),
      new AddDomainEventNodeCommand('remove', 'Remove', 1, 0),
    ].reduce((b, cmd) => addHandler.handle(b, cmd), GridBoard.empty());

    const result = handler.handle(board, new RemoveNodeCommand('remove'));
    const nodes = collectNodes(result);

    expect(nodes).toHaveLength(1);
    expect(nodes[0].id).toBe('keep');
  });

  it('leaves the board unchanged when removing an unknown id', () => {
    const board = addHandler.handle(GridBoard.empty(), new AddDomainEventNodeCommand('a', 'A', 0, 0));

    const result = handler.handle(board, new RemoveNodeCommand('unknown'));

    expect(collectNodes(result)).toHaveLength(1);
  });
});
