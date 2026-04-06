import { describe, it, expect } from 'vitest';
import { SwimlaneCollection } from '../../../../src/core/domain/SwimlaneCollection';
import { Swimlane } from '../../../../src/core/domain/Swimlane';
import { ChangeSwimlaneActorTypeCommand } from '../../../../src/core/usecases/commands/ChangeSwimlaneActorType/ChangeSwimlaneActorTypeCommand';
import { ChangeSwimlaneActorTypeCommandHandler } from '../../../../src/core/usecases/commands/ChangeSwimlaneActorType/ChangeSwimlaneActorTypeCommandHandler';
import { collectSwimlanes } from '../../../helpers/collectSwimlanes';

const handler = new ChangeSwimlaneActorTypeCommandHandler();

describe('ChangeSwimlaneActorTypeCommandHandler', () => {
  it('changes actor type and updates color accordingly', () => {
    const collection = SwimlaneCollection.empty()
      .add(Swimlane.create('s1', 'Customer', 'human'));

    const result = handler.handle(collection, new ChangeSwimlaneActorTypeCommand('s1', 'external_system'));

    const swimlanes = collectSwimlanes(result);
    expect(swimlanes[0].actorType).toBe('external_system');
    expect(swimlanes[0].color).toBe('red');
  });

  it('preserves actor name when changing type', () => {
    const collection = SwimlaneCollection.empty()
      .add(Swimlane.create('s1', 'Customer', 'human'));

    const result = handler.handle(collection, new ChangeSwimlaneActorTypeCommand('s1', 'automated_process'));

    expect(collectSwimlanes(result)[0].actorName).toBe('Customer');
  });

  it('does not change other swimlanes', () => {
    const collection = SwimlaneCollection.empty()
      .add(Swimlane.create('s1', 'Customer', 'human'))
      .add(Swimlane.create('s2', 'Service', 'internal_system'));

    const result = handler.handle(collection, new ChangeSwimlaneActorTypeCommand('s1', 'external_system'));

    const swimlanes = collectSwimlanes(result);
    expect(swimlanes[1].actorType).toBe('internal_system');
  });
});
