import { describe, it, expect } from 'vitest';
import { GridBoard } from '../../../../src/core/domain/GridBoard';
import { AddDomainEventNodeCommand } from '../../../../src/core/usecases/commands/AddDomainEventNode/AddDomainEventNodeCommand';
import { AddDomainEventNodeCommandHandler } from '../../../../src/core/usecases/commands/AddDomainEventNode/AddDomainEventNodeCommandHandler';
import { collectNodes } from '../../../helpers/collectNodes';

const handler = new AddDomainEventNodeCommandHandler();

describe('AddDomainEventNodeCommandHandler', () => {
  it('stores boundedContextId on created domain event', () => {
    const result = handler.handle(
      GridBoard.empty(),
      new AddDomainEventNodeCommand('e1', 'OrderPlaced', 2, 2, 'bc-1')
    );

    const nodes = collectNodes(result);

    expect(nodes).toHaveLength(1);
    expect(nodes[0].type).toBe('domainEvent');
    expect(nodes[0].boundedContextId).toBe('bc-1');
  });

  it('places a node on an empty board at the requested position', () => {
    const board = GridBoard.empty();
    const result = handler.handle(board, new AddDomainEventNodeCommand('e1', 'OrderPlaced', 2, 0));

    const nodes = collectNodes(result);
    const placed = nodes[0];

    expect(nodes).toHaveLength(1);
    expect(placed.column).toBe(2);
    expect(placed.row).toBe(0);
  });

  it('shifts an occupant right when inserting at its position', () => {
    const board = handler.handle(
      GridBoard.empty(),
      new AddDomainEventNodeCommand('existing', 'PaymentReceived', 2, 1)
    );

    const result = handler.handle(board, new AddDomainEventNodeCommand('new', 'OrderPlaced', 2, 1));
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
    const board = [
      new AddDomainEventNodeCommand('a', 'A', 2, 1),
      new AddDomainEventNodeCommand('b', 'B', 3, 1),
      new AddDomainEventNodeCommand('c', 'C', 4, 1),
    ].reduce((b, cmd) => handler.handle(b, cmd), GridBoard.empty());

    const result = handler.handle(board, new AddDomainEventNodeCommand('new', 'New', 2, 1));
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
    const board = [
      new AddDomainEventNodeCommand('same', 'A', 2, 1),
      new AddDomainEventNodeCommand('other', 'B', 2, 2),
    ].reduce((b, cmd) => handler.handle(b, cmd), GridBoard.empty());

    const result = handler.handle(board, new AddDomainEventNodeCommand('new', 'New', 2, 1));
    const nodes = collectNodes(result);

    const other = nodes.find((n) => n.id === 'other');
    const same = nodes.find((n) => n.id === 'same');

    expect(other?.column).toBe(2);
    expect(other?.row).toBe(2);
    expect(same?.column).toBe(3);
    expect(same?.row).toBe(1);
  });

  it('does NOT shift nodes in the same row that are left of the target column', () => {
    const board = [
      new AddDomainEventNodeCommand('left', 'Left', 1, 0),
      new AddDomainEventNodeCommand('target', 'Target', 2, 0),
    ].reduce((b, cmd) => handler.handle(b, cmd), GridBoard.empty());

    const result = handler.handle(board, new AddDomainEventNodeCommand('new', 'New', 2, 0));
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
    const board = handler.handle(
      GridBoard.empty(),
      new AddDomainEventNodeCommand('x', 'X', 0, 0)
    );
    handler.handle(board, new AddDomainEventNodeCommand('y', 'Y', 0, 0));

    expect(collectNodes(board)).toHaveLength(1);
  });
});
