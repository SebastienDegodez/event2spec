import { describe, it, expect } from 'vitest';
import { SwimlaneCollection } from '../../../../src/core/domain/SwimlaneCollection';
import { type ActorType } from '../../../../src/core/domain/ActorType';
import { AddSwimlaneCommand } from '../../../../src/core/usecases/commands/AddSwimlane/AddSwimlaneCommand';
import { AddSwimlaneCommandHandler } from '../../../../src/core/usecases/commands/AddSwimlane/AddSwimlaneCommandHandler';
import { InMemorySwimlaneRepository } from '../../../helpers/InMemorySwimlaneRepository';
import { collectSwimlanes } from '../../../helpers/collectSwimlanes';

describe('AddSwimlaneCommandHandler', () => {
  it('adds a swimlane to an empty collection', () => {
    const repository = new InMemorySwimlaneRepository();
    const handler = new AddSwimlaneCommandHandler(repository);

    handler.handle(new AddSwimlaneCommand('s1', 'Customer', 'human'));

    const swimlanes = collectSwimlanes(repository.load());
    expect(swimlanes).toHaveLength(1);
    expect(swimlanes[0].id).toBe('s1');
    expect(swimlanes[0].actorName).toBe('Customer');
    expect(swimlanes[0].actorType).toBe('human');
    expect(swimlanes[0].color).toBe('yellow');
  });

  it('appends a swimlane at the end of an existing collection', () => {
    const repository = new InMemorySwimlaneRepository();
    const handler = new AddSwimlaneCommandHandler(repository);

    handler.handle(new AddSwimlaneCommand('s1', 'Customer', 'human'));
    handler.handle(new AddSwimlaneCommand('s2', 'Order Service', 'internal_system'));

    const swimlanes = collectSwimlanes(repository.load());
    expect(swimlanes).toHaveLength(2);
    expect(swimlanes[0].id).toBe('s1');
    expect(swimlanes[1].id).toBe('s2');
  });

  it('assigns correct color for each actor type', () => {
    const cases: Array<[string, ActorType, string]> = [
      ['s1', 'human', 'yellow'],
      ['s2', 'internal_system', 'blue'],
      ['s3', 'external_system', 'red'],
      ['s4', 'automated_process', 'grey'],
    ];

    cases.forEach(([id, actorType, expectedColor]) => {
      const repository = new InMemorySwimlaneRepository();
      const handler = new AddSwimlaneCommandHandler(repository);

      handler.handle(new AddSwimlaneCommand(id, 'Lane', actorType));

      const swimlanes = collectSwimlanes(repository.load());
      expect(swimlanes[0].color).toBe(expectedColor);
    });
  });
});
