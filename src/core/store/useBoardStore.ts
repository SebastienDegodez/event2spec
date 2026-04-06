import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { GridBoard } from '../domain/GridBoard';
import { type BoardProjection } from '../domain/BoardProjection';
import { DomainEventNode } from '../domain/DomainEventNode';
import { CommandNode } from '../domain/CommandNode';
import { ReadModelNode } from '../domain/ReadModelNode';
import { PolicyNode } from '../domain/PolicyNode';
import { UIScreenNode } from '../domain/UIScreenNode';
import { AddDomainEventNodeCommand } from '../usecases/commands/AddDomainEventNode/AddDomainEventNodeCommand';
import { AddDomainEventNodeCommandHandler } from '../usecases/commands/AddDomainEventNode/AddDomainEventNodeCommandHandler';
import { MoveNodeCommand } from '../usecases/commands/MoveNode/MoveNodeCommand';
import { MoveNodeCommandHandler } from '../usecases/commands/MoveNode/MoveNodeCommandHandler';
import { UpdateNodeLabelCommand } from '../usecases/commands/UpdateNodeLabel/UpdateNodeLabelCommand';
import { UpdateNodeLabelCommandHandler } from '../usecases/commands/UpdateNodeLabel/UpdateNodeLabelCommandHandler';
import { RemoveNodeCommand } from '../usecases/commands/RemoveNode/RemoveNodeCommand';
import { RemoveNodeCommandHandler } from '../usecases/commands/RemoveNode/RemoveNodeCommandHandler';
import { AddCommandNodeCommand } from '../usecases/commands/AddCommandNode/AddCommandNodeCommand';
import { AddCommandNodeCommandHandler } from '../usecases/commands/AddCommandNode/AddCommandNodeCommandHandler';
import { AddReadModelNodeCommand } from '../usecases/commands/AddReadModelNode/AddReadModelNodeCommand';
import { AddReadModelNodeCommandHandler } from '../usecases/commands/AddReadModelNode/AddReadModelNodeCommandHandler';
import { AddPolicyNodeCommand } from '../usecases/commands/AddPolicyNode/AddPolicyNodeCommand';
import { AddPolicyNodeCommandHandler } from '../usecases/commands/AddPolicyNode/AddPolicyNodeCommandHandler';
import { AddUIScreenNodeCommand } from '../usecases/commands/AddUIScreenNode/AddUIScreenNodeCommand';
import { AddUIScreenNodeCommandHandler } from '../usecases/commands/AddUIScreenNode/AddUIScreenNodeCommandHandler';
import { ExportJSONQuery } from '../usecases/queries/ExportJSON/ExportJSONQuery';
import { ExportJSONQueryHandler } from '../usecases/queries/ExportJSON/ExportJSONQueryHandler';
import { ExportMarkdownQuery } from '../usecases/queries/ExportMarkdown/ExportMarkdownQuery';
import { ExportMarkdownQueryHandler } from '../usecases/queries/ExportMarkdown/ExportMarkdownQueryHandler';
import { type NodeLink } from '../domain/NodeLink';
import { type ConnectionType } from '../domain/ConnectionType';

export type { NodeLink };
export type { ConnectionType };

/** Serialisable representation of a node for localStorage persistence. */
interface PersistedNode {
  id: string;
  label: string;
  column: number;
  row: number;
  type: 'domainEvent' | 'command' | 'readModel' | 'policy' | 'uiScreen';
}

/** Shape of the data persisted in localStorage. */
interface PersistedState {
  nodes: PersistedNode[];
  links: NodeLink[];
}

const STORAGE_KEY = 'event2spec-board';

function loadFromStorage(): { board: GridBoard; links: ReadonlyArray<NodeLink> } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { board: GridBoard.empty(), links: [] };
    const parsed = JSON.parse(raw) as PersistedState;
    const { nodes } = parsed;
    let board = GridBoard.empty();
    for (const node of nodes) {
      if (node.type === 'domainEvent') {
        board = board.insertNode(DomainEventNode.create(node.id, node.label, node.column, node.row));
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
    const rawLinks = parsed.links as Array<NodeLink | { commandNodeId: string; eventNodeId: string }>;
    const links: NodeLink[] = rawLinks.map((link) => {
      if ('commandNodeId' in link) {
        return { sourceNodeId: link.commandNodeId, targetNodeId: link.eventNodeId, connectionType: 'triggers' as const };
      }
      return link as NodeLink;
    });
    return { board, links };
  } catch {
    return { board: GridBoard.empty(), links: [] };
  }
}

function saveToStorage(board: GridBoard, links: ReadonlyArray<NodeLink>): void {
  const nodes: PersistedNode[] = [];
  const projection: BoardProjection = {
    onDomainEventNode(id, label, column, row) {
      nodes.push({ id, label, column, row, type: 'domainEvent' });
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
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ nodes, links }));
}

interface BoardStoreState {
  board: GridBoard;
  links: ReadonlyArray<NodeLink>;
}

