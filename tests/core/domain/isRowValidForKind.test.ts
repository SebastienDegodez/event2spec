import { describe, it, expect } from 'vitest';
import { isRowValidForKind } from '../../../src/core/domain/isRowValidForKind';

describe('isRowValidForKind', () => {
  it('accepts uiScreen only on row 0', () => {
    expect(isRowValidForKind('uiScreen', 0)).toBe(true);
    expect(isRowValidForKind('uiScreen', 1)).toBe(false);
  });

  it('accepts command/readModel/policy only on row 1', () => {
    expect(isRowValidForKind('command', 1)).toBe(true);
    expect(isRowValidForKind('command', 0)).toBe(false);

    expect(isRowValidForKind('readModel', 1)).toBe(true);
    expect(isRowValidForKind('readModel', 2)).toBe(false);

    expect(isRowValidForKind('policy', 1)).toBe(true);
    expect(isRowValidForKind('policy', 3)).toBe(false);
  });

  it('accepts domainEvent only on row >= 2', () => {
    expect(isRowValidForKind('domainEvent', 1)).toBe(false);
    expect(isRowValidForKind('domainEvent', 2)).toBe(true);
    expect(isRowValidForKind('domainEvent', 5)).toBe(true);
  });
});
