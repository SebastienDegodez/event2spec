import { describe, it, expect } from 'vitest';
import { SwimlaneCollection } from '../../../../src/core/domain/SwimlaneCollection';
import { AddSwimlaneCommand } from '../../../../src/core/usecases/commands/AddSwimlane/AddSwimlaneCommand';
import { AddSwimlaneCommandHandler } from '../../../../src/core/usecases/commands/AddSwimlane/AddSwimlaneCommandHandler';
import { collectSwimlanes } from '../../../helpers/collectSwimlanes';

const handler = new AddSwimlaneCommandHandler();

describe('AddSwimlaneCommandHandler', () => {
  it('adds a swimlane to an empty collection', () => {
    const collection = SwimlaneCollection.empty();
    const result = handler.handle(collection, new AddSwimlaneCommand('s1', 'Customer', 'human'));

    const swimlanes = collectSwimlanes(result);
    expect(swimlanes).toHaveLength(1);
    expect(swimlanes[0].id).toBe('s1');
    expect(swimlanes[0].actorName).toBe('Customer');
    expect(swimlanes[0].actorType).toBe('human');
    expect(swimlanes[0].color).toBe('yellow');
  });

  it('appends a swimlane at the end of an existing collection', () => {
    const collection = handler.handle(
      SwimlaneCollection.empty(),
      new AddSwimlaneCommand('s1', 'Customer', 'human')
    );
    const result = handler.handle(collection, new AddSwimlaneCommand('s2', 'Order Service', 'internal_system'));

    const swimlanes = collectSwimlanes(result);
    expect(swimlanes).toHaveLength(2);
    expect(swimlanes[0].id).toBe('s1');
    expect(swimlanes[1].id).toBe('s2');
  });

  it('assigns correct color for each actor type', () => {
    const cases: Array<[string, Parameters<typeof AddSwimlaneCommand.prototype.constructor>[2], string]> = [
      ['s1', 'human', 'yellow'],
      ['s2', 'internal_system', 'blue'],
      ['s3', 'external_system', 'red'],
      ['s4', 'automated_process', 'grey'],
    ];

    cases.forEach(([id, actorType, expectedColor]) => {
      const result = handler.handle(
        SwimlaneCollection.empty(),
        new AddSwimlaneCommand(id, 'Lane', actorType)
      );
      const swimlanes = collectSwimlanes(result);
      expect(swimlanes[0].color).toBe(expectedColor);
    });
  });
});
