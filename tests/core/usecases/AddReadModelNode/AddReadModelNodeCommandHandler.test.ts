import { describe, it, expect } from 'vitest';
import { GridBoard } from '../../../../src/core/domain/GridBoard';
import { GridPosition } from '../../../../src/core/domain/GridPosition';
import { ReadModelNode } from '../../../../src/core/domain/ReadModelNode';
import { AddReadModelNodeCommand } from '../../../../src/core/usecases/commands/AddReadModelNode/AddReadModelNodeCommand';
import { AddReadModelNodeCommandHandler } from '../../../../src/core/usecases/commands/AddReadModelNode/AddReadModelNodeCommandHandler';

const handler = new AddReadModelNodeCommandHandler();

describe('AddReadModelNodeCommandHandler', () => {
  it('places a read model node on an empty board at the requested position', () => {
    const board = GridBoard.empty();
    const result = handler.handle(board, new AddReadModelNodeCommand('rm1', 'Order Summary', 2, 0));

    const nodes = result.toArray();
    expect(nodes).toHaveLength(1);
    expect(nodes[0].isAt(new GridPosition(2, 0))).toBe(true);
    expect(nodes[0]).toBeInstanceOf(ReadModelNode);
  });

  it('places a read model node with the correct label', () => {
    const board = GridBoard.empty();
    const result = handler.handle(board, new AddReadModelNodeCommand('rm1', 'Customer View', 0, 0));

    expect(result.toArray()[0].label).toBe('Customer View');
  });

  it('shifts occupant right when inserting at an occupied position', () => {
    const board = handler.handle(
      GridBoard.empty(),
      new AddReadModelNodeCommand('existing', 'Existing', 2, 0)
    );

    const result = handler.handle(board, new AddReadModelNodeCommand('new', 'New', 2, 0));
    const nodes = result.toArray();

    expect(nodes.find((n) => n.id === 'existing')?.isAt(new GridPosition(3, 0))).toBe(true);
    expect(nodes.find((n) => n.id === 'new')?.isAt(new GridPosition(2, 0))).toBe(true);
  });

  it('does not mutate the original board', () => {
    const board = GridBoard.empty();
    handler.handle(board, new AddReadModelNodeCommand('rm1', 'View', 0, 0));
    expect(board.toArray()).toHaveLength(0);
  });
});
