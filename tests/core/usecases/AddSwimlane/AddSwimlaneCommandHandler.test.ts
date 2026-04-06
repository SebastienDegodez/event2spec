import { describe, it, expect } from 'vitest';
import { type ActorType } from '../../../../src/core/domain/ActorType';
import { AddSwimlaneCommand } from '../../../../src/core/usecases/commands/AddSwimlane/AddSwimlaneCommand';
import { AddSwimlaneCommandHandler } from '../../../../src/core/usecases/commands/AddSwimlane/AddSwimlaneCommandHandler';

const handler = new AddSwimlaneCommandHandler();

describe('AddSwimlaneCommandHandler', () => {
  it('creates a swimlane with the given id, name and actor type', () => {
    const swimlane = handler.handle(new AddSwimlaneCommand('s1', 'Customer', 'human'));

    expect(swimlane.id).toBe('s1');
    expect(swimlane.actorName).toBe('Customer');
    expect(swimlane.actorType).toBe('human');
    expect(swimlane.color()).toBe('yellow');
  });

  it('assigns correct color for each actor type', () => {
    const cases: Array<[string, ActorType, string]> = [
      ['s1', 'human', 'yellow'],
      ['s2', 'internal_system', 'blue'],
      ['s3', 'external_system', 'red'],
      ['s4', 'automated_process', 'grey'],
    ];

    cases.forEach(([id, actorType, expectedColor]) => {
      const swimlane = handler.handle(new AddSwimlaneCommand(id, 'Lane', actorType));
      expect(swimlane.color()).toBe(expectedColor);
    });
  });
});

