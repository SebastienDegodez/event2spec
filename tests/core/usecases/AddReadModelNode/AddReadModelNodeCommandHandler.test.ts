import { describe, it, expect } from 'vitest';
import { GridBoard } from '../../../../src/core/domain/board/GridBoard';
import { AddReadModelNodeCommand } from '../../../../src/core/usecases/commands/AddReadModelNode/AddReadModelNodeCommand';
import { AddReadModelNodeCommandHandler } from '../../../../src/core/usecases/commands/AddReadModelNode/AddReadModelNodeCommandHandler';
import { collectNodes } from '../../../helpers/collectNodes';
import { InMemoryGridBoardRepository } from '../../../helpers/InMemoryGridBoardRepository';

describe('AddReadModelNodeCommandHandler', () => {
  it('places a read model node on an empty board at the requested position', () => {
    const repository = new InMemoryGridBoardRepository(GridBoard.empty());
    const handler = new AddReadModelNodeCommandHandler(repository);
    handler.handle(new AddReadModelNodeCommand('rm1', 'Order Summary', 2, 0));
    const result = repository.load();

    const nodes = collectNodes(result);
    expect(nodes).toHaveLength(1);
    expect(nodes[0].column).toBe(2);
    expect(nodes[0].row).toBe(0);
    expect(nodes[0].type).toBe('readModel');
  });

  it('places a read model node with the correct label', () => {
    const repository = new InMemoryGridBoardRepository(GridBoard.empty());
    const handler = new AddReadModelNodeCommandHandler(repository);
    handler.handle(new AddReadModelNodeCommand('rm1', 'Customer View', 0, 0));
    const result = repository.load();

    expect(collectNodes(result)[0].label).toBe('Customer View');
  });

  it('shifts occupant right when inserting at an occupied position', () => {
    const repository = new InMemoryGridBoardRepository(GridBoard.empty());
    const handler = new AddReadModelNodeCommandHandler(repository);
    handler.handle(new AddReadModelNodeCommand('existing', 'Existing', 2, 0));

    handler.handle(new AddReadModelNodeCommand('new', 'New', 2, 0));
    const result = repository.load();
    const nodes = collectNodes(result);

    expect(nodes.find((n) => n.id === 'existing')?.column).toBe(3);
    expect(nodes.find((n) => n.id === 'new')?.column).toBe(2);
  });

  it('does not mutate the original board', () => {
    const initialBoard = GridBoard.empty();
    const repository = new InMemoryGridBoardRepository(initialBoard);
    const handler = new AddReadModelNodeCommandHandler(repository);
    handler.handle(new AddReadModelNodeCommand('rm1', 'View', 0, 0));
    expect(collectNodes(initialBoard)).toHaveLength(0);
  });
});
