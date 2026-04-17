import { describe, it, expect } from 'vitest';
import { GridBoard } from '../../../../src/core/domain/GridBoard';
import { AddDomainEventNodeCommand } from '../../../../src/core/usecases/commands/AddDomainEventNode/AddDomainEventNodeCommand';
import { AddDomainEventNodeCommandHandler } from '../../../../src/core/usecases/commands/AddDomainEventNode/AddDomainEventNodeCommandHandler';
import { AddCommandNodeCommand } from '../../../../src/core/usecases/commands/AddCommandNode/AddCommandNodeCommand';
import { AddCommandNodeCommandHandler } from '../../../../src/core/usecases/commands/AddCommandNode/AddCommandNodeCommandHandler';
import { collectNodes } from '../../../helpers/collectNodes';

function createBoardRepository(initial: GridBoard = GridBoard.empty()) {
  let board = initial;
  return {
    load: () => board,
    save: (next: GridBoard) => {
      board = next;
    },
  };
}

describe('AddCommandNodeCommandHandler', () => {
  it('places a command node on the board at the requested position', () => {
    const repository = createBoardRepository();
    const handler = new AddCommandNodeCommandHandler(repository);

    handler.handle(new AddCommandNodeCommand('c1', 'PlaceOrder', 2, 0, 'e1'));

    const result = repository.load();
    const nodes = collectNodes(result);
    const placed = nodes[0];

    expect(nodes).toHaveLength(1);
    expect(placed.column).toBe(2);
    expect(placed.row).toBe(0);
    expect(placed.type).toBe('command');
    expect(placed.label).toBe('PlaceOrder');
  });

  it('places a command node above a domain event on the same grid', () => {
    const repository = createBoardRepository();
    const addEventHandler = new AddDomainEventNodeCommandHandler(repository);
    const handler = new AddCommandNodeCommandHandler(repository);

    addEventHandler.handle(new AddDomainEventNodeCommand('e1', 'OrderPlaced', 2, 1));

    handler.handle(new AddCommandNodeCommand('c1', 'PlaceOrder', 2, 0, 'e1'));

    const result = repository.load();
    const nodes = collectNodes(result);

    const event = nodes.find((n) => n.id === 'e1');
    const command = nodes.find((n) => n.id === 'c1');

    expect(nodes).toHaveLength(2);
    expect(event?.column).toBe(2);
    expect(event?.row).toBe(1);
    expect(command?.column).toBe(2);
    expect(command?.row).toBe(0);
    expect(command?.type).toBe('command');
  });

  it('shifts existing nodes in the same row when inserting at an occupied position', () => {
    const repository = createBoardRepository();
    const handler = new AddCommandNodeCommandHandler(repository);

    handler.handle(new AddCommandNodeCommand('c1', 'Existing', 2, 0, 'e1'));

    handler.handle(new AddCommandNodeCommand('c2', 'New', 2, 0, 'e2'));

    const result = repository.load();
    const nodes = collectNodes(result);

    const existing = nodes.find((n) => n.id === 'c1');
    const inserted = nodes.find((n) => n.id === 'c2');

    expect(existing?.column).toBe(3);
    expect(existing?.row).toBe(0);
    expect(inserted?.column).toBe(2);
    expect(inserted?.row).toBe(0);
  });

  it('does not mutate the original board', () => {
    const initialBoard = GridBoard.empty();
    const repository = createBoardRepository(initialBoard);
    const handler = new AddCommandNodeCommandHandler(repository);

    handler.handle(new AddCommandNodeCommand('c1', 'X', 0, 0, 'e1'));
    handler.handle(new AddCommandNodeCommand('c2', 'Y', 0, 0, 'e2'));

    expect(collectNodes(initialBoard)).toHaveLength(0);
  });
});
