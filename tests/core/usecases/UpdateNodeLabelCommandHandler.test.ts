import { describe, it, expect } from 'vitest';
import { GridBoard } from '../../../src/core/domain/GridBoard';
import { AddNodeCommand } from '../../../src/core/usecases/commands/AddNodeCommand';
import { AddNodeCommandHandler } from '../../../src/core/usecases/commands/AddNodeCommandHandler';
import { UpdateNodeLabelCommand } from '../../../src/core/usecases/commands/UpdateNodeLabelCommand';
import { UpdateNodeLabelCommandHandler } from '../../../src/core/usecases/commands/UpdateNodeLabelCommandHandler';

const addHandler = new AddNodeCommandHandler();
const handler = new UpdateNodeLabelCommandHandler();

describe('UpdateNodeLabelCommandHandler', () => {
  it('updates the label of an existing node', () => {
    const board = addHandler.handle(GridBoard.empty(), new AddNodeCommand('n1', 'OldLabel', 0, 0));

    const result = handler.handle(board, new UpdateNodeLabelCommand('n1', 'NewLabel'));
    const nodes = result.toArray();
    const updated = nodes[0];

    expect(updated.label).toBe('NewLabel');
  });

  it('leaves other nodes unchanged when updating a label', () => {
    const board = [
      new AddNodeCommand('n1', 'First', 0, 0),
      new AddNodeCommand('n2', 'Second', 1, 0),
    ].reduce((b, cmd) => addHandler.handle(b, cmd), GridBoard.empty());

    const result = handler.handle(board, new UpdateNodeLabelCommand('n1', 'Updated'));
    const nodes = result.toArray();

    const n1 = nodes.find((n) => n.id === 'n1');
    const n2 = nodes.find((n) => n.id === 'n2');

    expect(n1?.label).toBe('Updated');
    expect(n2?.label).toBe('Second');
  });
});
