import { describe, it, expect } from 'vitest';
import { GridBoard } from '../../../../src/core/domain/board/GridBoard';
import { AddDomainEventNodeCommand } from '../../../../src/core/usecases/commands/AddDomainEventNode/AddDomainEventNodeCommand';
import { AddDomainEventNodeCommandHandler } from '../../../../src/core/usecases/commands/AddDomainEventNode/AddDomainEventNodeCommandHandler';
import { UpdateNodeLabelCommand } from '../../../../src/core/usecases/commands/UpdateNodeLabel/UpdateNodeLabelCommand';
import { UpdateNodeLabelCommandHandler } from '../../../../src/core/usecases/commands/UpdateNodeLabel/UpdateNodeLabelCommandHandler';
import { collectNodes } from '../../../helpers/collectNodes';
import { InMemoryGridBoardRepository } from '../../../helpers/InMemoryGridBoardRepository';

describe('UpdateNodeLabelCommandHandler', () => {
  it('updates the label of an existing node', () => {
    const repository = new InMemoryGridBoardRepository(GridBoard.empty());
    const addHandler = new AddDomainEventNodeCommandHandler(repository);
    addHandler.handle(new AddDomainEventNodeCommand('n1', 'OldLabel', 0, 0));
    const handler = new UpdateNodeLabelCommandHandler(repository);

    handler.handle(new UpdateNodeLabelCommand('n1', 'NewLabel'));
    const result = repository.load();
    const nodes = collectNodes(result);
    const updated = nodes[0];

    expect(updated.label).toBe('NewLabel');
  });

  it('leaves other nodes unchanged when updating a label', () => {
    const repository = new InMemoryGridBoardRepository(GridBoard.empty());
    const addHandler = new AddDomainEventNodeCommandHandler(repository);

    [
      new AddDomainEventNodeCommand('n1', 'First', 0, 0),
      new AddDomainEventNodeCommand('n2', 'Second', 1, 0),
    ].forEach((command) => addHandler.handle(command));
    const handler = new UpdateNodeLabelCommandHandler(repository);

    handler.handle(new UpdateNodeLabelCommand('n1', 'Updated'));
    const result = repository.load();
    const nodes = collectNodes(result);

    const n1 = nodes.find((n) => n.id === 'n1');
    const n2 = nodes.find((n) => n.id === 'n2');

    expect(n1?.label).toBe('Updated');
    expect(n2?.label).toBe('Second');
  });
});
