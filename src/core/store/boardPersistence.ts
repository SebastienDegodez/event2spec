import { GridBoard } from '../domain/board/GridBoard';
import { type BoardProjection } from '../domain/board/BoardProjection';
import { DomainEventNode } from '../domain/node/DomainEventNode';
import { CommandNode } from '../domain/node/CommandNode';
import { ReadModelNode } from '../domain/node/ReadModelNode';
import { PolicyNode } from '../domain/node/PolicyNode';
import { UIScreenNode } from '../domain/node/UIScreenNode';
import { type NodeLink } from '../domain/node/NodeLink';
import { type NodeProperties } from '../domain/node/NodeProperties';
import { VerticalSliceCollection } from '../domain/vertical-slice/VerticalSliceCollection';
import { VerticalSlice } from '../domain/vertical-slice/VerticalSlice';
import { Scenario } from '../domain/Scenario';
import { BoundedContextCollection } from '../domain/bounded-context/BoundedContextCollection';
import { BoundedContext } from '../domain/bounded-context/BoundedContext';

/** Serialisable representation of a node for localStorage persistence. */
interface PersistedNode {
  id: string;
  label: string;
  column: number;
  row: number;
  type: 'domainEvent' | 'command' | 'readModel' | 'policy' | 'uiScreen';
  boundedContextId?: string;
}

/** Serialisable representation of a scenario for localStorage persistence. */
interface PersistedScenario {
  given: string[];
  when: string;
  then: string[];
}

/** Serialisable representation of a vertical slice for localStorage persistence. */
interface PersistedSlice {
  id: string;
  name: string;
  commandId: string;
  eventIds: string[];
  readModelId: string;
  scenarios: PersistedScenario[];
  boundedContextId?: string;
  startColumn?: number;
  columnCount?: number;
}

/** Serialisable representation of a bounded context for localStorage persistence. */
interface PersistedBoundedContext {
  id: string;
  name: string;
}

/** Shape of the data persisted in localStorage. */
interface PersistedState {
  version: 2 | 3;
  nodes: PersistedNode[];
  links: NodeLink[];
  slices: PersistedSlice[];
  boundedContexts: PersistedBoundedContext[];
  nodeProperties: Record<string, NodeProperties>;
}

const STORAGE_KEY = 'event2spec-board';

const DEFAULT_BC_ID = 'default-bc';
const DEFAULT_BC_NAME = 'Bounded Context 1';

function defaultBoundedContexts(): BoundedContextCollection {
  return BoundedContextCollection.empty().add(BoundedContext.create(DEFAULT_BC_ID, DEFAULT_BC_NAME));
}

export interface PersistedBoard {
  board: GridBoard;
  links: ReadonlyArray<NodeLink>;
  slices: VerticalSliceCollection;
  boundedContexts: BoundedContextCollection;
  nodeProperties: Record<string, NodeProperties>;
}

