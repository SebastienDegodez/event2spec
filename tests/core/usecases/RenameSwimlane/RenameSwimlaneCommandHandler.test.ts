import { describe, it, expect } from 'vitest';
import { SwimlaneCollection } from '../../../../src/core/domain/SwimlaneCollection';
import { Swimlane } from '../../../../src/core/domain/Swimlane';
import { RenameSwimlaneCommand } from '../../../../src/core/usecases/commands/RenameSwimlane/RenameSwimlaneCommand';
import { RenameSwimlaneCommandHandler } from '../../../../src/core/usecases/commands/RenameSwimlane/RenameSwimlaneCommandHandler';
import { collectSwimlanes } from '../../../helpers/collectSwimlanes';

const handler = new RenameSwimlaneCommandHandler();

describe('RenameSwimlaneCommandHandler', () => {
  it('renames a swimlane by id', () => {
    const collection = SwimlaneCollection.empty()
      .add(Swimlane.create('s1', 'Customer', 'human'));

    const result = handler.handle(collection, new RenameSwimlaneCommand('s1', 'End User'));

    const swimlanes = collectSwimlanes(result);
    expect(swimlanes[0].actorName).toBe('End User');
  });

  it('does not change other swimlanes when renaming', () => {
    const collection = SwimlaneCollection.empty()
      .add(Swimlane.create('s1', 'Customer', 'human'))
      .add(Swimlane.create('s2', 'Service', 'internal_system'));

    const result = handler.handle(collection, new RenameSwimlaneCommand('s1', 'End User'));

    const swimlanes = collectSwimlanes(result);
    expect(swimlanes[0].actorName).toBe('End User');
    expect(swimlanes[1].actorName).toBe('Service');
  });
});
