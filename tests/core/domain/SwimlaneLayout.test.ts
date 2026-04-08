import { describe, it, expect } from 'vitest';
import { swimlaneGridRow, gridRowToSwimlane } from '../../../src/core/domain/SwimlaneLayout';

describe('swimlaneGridRow', () => {
  it('returns row 0 for first swimlane actor_ui', () => {
    expect(swimlaneGridRow(0, 'actor_ui')).toBe(0);
  });

  it('returns row 1 for first swimlane command_readmodel', () => {
    expect(swimlaneGridRow(0, 'command_readmodel')).toBe(1);
  });

  it('returns row 2 for first swimlane event', () => {
    expect(swimlaneGridRow(0, 'event')).toBe(2);
  });

  it('returns row 3 for second swimlane actor_ui', () => {
    expect(swimlaneGridRow(1, 'actor_ui')).toBe(3);
  });

  it('returns row 4 for second swimlane command_readmodel', () => {
    expect(swimlaneGridRow(1, 'command_readmodel')).toBe(4);
  });

  it('returns row 5 for second swimlane event', () => {
    expect(swimlaneGridRow(1, 'event')).toBe(5);
  });
});

describe('gridRowToSwimlane', () => {
  it('maps row 0 to swimlane 0 / actor_ui', () => {
    expect(gridRowToSwimlane(0)).toEqual({ swimlaneIndex: 0, category: 'actor_ui' });
  });

  it('maps row 1 to swimlane 0 / command_readmodel', () => {
    expect(gridRowToSwimlane(1)).toEqual({ swimlaneIndex: 0, category: 'command_readmodel' });
  });

  it('maps row 2 to swimlane 0 / event', () => {
    expect(gridRowToSwimlane(2)).toEqual({ swimlaneIndex: 0, category: 'event' });
  });

  it('maps row 5 to swimlane 1 / event', () => {
    expect(gridRowToSwimlane(5)).toEqual({ swimlaneIndex: 1, category: 'event' });
  });

  it('is the inverse of swimlaneGridRow', () => {
    for (let swimlaneIndex = 0; swimlaneIndex < 5; swimlaneIndex++) {
      for (const category of ['actor_ui', 'command_readmodel', 'event'] as const) {
        const row = swimlaneGridRow(swimlaneIndex, category);
        expect(gridRowToSwimlane(row)).toEqual({ swimlaneIndex, category });
      }
    }
  });
});
