import { describe, it, expect } from 'vitest';
import { cellNodeOptions } from '../../../src/core/domain/CellNodeOptions';

describe('cellNodeOptions', () => {
  it('returns uiScreen for actor_ui category', () => {
    const options = cellNodeOptions('actor_ui');
    expect(options).toHaveLength(1);
    expect(options[0].kind).toBe('uiScreen');
    expect(options[0].letter).toBe('U');
  });

  it('returns command, readModel, policy for command_readmodel category', () => {
    const options = cellNodeOptions('command_readmodel');
    expect(options).toHaveLength(3);
    expect(options.map((o) => o.kind)).toEqual(['command', 'readModel', 'policy']);
  });

  it('returns domainEvent for event category', () => {
    const options = cellNodeOptions('event');
    expect(options).toHaveLength(1);
    expect(options[0].kind).toBe('domainEvent');
    expect(options[0].letter).toBe('E');
  });
});
