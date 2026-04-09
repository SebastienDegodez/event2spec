import { describe, it, expect } from 'vitest';
import { GridBoard } from '../../../../src/core/domain/GridBoard';
import { AddDomainEventNodeCommand } from '../../../../src/core/usecases/commands/AddDomainEventNode/AddDomainEventNodeCommand';
import { AddDomainEventNodeCommandHandler } from '../../../../src/core/usecases/commands/AddDomainEventNode/AddDomainEventNodeCommandHandler';
import { MoveNodeCommand } from '../../../../src/core/usecases/commands/MoveNode/MoveNodeCommand';
import { MoveNodeCommandHandler } from '../../../../src/core/usecases/commands/MoveNode/MoveNodeCommandHandler';
import { collectNodes } from '../../../helpers/collectNodes';

const addHandler = new AddDomainEventNodeCommandHandler();
const handler = new MoveNodeCommandHandler();

describe('MoveNodeCommandHandler', () => {
  it('moves a node to a new position', () => {
    // domain events are valid only in row >= 2 (bounded context rows)
    const board = addHandler.handle(GridBoard.empty(), new AddDomainEventNodeCommand('a', 'A', 0, 2));

    const result = handler.handle(board, new MoveNodeCommand('a', 2, 2));
    const nodes = collectNodes(result);
    const moved = nodes.find((n) => n.id === 'a');

    expect(moved?.column).toBe(2);
    expect(moved?.row).toBe(2);
  });

  it('resolves collisions when moving to an occupied position', () => {
    const board = [
      new AddDomainEventNodeCommand('a', 'A', 0, 2),
      new AddDomainEventNodeCommand('b', 'B', 1, 2),
    ].reduce((b, cmd) => addHandler.handle(b, cmd), GridBoard.empty());

    const result = handler.handle(board, new MoveNodeCommand('a', 1, 2));
    const nodes = collectNodes(result);

    const nodeA = nodes.find((n) => n.id === 'a');
    const nodeB = nodes.find((n) => n.id === 'b');

    expect(nodeA?.column).toBe(1);
    expect(nodeA?.row).toBe(2);
    expect(nodeB?.column).toBe(2);
    expect(nodeB?.row).toBe(2);
  });

  it('does not shift nodes when moving to an unoccupied position on the same row', () => {
    const board = [
      new AddDomainEventNodeCommand('a', 'A', 0, 2),
      new AddDomainEventNodeCommand('b', 'B', 2, 2),
    ].reduce((b, cmd) => addHandler.handle(b, cmd), GridBoard.empty());

    const result = handler.handle(board, new MoveNodeCommand('a', 1, 2));
    const nodes = collectNodes(result);

    const nodeA = nodes.find((n) => n.id === 'a');
    const nodeB = nodes.find((n) => n.id === 'b');

    expect(nodeA?.column).toBe(1);
    expect(nodeA?.row).toBe(2);
    expect(nodeB?.column).toBe(2);
    expect(nodeB?.row).toBe(2);
  });

  it('leaves the board unchanged when moving an unknown id', () => {
    const board = addHandler.handle(GridBoard.empty(), new AddDomainEventNodeCommand('a', 'A', 0, 2));

    const result = handler.handle(board, new MoveNodeCommand('unknown', 1, 2));

    expect(collectNodes(result)).toHaveLength(1);
  });
});
