import { describe, it, expect } from 'vitest';
import { nodeKindToRow } from '../../../src/core/domain/nodeKindToRow';

describe('nodeKindToRow', () => {
  it('maps uiScreen to row 0', () => {
    expect(nodeKindToRow('uiScreen')).toBe(0);
  });

  it('maps command/readModel/policy to row 1', () => {
    expect(nodeKindToRow('command')).toBe(1);
    expect(nodeKindToRow('readModel')).toBe(1);
    expect(nodeKindToRow('policy')).toBe(1);
  });

  it('maps domainEvent to bounded context row (2 + index)', () => {
    expect(nodeKindToRow('domainEvent', 0)).toBe(2);
    expect(nodeKindToRow('domainEvent', 3)).toBe(5);
  });
});
