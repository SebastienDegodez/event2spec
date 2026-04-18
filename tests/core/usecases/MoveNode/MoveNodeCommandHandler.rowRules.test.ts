import { describe, it, expect } from 'vitest';
import { GridBoard } from '../../../../src/core/domain/GridBoard';
import { AddCommandNodeCommand } from '../../../../src/core/usecases/commands/AddCommandNode/AddCommandNodeCommand';
import { AddCommandNodeCommandHandler } from '../../../../src/core/usecases/commands/AddCommandNode/AddCommandNodeCommandHandler';
import { AddDomainEventNodeCommand } from '../../../../src/core/usecases/commands/AddDomainEventNode/AddDomainEventNodeCommand';
import { AddDomainEventNodeCommandHandler } from '../../../../src/core/usecases/commands/AddDomainEventNode/AddDomainEventNodeCommandHandler';
import { AddUIScreenNodeCommand } from '../../../../src/core/usecases/commands/AddUIScreenNode/AddUIScreenNodeCommand';
import { AddUIScreenNodeCommandHandler } from '../../../../src/core/usecases/commands/AddUIScreenNode/AddUIScreenNodeCommandHandler';
import { MoveNodeCommand } from '../../../../src/core/usecases/commands/MoveNode/MoveNodeCommand';
import { MoveNodeCommandHandler } from '../../../../src/core/usecases/commands/MoveNode/MoveNodeCommandHandler';
import { collectNodes } from '../../../helpers/collectNodes';
import { InMemoryGridBoardRepository } from '../../../helpers/InMemoryGridBoardRepository';

const moveHandler = new MoveNodeCommandHandler();

describe('MoveNodeCommandHandler row rules', () => {
  it('ignores invalid uiScreen move to row 1', () => {
    const repository = new InMemoryGridBoardRepository(GridBoard.empty());
    const addScreenHandler = new AddUIScreenNodeCommandHandler(repository);
    addScreenHandler.handle(new AddUIScreenNodeCommand('ui-1', 'Checkout', 0, 0));
    const board = repository.load();

    const result = moveHandler.handle(board, new MoveNodeCommand('ui-1', 1, 1));
    const node = collectNodes(result).find((n) => n.id === 'ui-1');

    expect(node?.column).toBe(0);
    expect(node?.row).toBe(0);
  });

  it('ignores invalid command move to row 0', () => {
    const repository = new InMemoryGridBoardRepository(GridBoard.empty());
    const addCommandHandler = new AddCommandNodeCommandHandler(repository);
    addCommandHandler.handle(new AddCommandNodeCommand('cmd-1', 'Place Order', 0, 1, 'evt-1'));
    const board = repository.load();

    const result = moveHandler.handle(board, new MoveNodeCommand('cmd-1', 2, 0));
    const node = collectNodes(result).find((n) => n.id === 'cmd-1');

    expect(node?.column).toBe(0);
    expect(node?.row).toBe(1);
  });

  it('ignores invalid domainEvent move to row 1', () => {
    const repository = new InMemoryGridBoardRepository(GridBoard.empty());
    const addDomainEventHandler = new AddDomainEventNodeCommandHandler(repository);
    addDomainEventHandler.handle(new AddDomainEventNodeCommand('evt-1', 'OrderPlaced', 0, 2));
    const board = repository.load();

    const result = moveHandler.handle(board, new MoveNodeCommand('evt-1', 3, 1));
    const node = collectNodes(result).find((n) => n.id === 'evt-1');

    expect(node?.column).toBe(0);
    expect(node?.row).toBe(2);
  });

  it('applies valid moves', () => {
    const repository = new InMemoryGridBoardRepository(GridBoard.empty());
    const addDomainEventHandler = new AddDomainEventNodeCommandHandler(repository);
    addDomainEventHandler.handle(new AddDomainEventNodeCommand('evt-1', 'OrderPlaced', 0, 2));
    const board = repository.load();

    const result = moveHandler.handle(board, new MoveNodeCommand('evt-1', 2, 3));
    const node = collectNodes(result).find((n) => n.id === 'evt-1');

    expect(node?.column).toBe(2);
    expect(node?.row).toBe(3);
  });
});