export function loadFromStorage(): PersistedBoard {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { board: GridBoard.empty(), links: [], slices: VerticalSliceCollection.empty(), boundedContexts: defaultBoundedContexts(), nodeProperties: {} };
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    if (parsed.version !== 2 && parsed.version !== 3) {
      localStorage.removeItem(STORAGE_KEY);
      return { board: GridBoard.empty(), links: [], slices: VerticalSliceCollection.empty(), boundedContexts: defaultBoundedContexts(), nodeProperties: {} };
    }
    const persisted = parsed as PersistedState;
    const { nodes } = persisted;
    let board = GridBoard.empty();
    for (const node of nodes) {
      if (node.type === 'domainEvent') {
        board = board.insertNode(DomainEventNode.create(node.id, node.label, node.column, node.row, node.boundedContextId));
      } else if (node.type === 'command') {
        board = board.insertNode(CommandNode.create(node.id, node.label, node.column, node.row));
      } else if (node.type === 'readModel') {
        board = board.insertNode(ReadModelNode.create(node.id, node.label, node.column, node.row));
      } else if (node.type === 'policy') {
        board = board.insertNode(PolicyNode.create(node.id, node.label, node.column, node.row));
      } else if (node.type === 'uiScreen') {
        board = board.insertNode(UIScreenNode.create(node.id, node.label, node.column, node.row));
      }
    }
    const rawLinks = persisted.links as Array<NodeLink | { commandNodeId: string; eventNodeId: string }>;
    const links: NodeLink[] = rawLinks.map((link) => {
      if ('commandNodeId' in link) {
        return { sourceNodeId: link.commandNodeId, targetNodeId: link.eventNodeId, connectionType: 'triggers' as const };
      }
      return link as NodeLink;
    });
    let slices = VerticalSliceCollection.empty();
    for (const ps of persisted.slices) {
      const startColumn = typeof ps.startColumn === 'number' ? ps.startColumn : 0;
      const columnCount = typeof ps.columnCount === 'number' ? ps.columnCount : 1;
      let slice = VerticalSlice.create(ps.id, ps.name, ps.commandId, ps.eventIds, ps.readModelId, startColumn, columnCount);
      for (const sc of ps.scenarios) {
        slice = slice.addScenario(Scenario.create(sc.given, sc.when, sc.then));
      }
      if (ps.boundedContextId) {
        slice = slice.withBoundedContext(ps.boundedContextId);
      }
      slices = slices.add(slice);
    }
    let boundedContexts = BoundedContextCollection.empty();
    for (const bc of persisted.boundedContexts) {
      boundedContexts = boundedContexts.add(BoundedContext.create(bc.id, bc.name));
    }
    if (boundedContexts.isEmpty()) {
      boundedContexts = defaultBoundedContexts();
    }
    return { board, links, slices, boundedContexts, nodeProperties: persisted.nodeProperties };
  } catch {
    return { board: GridBoard.empty(), links: [], slices: VerticalSliceCollection.empty(), boundedContexts: defaultBoundedContexts(), nodeProperties: {} };
  }
}

export function saveToStorage(board: GridBoard, links: ReadonlyArray<NodeLink>, slices: VerticalSliceCollection, boundedContexts: BoundedContextCollection, nodeProperties: Record<string, NodeProperties>): void {
  const nodes: PersistedNode[] = [];
  const projection: BoardProjection = {
    onDomainEventNode(id, label, column, row, boundedContextId) {
      nodes.push({ id, label, column, row, type: 'domainEvent', boundedContextId });
    },
    onCommandNode(id, label, column, row) {
      nodes.push({ id, label, column, row, type: 'command' });
    },
    onReadModelNode(id, label, column, row) {
      nodes.push({ id, label, column, row, type: 'readModel' });
    },
    onPolicyNode(id, label, column, row) {
      nodes.push({ id, label, column, row, type: 'policy' });
    },
    onUIScreenNode(id, label, column, row) {
      nodes.push({ id, label, column, row, type: 'uiScreen' });
    },
  };
  board.describeTo(projection);
  const persistedSlices: PersistedSlice[] = [];
  slices.describeTo({
    onSlice(id, name, commandId, eventIds, readModelId, scenarios, boundedContextId, startColumn, columnCount) {
      persistedSlices.push({
        id,
        name,
        commandId,
        eventIds: [...eventIds],
        readModelId,
        scenarios: scenarios.map((s) => ({ given: [...s.given], when: s.when, then: [...s.then] })),
        boundedContextId,
        startColumn,
        columnCount,
      });
    },
  });
  const persistedBoundedContexts: PersistedBoundedContext[] = [];
  boundedContexts.describeTo({
    onBoundedContext(id, name) {
      persistedBoundedContexts.push({ id, name });
    },
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 3, nodes, links, slices: persistedSlices, boundedContexts: persistedBoundedContexts, nodeProperties }));
}
