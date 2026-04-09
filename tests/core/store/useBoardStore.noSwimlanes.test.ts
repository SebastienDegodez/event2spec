import { describe, it, expect } from 'vitest';
import { useBoardStore } from '../../../src/core/store/useBoardStore';

describe('store without swimlanes aggregate', () => {
  it('initializes with boundedContexts and fixed-row semantics only', () => {
    const state = useBoardStore.getState();
    expect('swimlanes' in state).toBe(false);
  });
});
