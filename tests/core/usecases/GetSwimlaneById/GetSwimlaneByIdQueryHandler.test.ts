import { describe, it, expect } from 'vitest';
import { SwimlaneCollection } from '../../../../src/core/domain/SwimlaneCollection';
import { Swimlane } from '../../../../src/core/domain/Swimlane';
import { type SwimlaneProjection } from '../../../../src/core/domain/SwimlaneProjection';
import { GetSwimlaneByIdQuery } from '../../../../src/core/usecases/queries/GetSwimlaneById/GetSwimlaneByIdQuery';
import { GetSwimlaneByIdQueryHandler } from '../../../../src/core/usecases/queries/GetSwimlaneById/GetSwimlaneByIdQueryHandler';
import { collectSwimlanes } from '../../../helpers/collectSwimlanes';

const handler = new GetSwimlaneByIdQueryHandler();

describe('GetSwimlaneByIdQueryHandler', () => {
  it('describes only the swimlane matching the requested id', () => {
    const collection = SwimlaneCollection.empty()
      .add(Swimlane.create('s1', 'Customer', 'human'))
      .add(Swimlane.create('s2', 'Order Service', 'internal_system'));

    const found: ReturnType<typeof collectSwimlanes> = [];
    const projection: SwimlaneProjection = {
      onSwimlane(id, actorName, actorType, color, index, isFirst, isLast) {
        found.push({ id, actorName, actorType, color, index, isFirst, isLast });
      },
    };

    handler.handle(collection, new GetSwimlaneByIdQuery('s1'), projection);

    expect(found).toHaveLength(1);
    expect(found[0].id).toBe('s1');
    expect(found[0].actorName).toBe('Customer');
    expect(found[0].actorType).toBe('human');
    expect(found[0].color).toBe('yellow');
  });

  it('describes nothing when the id does not exist in the collection', () => {
    const collection = SwimlaneCollection.empty()
      .add(Swimlane.create('s1', 'Customer', 'human'));

    const found: ReturnType<typeof collectSwimlanes> = [];
    const projection: SwimlaneProjection = {
      onSwimlane(id, actorName, actorType, color, index, isFirst, isLast) {
        found.push({ id, actorName, actorType, color, index, isFirst, isLast });
      },
    };

    handler.handle(collection, new GetSwimlaneByIdQuery('unknown'), projection);

    expect(found).toHaveLength(0);
  });

  it('preserves isFirst/isLast context from the original collection position', () => {
    const collection = SwimlaneCollection.empty()
      .add(Swimlane.create('s1', 'Customer', 'human'))
      .add(Swimlane.create('s2', 'Service', 'internal_system'))
      .add(Swimlane.create('s3', 'Robot', 'automated_process'));

    const found: ReturnType<typeof collectSwimlanes> = [];
    const projection: SwimlaneProjection = {
      onSwimlane(id, actorName, actorType, color, index, isFirst, isLast) {
        found.push({ id, actorName, actorType, color, index, isFirst, isLast });
      },
    };

    handler.handle(collection, new GetSwimlaneByIdQuery('s2'), projection);

    expect(found[0].isFirst).toBe(false);
    expect(found[0].isLast).toBe(false);
    expect(found[0].index).toBe(1);
  });
});
