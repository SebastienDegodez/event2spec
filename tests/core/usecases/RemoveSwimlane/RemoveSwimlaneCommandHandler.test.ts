import { describe, it, expect } from 'vitest';
import { SwimlaneCollection } from '../../../../src/core/domain/SwimlaneCollection';
import { Swimlane } from '../../../../src/core/domain/Swimlane';
import { RemoveSwimlaneCommand } from '../../../../src/core/usecases/commands/RemoveSwimlane/RemoveSwimlaneCommand';
import { RemoveSwimlaneCommandHandler } from '../../../../src/core/usecases/commands/RemoveSwimlane/RemoveSwimlaneCommandHandler';
import { collectSwimlanes } from '../../../helpers/collectSwimlanes';

const handler = new RemoveSwimlaneCommandHandler();

describe('RemoveSwimlaneCommandHandler', () => {
  it('removes an existing swimlane by id', () => {
    const collection = SwimlaneCollection.empty()
      .add(Swimlane.create('s1', 'Customer', 'human'))
      .add(Swimlane.create('s2', 'Order Service', 'internal_system'));

    const result = handler.handle(collection, new RemoveSwimlaneCommand('s1'));

    const swimlanes = collectSwimlanes(result);
    expect(swimlanes).toHaveLength(1);
    expect(swimlanes[0].id).toBe('s2');
  });

  it('returns the same collection when id does not exist', () => {
    const collection = SwimlaneCollection.empty()
      .add(Swimlane.create('s1', 'Customer', 'human'));

    const result = handler.handle(collection, new RemoveSwimlaneCommand('unknown'));

    expect(collectSwimlanes(result)).toHaveLength(1);
  });
});
