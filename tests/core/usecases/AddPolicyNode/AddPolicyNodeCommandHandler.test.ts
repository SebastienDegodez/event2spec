import { describe, it, expect } from 'vitest';
import { GridBoard } from '../../../../src/core/domain/GridBoard';
import { GridPosition } from '../../../../src/core/domain/GridPosition';
import { PolicyNode } from '../../../../src/core/domain/PolicyNode';
import { AddPolicyNodeCommand } from '../../../../src/core/usecases/commands/AddPolicyNode/AddPolicyNodeCommand';
import { AddPolicyNodeCommandHandler } from '../../../../src/core/usecases/commands/AddPolicyNode/AddPolicyNodeCommandHandler';

const handler = new AddPolicyNodeCommandHandler();

describe('AddPolicyNodeCommandHandler', () => {
  it('places a policy node on an empty board at the requested position', () => {
    const board = GridBoard.empty();
    const result = handler.handle(board, new AddPolicyNodeCommand('p1', 'When order placed then notify', 2, 0));

    const nodes = result.toArray();
    expect(nodes).toHaveLength(1);
    expect(nodes[0].isAt(new GridPosition(2, 0))).toBe(true);
    expect(nodes[0]).toBeInstanceOf(PolicyNode);
  });

  it('places a policy node with the correct label', () => {
    const board = GridBoard.empty();
    const result = handler.handle(board, new AddPolicyNodeCommand('p1', 'Auto-assign', 0, 0));

    expect(result.toArray()[0].label).toBe('Auto-assign');
  });

  it('does not mutate the original board', () => {
    const board = GridBoard.empty();
    handler.handle(board, new AddPolicyNodeCommand('p1', 'Policy', 0, 0));
    expect(board.toArray()).toHaveLength(0);
  });
});
