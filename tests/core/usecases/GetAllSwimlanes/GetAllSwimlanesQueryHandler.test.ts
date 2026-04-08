import { describe, it, expect } from 'vitest';
import { SwimlaneCollection } from '../../../../src/core/domain/SwimlaneCollection';
import { Swimlane } from '../../../../src/core/domain/Swimlane';
import { type SwimlaneProjection } from '../../../../src/core/domain/SwimlaneProjection';
import { GetAllSwimlanesQuery } from '../../../../src/core/usecases/queries/GetAllSwimlanes/GetAllSwimlanesQuery';
import { GetAllSwimlanesQueryHandler } from '../../../../src/core/usecases/queries/GetAllSwimlanes/GetAllSwimlanesQueryHandler';
import { collectSwimlanes } from '../../../helpers/collectSwimlanes';

const handler = new GetAllSwimlanesQueryHandler();

describe('GetAllSwimlanesQueryHandler', () => {
  it('describes all swimlanes in the collection', () => {
    const collection = SwimlaneCollection.empty()
      .add(Swimlane.create('s1', 'Customer', 'human'))
      .add(Swimlane.create('s2', 'Order Service', 'internal_system'));

    const found: ReturnType<typeof collectSwimlanes> = [];
    const projection: SwimlaneProjection = {
      onSwimlane(id, actorName, actorType, color, index, isFirst, isLast) {
        found.push({ id, actorName, actorType, color, index, isFirst, isLast });
      },
    };

    handler.handle(collection, projection, new GetAllSwimlanesQuery());

    expect(found).toHaveLength(2);
    expect(found[0]).toMatchObject({ id: 's1', actorName: 'Customer', actorType: 'human', color: 'yellow', isFirst: true, isLast: false });
    expect(found[1]).toMatchObject({ id: 's2', actorName: 'Order Service', actorType: 'internal_system', color: 'blue', isFirst: false, isLast: true });
  });

  it('describes nothing when the collection is empty', () => {
    const collection = SwimlaneCollection.empty();

    const found: ReturnType<typeof collectSwimlanes> = [];
    const projection: SwimlaneProjection = {
      onSwimlane(id, actorName, actorType, color, index, isFirst, isLast) {
        found.push({ id, actorName, actorType, color, index, isFirst, isLast });
      },
    };

    handler.handle(collection, projection, new GetAllSwimlanesQuery());

    expect(found).toHaveLength(0);
  });
});
