import { describe, it, expect } from 'vitest';
import { GridBoard } from '../../../../src/core/domain/GridBoard';
import { AddUIScreenNodeCommand } from '../../../../src/core/usecases/commands/AddUIScreenNode/AddUIScreenNodeCommand';
import { AddUIScreenNodeCommandHandler } from '../../../../src/core/usecases/commands/AddUIScreenNode/AddUIScreenNodeCommandHandler';
import { collectNodes } from '../../../helpers/collectNodes';

const handler = new AddUIScreenNodeCommandHandler();

describe('AddUIScreenNodeCommandHandler', () => {
  it('places a UI screen node on an empty board at the requested position', () => {
    const board = GridBoard.empty();
    const result = handler.handle(board, new AddUIScreenNodeCommand('ui1', 'Order Form', 2, 0));

    const nodes = collectNodes(result);
    expect(nodes).toHaveLength(1);
    expect(nodes[0].column).toBe(2);
    expect(nodes[0].row).toBe(0);
    expect(nodes[0].type).toBe('uiScreen');
  });

  it('places a UI screen node with the correct label', () => {
    const board = GridBoard.empty();
    const result = handler.handle(board, new AddUIScreenNodeCommand('ui1', 'Dashboard', 0, 0));

    expect(collectNodes(result)[0].label).toBe('Dashboard');
  });

  it('does not mutate the original board', () => {
    const board = GridBoard.empty();
    handler.handle(board, new AddUIScreenNodeCommand('ui1', 'Screen', 0, 0));
    expect(collectNodes(board)).toHaveLength(0);
  });
});
