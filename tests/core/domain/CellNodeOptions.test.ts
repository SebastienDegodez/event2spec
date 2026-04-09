import { describe, it, expect } from 'vitest';
import { cellNodeOptions } from '../../../src/core/domain/CellNodeOptions';

describe('cellNodeOptions', () => {
  it('returns only UI screen in row 0', () => {
    const options = cellNodeOptions(0);
    expect(options).toHaveLength(1);
    expect(options[0].kind).toBe('uiScreen');
    expect(options[0].letter).toBe('U');
  });

  it('returns command, readModel and policy in row 1', () => {
    const options = cellNodeOptions(1);
    expect(options).toHaveLength(3);
    expect(options.map((o) => o.kind)).toEqual(['command', 'readModel', 'policy']);
  });

  it('returns only domainEvent in row >= 2', () => {
    const options = cellNodeOptions(2);
    expect(options).toHaveLength(1);
    expect(options[0].kind).toBe('domainEvent');
    expect(options[0].letter).toBe('E');

    const laterRowOptions = cellNodeOptions(9);
    expect(laterRowOptions).toHaveLength(1);
    expect(laterRowOptions[0].kind).toBe('domainEvent');
  });
});
