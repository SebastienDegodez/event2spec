import { describe, it, expect } from 'vitest';
import { SwimlaneCollection } from '../../../../src/core/domain/SwimlaneCollection';
import { Swimlane } from '../../../../src/core/domain/Swimlane';
import { RemoveSwimlaneCommand } from '../../../../src/core/usecases/commands/RemoveSwimlane/RemoveSwimlaneCommand';
import { RemoveSwimlaneCommandHandler } from '../../../../src/core/usecases/commands/RemoveSwimlane/RemoveSwimlaneCommandHandler';
import { InMemorySwimlaneRepository } from '../../../helpers/InMemorySwimlaneRepository';
import { collectSwimlanes } from '../../../helpers/collectSwimlanes';

describe('RemoveSwimlaneCommandHandler', () => {
  it('removes an existing swimlane by id', () => {
    const initial = SwimlaneCollection.empty()
      .add(Swimlane.create('s1', 'Customer', 'human'))
      .add(Swimlane.create('s2', 'Order Service', 'internal_system'));
    const repository = new InMemorySwimlaneRepository(initial);
    const handler = new RemoveSwimlaneCommandHandler(repository);

    handler.handle(new RemoveSwimlaneCommand('s1'));

    const swimlanes = collectSwimlanes(repository.load());
    expect(swimlanes).toHaveLength(1);
    expect(swimlanes[0].id).toBe('s2');
  });

  it('returns the same collection when id does not exist', () => {
    const initial = SwimlaneCollection.empty()
      .add(Swimlane.create('s1', 'Customer', 'human'));
    const repository = new InMemorySwimlaneRepository(initial);
    const handler = new RemoveSwimlaneCommandHandler(repository);

    handler.handle(new RemoveSwimlaneCommand('unknown'));

    expect(collectSwimlanes(repository.load())).toHaveLength(1);
  });
});
