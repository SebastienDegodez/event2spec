import { beforeEach, describe, expect, it, vi } from 'vitest';
import { collectSlices } from '../../helpers/collectSlices';

const STORAGE_KEY = 'event2spec-board';

type LocalStorageMock = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
  clear: () => void;
};

function createLocalStorageMock(): LocalStorageMock {
  const entries = new Map<string, string>();
  return {
    getItem(key) {
      return entries.has(key) ? entries.get(key) ?? null : null;
    },
    setItem(key, value) {
      entries.set(key, value);
    },
    removeItem(key) {
      entries.delete(key);
    },
    clear() {
      entries.clear();
    },
  };
}

describe('useBoardStore slice range selection', () => {
  beforeEach(() => {
    vi.resetModules();
    (globalThis as { localStorage: LocalStorageMock }).localStorage = createLocalStorageMock();
  });

  it('starts a new temporary range from a free column', async () => {
    const { useBoardStore } = await import('../../../src/core/store/useBoardStore');
    useBoardStore.getState().startSliceSelection(8);

    expect(useBoardStore.getState().selectedSliceRange).toEqual({ startColumn: 8, columnCount: 1 });
  });

  it('ignores a covered column when starting a new selection', async () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: 3,
        nodes: [],
        links: [],
        boundedContexts: [{ id: 'default-bc', name: 'Bounded Context 1' }],
        slices: [
          { id: 'vs-1', name: 'Checkout', commandId: 'c1', eventIds: ['e1'], readModelId: 'rm1', scenarios: [], startColumn: 4, columnCount: 2 },
        ],
        nodeProperties: {},
      })
    );

    const { useBoardStore } = await import('../../../src/core/store/useBoardStore');
    useBoardStore.getState().startSliceSelection(5);

    expect(useBoardStore.getState().selectedSliceRange).toBeNull();
    expect(collectSlices(useBoardStore.getState().slices)[0].columnCount).toBe(2);
  });

  it('extends the temporary range by one column to the right', async () => {
    const { useBoardStore } = await import('../../../src/core/store/useBoardStore');
    useBoardStore.getState().startSliceSelection(8);
    useBoardStore.getState().extendSelectedSliceRangeRight();

    expect(useBoardStore.getState().selectedSliceRange).toEqual({ startColumn: 8, columnCount: 2 });
  });
});
