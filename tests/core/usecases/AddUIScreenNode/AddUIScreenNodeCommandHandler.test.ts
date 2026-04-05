import { describe, it, expect } from 'vitest';
import { GridBoard } from '../../../../src/core/domain/GridBoard';
import { GridPosition } from '../../../../src/core/domain/GridPosition';
import { UIScreenNode } from '../../../../src/core/domain/UIScreenNode';
import { AddUIScreenNodeCommand } from '../../../../src/core/usecases/commands/AddUIScreenNode/AddUIScreenNodeCommand';
import { AddUIScreenNodeCommandHandler } from '../../../../src/core/usecases/commands/AddUIScreenNode/AddUIScreenNodeCommandHandler';

const handler = new AddUIScreenNodeCommandHandler();

describe('AddUIScreenNodeCommandHandler', () => {
  it('places a UI screen node on an empty board at the requested position', () => {
    const board = GridBoard.empty();
    const result = handler.handle(board, new AddUIScreenNodeCommand('ui1', 'Order Form', 2, 0));

    const nodes = result.toArray();
    expect(nodes).toHaveLength(1);
    expect(nodes[0].isAt(new GridPosition(2, 0))).toBe(true);
    expect(nodes[0]).toBeInstanceOf(UIScreenNode);
  });

  it('places a UI screen node with the correct label', () => {
    const board = GridBoard.empty();
    const result = handler.handle(board, new AddUIScreenNodeCommand('ui1', 'Dashboard', 0, 0));

    expect(result.toArray()[0].label).toBe('Dashboard');
  });

  it('does not mutate the original board', () => {
    const board = GridBoard.empty();
    handler.handle(board, new AddUIScreenNodeCommand('ui1', 'Screen', 0, 0));
    expect(board.toArray()).toHaveLength(0);
  });
});
