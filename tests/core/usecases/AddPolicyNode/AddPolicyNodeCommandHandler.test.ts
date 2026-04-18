import { describe, it, expect } from 'vitest';
import { GridBoard } from '../../../../src/core/domain/board/GridBoard';
import { AddPolicyNodeCommand } from '../../../../src/core/usecases/commands/AddPolicyNode/AddPolicyNodeCommand';
import { AddPolicyNodeCommandHandler } from '../../../../src/core/usecases/commands/AddPolicyNode/AddPolicyNodeCommandHandler';
import { collectNodes } from '../../../helpers/collectNodes';
import { InMemoryGridBoardRepository } from '../../../helpers/InMemoryGridBoardRepository';

describe('AddPolicyNodeCommandHandler', () => {
  it('places a policy node on an empty board at the requested position', () => {
    const repository = new InMemoryGridBoardRepository(GridBoard.empty());
    const handler = new AddPolicyNodeCommandHandler(repository);
    handler.handle(new AddPolicyNodeCommand('p1', 'When order placed then notify', 2, 0));
    const result = repository.load();

    const nodes = collectNodes(result);
    expect(nodes).toHaveLength(1);
    expect(nodes[0].column).toBe(2);
    expect(nodes[0].row).toBe(0);
    expect(nodes[0].type).toBe('policy');
  });

  it('places a policy node with the correct label', () => {
    const repository = new InMemoryGridBoardRepository(GridBoard.empty());
    const handler = new AddPolicyNodeCommandHandler(repository);
    handler.handle(new AddPolicyNodeCommand('p1', 'Auto-assign', 0, 0));
    const result = repository.load();

    expect(collectNodes(result)[0].label).toBe('Auto-assign');
  });

  it('does not mutate the original board', () => {
    const initialBoard = GridBoard.empty();
    const repository = new InMemoryGridBoardRepository(initialBoard);
    const handler = new AddPolicyNodeCommandHandler(repository);
    handler.handle(new AddPolicyNodeCommand('p1', 'Policy', 0, 0));
    expect(collectNodes(initialBoard)).toHaveLength(0);
  });
});
