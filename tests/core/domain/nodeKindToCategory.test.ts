import { describe, it, expect } from 'vitest';
import { nodeKindToCategory } from '../../../src/core/domain/nodeKindToCategory';

describe('nodeKindToCategory', () => {
  it('maps uiScreen to actor_ui', () => {
    expect(nodeKindToCategory('uiScreen')).toBe('actor_ui');
  });

  it('maps command to command_readmodel', () => {
    expect(nodeKindToCategory('command')).toBe('command_readmodel');
  });

  it('maps readModel to command_readmodel', () => {
    expect(nodeKindToCategory('readModel')).toBe('command_readmodel');
  });

  it('maps policy to command_readmodel', () => {
    expect(nodeKindToCategory('policy')).toBe('command_readmodel');
  });

  it('maps domainEvent to event', () => {
    expect(nodeKindToCategory('domainEvent')).toBe('event');
  });
});
