import { describe, it, expect } from 'vitest';
import { GridBoard } from '../../../../src/core/domain/board/GridBoard';
import { AddDomainEventNodeCommand } from '../../../../src/core/usecases/commands/AddDomainEventNode/AddDomainEventNodeCommand';
import { AddDomainEventNodeCommandHandler } from '../../../../src/core/usecases/commands/AddDomainEventNode/AddDomainEventNodeCommandHandler';
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

describe('AddDomainEventNodeCommandHandler', () => {
  it('stores boundedContextId on created domain event', () => {
    const repository = createBoardRepository();
    const handler = new AddDomainEventNodeCommandHandler(repository);

    handler.handle(new AddDomainEventNodeCommand('e1', 'OrderPlaced', 2, 2, 'bc-1'));

    const result = repository.load();
    const nodes = collectNodes(result);

    expect(nodes).toHaveLength(1);
    expect(nodes[0].type).toBe('domainEvent');
    expect(nodes[0].boundedContextId).toBe('bc-1');
  });

  it('places a node on an empty board at the requested position', () => {
    const repository = createBoardRepository();
    const handler = new AddDomainEventNodeCommandHandler(repository);

    handler.handle(new AddDomainEventNodeCommand('e1', 'OrderPlaced', 2, 0));

    const result = repository.load();
    const nodes = collectNodes(result);
    const placed = nodes[0];

    expect(nodes).toHaveLength(1);
    expect(placed.column).toBe(2);
    expect(placed.row).toBe(0);
  });

  it('shifts an occupant right when inserting at its position', () => {
    const repository = createBoardRepository();
    const handler = new AddDomainEventNodeCommandHandler(repository);

    handler.handle(new AddDomainEventNodeCommand('existing', 'PaymentReceived', 2, 1));

    handler.handle(new AddDomainEventNodeCommand('new', 'OrderPlaced', 2, 1));

    const result = repository.load();
    const nodes = collectNodes(result);

    const shifted = nodes.find((n) => n.id === 'existing');
    const inserted = nodes.find((n) => n.id === 'new');

    expect(shifted?.column).toBe(3);
    expect(shifted?.row).toBe(1);
    expect(inserted?.column).toBe(2);
    expect(inserted?.row).toBe(1);
    expect(nodes).toHaveLength(2);
  });

  it('shifts every node in the same row at the target column or beyond', () => {
    const repository = createBoardRepository();
    const handler = new AddDomainEventNodeCommandHandler(repository);

    const board = [
      new AddDomainEventNodeCommand('a', 'A', 2, 1),
      new AddDomainEventNodeCommand('b', 'B', 3, 1),
      new AddDomainEventNodeCommand('c', 'C', 4, 1),
    ].reduce((_, cmd) => {
      handler.handle(cmd);
      return repository.load();
    }, GridBoard.empty());

    void board;

    handler.handle(new AddDomainEventNodeCommand('new', 'New', 2, 1));

    const result = repository.load();
    const nodes = collectNodes(result);

    const nodeA = nodes.find((n) => n.id === 'a');
    const nodeB = nodes.find((n) => n.id === 'b');
    const nodeC = nodes.find((n) => n.id === 'c');
    const nodeNew = nodes.find((n) => n.id === 'new');

    expect(nodeA?.column).toBe(3);
    expect(nodeA?.row).toBe(1);
    expect(nodeB?.column).toBe(4);
    expect(nodeB?.row).toBe(1);
    expect(nodeC?.column).toBe(5);
    expect(nodeC?.row).toBe(1);
    expect(nodeNew?.column).toBe(2);
    expect(nodeNew?.row).toBe(1);
  });

  it('does NOT shift nodes in a different row', () => {
    const repository = createBoardRepository();
    const handler = new AddDomainEventNodeCommandHandler(repository);

    [
      new AddDomainEventNodeCommand('same', 'A', 2, 1),
      new AddDomainEventNodeCommand('other', 'B', 2, 2),
    ].forEach((command) => handler.handle(command));

    handler.handle(new AddDomainEventNodeCommand('new', 'New', 2, 1));

    const result = repository.load();
    const nodes = collectNodes(result);

    const other = nodes.find((n) => n.id === 'other');
    const same = nodes.find((n) => n.id === 'same');

    expect(other?.column).toBe(2);
    expect(other?.row).toBe(2);
    expect(same?.column).toBe(3);
    expect(same?.row).toBe(1);
  });

  it('does NOT shift nodes in the same row that are left of the target column', () => {
    const repository = createBoardRepository();
    const handler = new AddDomainEventNodeCommandHandler(repository);

    [
      new AddDomainEventNodeCommand('left', 'Left', 1, 0),
      new AddDomainEventNodeCommand('target', 'Target', 2, 0),
    ].forEach((command) => handler.handle(command));

    handler.handle(new AddDomainEventNodeCommand('new', 'New', 2, 0));

    const result = repository.load();
    const nodes = collectNodes(result);

    const left = nodes.find((n) => n.id === 'left');
    const target = nodes.find((n) => n.id === 'target');
    const nodeNew = nodes.find((n) => n.id === 'new');

    expect(left?.column).toBe(1);
    expect(left?.row).toBe(0);
    expect(target?.column).toBe(3);
    expect(target?.row).toBe(0);
    expect(nodeNew?.column).toBe(2);
    expect(nodeNew?.row).toBe(0);
  });

  it('does not mutate the original board', () => {
    const initialBoard = GridBoard.empty();
    const repository = createBoardRepository(initialBoard);
    const handler = new AddDomainEventNodeCommandHandler(repository);

    handler.handle(new AddDomainEventNodeCommand('x', 'X', 0, 0));
    handler.handle(new AddDomainEventNodeCommand('y', 'Y', 0, 0));

    expect(collectNodes(initialBoard)).toHaveLength(0);
  });
});
