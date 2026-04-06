import { describe, it, expect } from 'vitest';
import { SwimlaneCollection } from '../../../../src/core/domain/SwimlaneCollection';
import { Swimlane } from '../../../../src/core/domain/Swimlane';
import { ReorderSwimlanesCommand } from '../../../../src/core/usecases/commands/ReorderSwimlanes/ReorderSwimlanesCommand';
import { ReorderSwimlanesCommandHandler } from '../../../../src/core/usecases/commands/ReorderSwimlanes/ReorderSwimlanesCommandHandler';
import { collectSwimlanes } from '../../../helpers/collectSwimlanes';

const handler = new ReorderSwimlanesCommandHandler();

describe('ReorderSwimlanesCommandHandler', () => {
  it('moves a swimlane to a lower index', () => {
    const collection = SwimlaneCollection.empty()
      .add(Swimlane.create('s1', 'Customer', 'human'))
      .add(Swimlane.create('s2', 'Service', 'internal_system'))
      .add(Swimlane.create('s3', 'Robot', 'automated_process'));

    const result = handler.handle(collection, new ReorderSwimlanesCommand('s3', 0));

    const ids = collectSwimlanes(result).map((s) => s.id);
    expect(ids).toEqual(['s3', 's1', 's2']);
  });

  it('moves a swimlane to a higher index', () => {
    const collection = SwimlaneCollection.empty()
      .add(Swimlane.create('s1', 'Customer', 'human'))
      .add(Swimlane.create('s2', 'Service', 'internal_system'))
      .add(Swimlane.create('s3', 'Robot', 'automated_process'));

    const result = handler.handle(collection, new ReorderSwimlanesCommand('s1', 2));

    const ids = collectSwimlanes(result).map((s) => s.id);
    expect(ids).toEqual(['s2', 's3', 's1']);
  });

  it('returns the same collection when id does not exist', () => {
    const collection = SwimlaneCollection.empty()
      .add(Swimlane.create('s1', 'Customer', 'human'));

    const result = handler.handle(collection, new ReorderSwimlanesCommand('unknown', 0));

    expect(collectSwimlanes(result).map((s) => s.id)).toEqual(['s1']);
  });
});
