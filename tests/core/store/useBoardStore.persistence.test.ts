import { beforeEach, describe, expect, it, vi } from 'vitest';
import { collectNodes } from '../../helpers/collectNodes';
import { collectBoundedContexts } from '../../helpers/collectBoundedContexts';
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

describe('useBoardStore persistence v3', () => {
  beforeEach(() => {
    vi.resetModules();
    (globalThis as { localStorage: LocalStorageMock }).localStorage = createLocalStorageMock();
  });

  it('loads persisted slice ranges from version 3', async () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: 3,
        nodes: [],
        links: [],
        boundedContexts: [{ id: 'bc-1', name: 'Ordering' }],
        slices: [
          {
            id: 'vs-1',
            name: 'Checkout',
            commandId: 'c1',
            eventIds: ['e1'],
            readModelId: 'rm1',
            scenarios: [],
            startColumn: 6,
            columnCount: 3,
          },
        ],
        nodeProperties: {},
      })
    );

    const { useBoardStore } = await import('../../../src/core/store/useBoardStore');
    const collected = collectSlices(useBoardStore.getState().slices);

    expect(collected[0].startColumn).toBe(6);
    expect(collected[0].columnCount).toBe(3);
  });

  it('normalizes legacy v2 slices to default range when fields are absent', async () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: 2,
        nodes: [],
        links: [],
        boundedContexts: [{ id: 'bc-1', name: 'Ordering' }],
        slices: [
          {
            id: 'vs-1',
            name: 'Checkout',
            commandId: 'c1',
            eventIds: ['e1'],
            readModelId: 'rm1',
            scenarios: [],
          },
        ],
        nodeProperties: {},
      })
    );

    const { useBoardStore } = await import('../../../src/core/store/useBoardStore');
    const collected = collectSlices(useBoardStore.getState().slices);

    expect(collected[0].startColumn).toBe(0);
    expect(collected[0].columnCount).toBe(1);
  });
});

describe('useBoardStore persistence v2', () => {
  beforeEach(() => {
    vi.resetModules();
    (globalThis as { localStorage: LocalStorageMock }).localStorage = createLocalStorageMock();
  });

  it('resets storage when version is missing', async () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        nodes: [],
        links: [],
        boundedContexts: [],
        slices: [],
        nodeProperties: {},
      })
    );

    const { useBoardStore } = await import('../../../src/core/store/useBoardStore');
    const state = useBoardStore.getState();

    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
    expect(collectNodes(state.board)).toEqual([]);
    // After reset, defaultBoundedContexts() provides one default BC
    expect(collectBoundedContexts(state.boundedContexts)).toEqual([
      { id: 'default-bc', name: 'Bounded Context 1' },
    ]);
  });

  it('loads state when version is 2', async () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: 2,
        nodes: [{ id: 'cmd-1', label: 'Create order', column: 1, row: 1, type: 'command' }],
        links: [],
        boundedContexts: [{ id: 'bc-1', name: 'Ordering' }],
        slices: [],
        nodeProperties: {
          'cmd-1': { type: 'command', actor: 'User', payload: { orderId: 'string' }, guardConditions: [] },
        },
      })
    );

    const { useBoardStore } = await import('../../../src/core/store/useBoardStore');
    const state = useBoardStore.getState();

    expect(localStorage.getItem(STORAGE_KEY)).not.toBeNull();
    expect(collectNodes(state.board)).toEqual([
      {
        id: 'cmd-1',
        label: 'Create order',
        column: 1,
        row: 1,
        type: 'command',
      },
    ]);
    expect(collectBoundedContexts(state.boundedContexts)).toEqual([{ id: 'bc-1', name: 'Ordering' }]);
    expect(state.nodeProperties['cmd-1']).toEqual({
      type: 'command',
      actor: 'User',
      payload: { orderId: 'string' },
      guardConditions: [],
    });
  });
});
