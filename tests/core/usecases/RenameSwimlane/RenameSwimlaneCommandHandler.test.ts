import { describe, it, expect } from 'vitest';
import { SwimlaneCollection } from '../../../../src/core/domain/SwimlaneCollection';
import { Swimlane } from '../../../../src/core/domain/Swimlane';
import { RenameSwimlaneCommand } from '../../../../src/core/usecases/commands/RenameSwimlane/RenameSwimlaneCommand';
import { RenameSwimlaneCommandHandler } from '../../../../src/core/usecases/commands/RenameSwimlane/RenameSwimlaneCommandHandler';
import { InMemorySwimlaneRepository } from '../../../helpers/InMemorySwimlaneRepository';
import { collectSwimlanes } from '../../../helpers/collectSwimlanes';

describe('RenameSwimlaneCommandHandler', () => {
  it('renames a swimlane by id', () => {
    const initial = SwimlaneCollection.empty()
      .add(Swimlane.create('s1', 'Customer', 'human'));
    const repository = new InMemorySwimlaneRepository(initial);
    const handler = new RenameSwimlaneCommandHandler(repository);

    handler.handle(new RenameSwimlaneCommand('s1', 'End User'));

    const swimlanes = collectSwimlanes(repository.load());
    expect(swimlanes[0].actorName).toBe('End User');
  });

  it('does not change other swimlanes when renaming', () => {
    const initial = SwimlaneCollection.empty()
      .add(Swimlane.create('s1', 'Customer', 'human'))
      .add(Swimlane.create('s2', 'Service', 'internal_system'));
    const repository = new InMemorySwimlaneRepository(initial);
    const handler = new RenameSwimlaneCommandHandler(repository);

    handler.handle(new RenameSwimlaneCommand('s1', 'End User'));

    const swimlanes = collectSwimlanes(repository.load());
    expect(swimlanes[0].actorName).toBe('End User');
    expect(swimlanes[1].actorName).toBe('Service');
  });
});
