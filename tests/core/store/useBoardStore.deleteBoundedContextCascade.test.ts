import { beforeEach, describe, expect, it, vi } from 'vitest';
import { collectNodes } from '../../helpers/collectNodes';

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

describe('useBoardStore deleteBoundedContext cascade', () => {
  beforeEach(() => {
    vi.resetModules();
    (globalThis as { localStorage: LocalStorageMock }).localStorage = createLocalStorageMock();
  });

  it('removes domain events belonging to the deleted bounded context from the board', async () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: 2,
        nodes: [
          { id: 'evt-1', label: 'OrderPlaced', column: 1, row: 2, type: 'domainEvent', boundedContextId: 'bc-1' },
          { id: 'evt-2', label: 'OrderShipped', column: 2, row: 3, type: 'domainEvent', boundedContextId: 'bc-2' },
        ],
        links: [],
        boundedContexts: [
          { id: 'bc-1', name: 'Ordering' },
          { id: 'bc-2', name: 'Shipping' },
        ],
        slices: [],
        nodeProperties: {},
      })
    );

    const { useBoardStore } = await import('../../../src/core/store/useBoardStore');
    useBoardStore.getState().deleteBoundedContext('bc-1');

    const nodes = collectNodes(useBoardStore.getState().board);
    const ids = nodes.map((n) => n.id);
    expect(ids).not.toContain('evt-1');
    expect(ids).toContain('evt-2');
  });

  it('removes links attached to events of the deleted bounded context', async () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: 2,
        nodes: [
          { id: 'cmd-1', label: 'PlaceOrder', column: 1, row: 1, type: 'command' },
          { id: 'evt-1', label: 'OrderPlaced', column: 1, row: 2, type: 'domainEvent', boundedContextId: 'bc-1' },
          { id: 'evt-2', label: 'OrderShipped', column: 2, row: 3, type: 'domainEvent', boundedContextId: 'bc-2' },
        ],
        links: [
          { sourceNodeId: 'cmd-1', targetNodeId: 'evt-1', connectionType: 'triggers' },
          { sourceNodeId: 'cmd-1', targetNodeId: 'evt-2', connectionType: 'triggers' },
        ],
        boundedContexts: [
          { id: 'bc-1', name: 'Ordering' },
          { id: 'bc-2', name: 'Shipping' },
        ],
        slices: [],
        nodeProperties: {},
      })
    );

    const { useBoardStore } = await import('../../../src/core/store/useBoardStore');
    useBoardStore.getState().deleteBoundedContext('bc-1');

    const { links } = useBoardStore.getState();
    expect(links.some((l) => l.sourceNodeId === 'evt-1' || l.targetNodeId === 'evt-1')).toBe(false);
    expect(links.some((l) => l.targetNodeId === 'evt-2')).toBe(true);
  });
});
