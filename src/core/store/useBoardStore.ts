import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { GridBoard } from '../domain/GridBoard';
import { DomainEventNode } from '../domain/DomainEventNode';
import { CommandNode } from '../domain/CommandNode';
import { ReadModelNode } from '../domain/ReadModelNode';
import { PolicyNode } from '../domain/PolicyNode';
import { UIScreenNode } from '../domain/UIScreenNode';
import { AddNodeCommand } from '../usecases/commands/AddNode/AddNodeCommand';
import { AddNodeCommandHandler } from '../usecases/commands/AddNode/AddNodeCommandHandler';
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

/** A directed link from a command node to the domain event it triggers. */
export interface NodeLink {
  commandNodeId: string;
  eventNodeId: string;
}

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
    const { nodes, links } = JSON.parse(raw) as PersistedState;
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
    return { board, links };
  } catch {
    return { board: GridBoard.empty(), links: [] };
  }
}

function saveToStorage(board: GridBoard, links: ReadonlyArray<NodeLink>): void {
  const nodes: PersistedNode[] = board.toArray().map((node) => {
    const pos = node.gridPosition();
    if (node instanceof CommandNode) {
      return { id: node.id, label: node.label, column: pos.column, row: pos.row, type: 'command' };
    }
    if (node instanceof ReadModelNode) {
      return { id: node.id, label: node.label, column: pos.column, row: pos.row, type: 'readModel' };
    }
    if (node instanceof PolicyNode) {
      return { id: node.id, label: node.label, column: pos.column, row: pos.row, type: 'policy' };
    }
    if (node instanceof UIScreenNode) {
      return { id: node.id, label: node.label, column: pos.column, row: pos.row, type: 'uiScreen' };
    }
    return { id: node.id, label: node.label, column: pos.column, row: pos.row, type: 'domainEvent' };
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ nodes, links }));
}

interface BoardStoreState {
  board: GridBoard;
  links: ReadonlyArray<NodeLink>;
}

interface BoardActions {
  /** Add a new domain event node at the given grid position. */
  addNode: (id: string, label: string, column: number, row: number) => void;
  /** Add a command node linked to an existing domain event. */
  addCommandNode: (id: string, label: string, column: number, row: number, linkedEventId: string) => void;
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
  /** Export the current board as a JSON string conforming to the EventModel schema. */
  exportJSON: () => string;
  /** Export the current board as a Markdown string conforming to the event-modeling skill format. */
  exportMarkdown: () => string;
}

const addNodeHandler = new AddNodeCommandHandler();
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

  addNode: (id, label, column, row) =>
    set((state) => {
      const board = addNodeHandler.handle(state.board, new AddNodeCommand(id, label, column, row));
      saveToStorage(board, state.links);
      return { board };
    }),

  addCommandNode: (id, label, column, row, linkedEventId) =>
    set((state) => {
      const board = addCommandNodeHandler.handle(state.board, new AddCommandNodeCommand(id, label, column, row, linkedEventId));
      const links = [...state.links, { commandNodeId: id, eventNodeId: linkedEventId }];
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
      const links = state.links.filter((link) => link.commandNodeId !== id && link.eventNodeId !== id);
      saveToStorage(board, links);
      return { board, links };
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
      addNode: state.addNode,
      addCommandNode: state.addCommandNode,
      addReadModelNode: state.addReadModelNode,
      addPolicyNode: state.addPolicyNode,
      addUIScreenNode: state.addUIScreenNode,
      moveNode: state.moveNode,
      updateLabel: state.updateLabel,
      removeNode: state.removeNode,
      exportJSON: state.exportJSON,
      exportMarkdown: state.exportMarkdown,
    }))
  );