interface BoardActions {
  /** Add a new domain event node at the given grid position. */
  addDomainEventNode: (id: string, label: string, column: number, row: number) => void;
  /** Add a command node, optionally linked to an existing domain event. */
  addCommandNode: (id: string, label: string, column: number, row: number, linkedEventId?: string) => void;
  /** Add a read model node at the given grid position. */
  addReadModelNode: (id: string, label: string, column: number, row: number) => void;
  /** Add a policy node at the given grid position. */
  addPolicyNode: (id: string, label: string, column: number, row: number) => void;
  /** Add a UI screen node at the given grid position. */
  addUIScreenNode: (id: string, label: string, column: number, row: number) => void;
  /** Move an existing node to a new grid position (collision resolution applied). */
  moveNode: (id: string, column: number, row: number) => void;
  /** Update the label of an existing node. */
  updateLabel: (id: string, label: string) => void;
  /** Remove a node from the board. */
  removeNode: (id: string) => void;
  /** Add a directed, typed link between two nodes. */
  addLink: (sourceNodeId: string, targetNodeId: string, connectionType: ConnectionType) => void;
  /** Remove a link by its source and target node ids. */
  removeLink: (sourceNodeId: string, targetNodeId: string) => void;
  /** Export the current board as a JSON string conforming to the EventModel schema. */
  exportJSON: () => string;
  /** Export the current board as a Markdown string conforming to the event-modeling skill format. */
  exportMarkdown: () => string;
}

const addDomainEventNodeHandler = new AddDomainEventNodeCommandHandler();
const addCommandNodeHandler = new AddCommandNodeCommandHandler();
const addReadModelNodeHandler = new AddReadModelNodeCommandHandler();
const addPolicyNodeHandler = new AddPolicyNodeCommandHandler();
const addUIScreenNodeHandler = new AddUIScreenNodeCommandHandler();
const moveNodeHandler = new MoveNodeCommandHandler();
const updateLabelHandler = new UpdateNodeLabelCommandHandler();
const removeNodeHandler = new RemoveNodeCommandHandler();
const exportJSONHandler = new ExportJSONQueryHandler();
const exportMarkdownHandler = new ExportMarkdownQueryHandler();

const initialState = loadFromStorage();

export const useBoardStore = create<BoardStoreState & BoardActions>((set, get) => ({
  board: initialState.board,
  links: initialState.links,

  addDomainEventNode: (id, label, column, row) =>
    set((state) => {
      const board = addDomainEventNodeHandler.handle(state.board, new AddDomainEventNodeCommand(id, label, column, row));
      saveToStorage(board, state.links);
      return { board };
    }),

  addCommandNode: (id, label, column, row, linkedEventId) =>
    set((state) => {
      const board = addCommandNodeHandler.handle(state.board, new AddCommandNodeCommand(id, label, column, row, linkedEventId ?? ''));
      const links = linkedEventId
        ? [...state.links, { sourceNodeId: id, targetNodeId: linkedEventId, connectionType: 'triggers' as const }]
        : state.links;
      saveToStorage(board, links);
      return { board, links };
    }),

  addReadModelNode: (id, label, column, row) =>
    set((state) => {
      const board = addReadModelNodeHandler.handle(state.board, new AddReadModelNodeCommand(id, label, column, row));
      saveToStorage(board, state.links);
      return { board };
    }),

  addPolicyNode: (id, label, column, row) =>
    set((state) => {
      const board = addPolicyNodeHandler.handle(state.board, new AddPolicyNodeCommand(id, label, column, row));
      saveToStorage(board, state.links);
      return { board };
    }),

  addUIScreenNode: (id, label, column, row) =>
    set((state) => {
      const board = addUIScreenNodeHandler.handle(state.board, new AddUIScreenNodeCommand(id, label, column, row));
      saveToStorage(board, state.links);
      return { board };
    }),

  moveNode: (id, column, row) =>
    set((state) => {
      const board = moveNodeHandler.handle(state.board, new MoveNodeCommand(id, column, row));
      saveToStorage(board, state.links);
      return { board };
    }),

  updateLabel: (id, label) =>
    set((state) => {
      const board = updateLabelHandler.handle(state.board, new UpdateNodeLabelCommand(id, label));
      saveToStorage(board, state.links);
      return { board };
    }),

  removeNode: (id) =>
    set((state) => {
      const board = removeNodeHandler.handle(state.board, new RemoveNodeCommand(id));
      const links = state.links.filter((link) => link.sourceNodeId !== id && link.targetNodeId !== id);
      saveToStorage(board, links);
      return { board, links };
    }),

  addLink: (sourceNodeId, targetNodeId, connectionType) =>
    set((state) => {
      const alreadyExists = state.links.some(
        (link) => link.sourceNodeId === sourceNodeId && link.targetNodeId === targetNodeId
      );
      if (alreadyExists) return state;
      const links = [...state.links, { sourceNodeId, targetNodeId, connectionType }];
      saveToStorage(state.board, links);
      return { links };
    }),

  removeLink: (sourceNodeId, targetNodeId) =>
    set((state) => {
      const links = state.links.filter(
        (link) => !(link.sourceNodeId === sourceNodeId && link.targetNodeId === targetNodeId)
      );
      saveToStorage(state.board, links);
      return { links };
    }),

  exportJSON: () => {
    const { board, links } = get();
    return exportJSONHandler.handle(board, links, new ExportJSONQuery());
  },

  exportMarkdown: () => {
    const { board, links } = get();
    return exportMarkdownHandler.handle(board, links, new ExportMarkdownQuery());
  },
}));

export const useBoard = () => useBoardStore((state) => state.board);

export const useLinks = () => useBoardStore((state) => state.links);

export const useBoardActions = () =>
  useBoardStore(
    useShallow((state) => ({
      addDomainEventNode: state.addDomainEventNode,
      addCommandNode: state.addCommandNode,
      addReadModelNode: state.addReadModelNode,
      addPolicyNode: state.addPolicyNode,
      addUIScreenNode: state.addUIScreenNode,
      moveNode: state.moveNode,
      updateLabel: state.updateLabel,
      removeNode: state.removeNode,
      addLink: state.addLink,
      removeLink: state.removeLink,
      exportJSON: state.exportJSON,
      exportMarkdown: state.exportMarkdown,
    }))
  );
