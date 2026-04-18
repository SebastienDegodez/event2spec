import { describe, it, expect } from 'vitest';
import { GridBoard } from '../../../../src/core/domain/GridBoard';
import { AddDomainEventNodeCommand } from '../../../../src/core/usecases/commands/AddDomainEventNode/AddDomainEventNodeCommand';
import { AddDomainEventNodeCommandHandler } from '../../../../src/core/usecases/commands/AddDomainEventNode/AddDomainEventNodeCommandHandler';
import { RemoveNodeCommand } from '../../../../src/core/usecases/commands/RemoveNode/RemoveNodeCommand';
import { RemoveNodeCommandHandler } from '../../../../src/core/usecases/commands/RemoveNode/RemoveNodeCommandHandler';
import { collectNodes } from '../../../helpers/collectNodes';
import { InMemoryGridBoardRepository } from '../../../helpers/InMemoryGridBoardRepository';

describe('RemoveNodeCommandHandler', () => {
  it('removes a node by id', () => {
    const repository = new InMemoryGridBoardRepository(GridBoard.empty());
    const addHandler = new AddDomainEventNodeCommandHandler(repository);

    [
      new AddDomainEventNodeCommand('keep', 'Keep', 0, 0),
      new AddDomainEventNodeCommand('remove', 'Remove', 1, 0),
    ].forEach((command) => addHandler.handle(command));
    const handler = new RemoveNodeCommandHandler(repository);

    handler.handle(new RemoveNodeCommand('remove'));
    const result = repository.load();
    const nodes = collectNodes(result);

    expect(nodes).toHaveLength(1);
    expect(nodes[0].id).toBe('keep');
  });

  it('leaves the board unchanged when removing an unknown id', () => {
    const repository = new InMemoryGridBoardRepository(GridBoard.empty());
    const addHandler = new AddDomainEventNodeCommandHandler(repository);
    addHandler.handle(new AddDomainEventNodeCommand('a', 'A', 0, 0));
    const handler = new RemoveNodeCommandHandler(repository);

    handler.handle(new RemoveNodeCommand('unknown'));
    const result = repository.load();

    expect(collectNodes(result)).toHaveLength(1);
  });
});
