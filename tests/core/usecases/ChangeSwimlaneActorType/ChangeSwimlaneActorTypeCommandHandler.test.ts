import { describe, it, expect } from 'vitest';
import { SwimlaneCollection } from '../../../../src/core/domain/SwimlaneCollection';
import { Swimlane } from '../../../../src/core/domain/Swimlane';
import { ChangeSwimlaneActorTypeCommand } from '../../../../src/core/usecases/commands/ChangeSwimlaneActorType/ChangeSwimlaneActorTypeCommand';
import { ChangeSwimlaneActorTypeCommandHandler } from '../../../../src/core/usecases/commands/ChangeSwimlaneActorType/ChangeSwimlaneActorTypeCommandHandler';
import { InMemorySwimlaneRepository } from '../../../helpers/InMemorySwimlaneRepository';
import { collectSwimlanes } from '../../../helpers/collectSwimlanes';

describe('ChangeSwimlaneActorTypeCommandHandler', () => {
  it('changes actor type and updates color accordingly', () => {
    const initial = SwimlaneCollection.empty()
      .add(Swimlane.create('s1', 'Customer', 'human'));
    const repository = new InMemorySwimlaneRepository(initial);
    const handler = new ChangeSwimlaneActorTypeCommandHandler(repository);

    handler.handle(new ChangeSwimlaneActorTypeCommand('s1', 'external_system'));

    const swimlanes = collectSwimlanes(repository.load());
    expect(swimlanes[0].actorType).toBe('external_system');
    expect(swimlanes[0].color).toBe('red');
  });

  it('preserves actor name when changing type', () => {
    const initial = SwimlaneCollection.empty()
      .add(Swimlane.create('s1', 'Customer', 'human'));
    const repository = new InMemorySwimlaneRepository(initial);
    const handler = new ChangeSwimlaneActorTypeCommandHandler(repository);

    handler.handle(new ChangeSwimlaneActorTypeCommand('s1', 'automated_process'));

    expect(collectSwimlanes(repository.load())[0].actorName).toBe('Customer');
  });

  it('does not change other swimlanes', () => {
    const initial = SwimlaneCollection.empty()
      .add(Swimlane.create('s1', 'Customer', 'human'))
      .add(Swimlane.create('s2', 'Service', 'internal_system'));
    const repository = new InMemorySwimlaneRepository(initial);
    const handler = new ChangeSwimlaneActorTypeCommandHandler(repository);

    handler.handle(new ChangeSwimlaneActorTypeCommand('s1', 'external_system'));

    const swimlanes = collectSwimlanes(repository.load());
    expect(swimlanes[1].actorType).toBe('internal_system');
  });
});
