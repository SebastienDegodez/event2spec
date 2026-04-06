import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { GridBoard } from '../domain/GridBoard';
import { type BoardProjection } from '../domain/BoardProjection';
import { DomainEventNode } from '../domain/DomainEventNode';
import { CommandNode } from '../domain/CommandNode';
import { ReadModelNode } from '../domain/ReadModelNode';
import { PolicyNode } from '../domain/PolicyNode';
import { UIScreenNode } from '../domain/UIScreenNode';
import { SwimlaneCollection } from '../domain/SwimlaneCollection';
import { type SwimlaneRepository } from '../domain/SwimlaneRepository';
import { type ActorType } from '../domain/ActorType';
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
import { AddSwimlaneCommand } from '../usecases/commands/AddSwimlane/AddSwimlaneCommand';
import { AddSwimlaneCommandHandler } from '../usecases/commands/AddSwimlane/AddSwimlaneCommandHandler';
import { RemoveSwimlaneCommand } from '../usecases/commands/RemoveSwimlane/RemoveSwimlaneCommand';
import { RemoveSwimlaneCommandHandler } from '../usecases/commands/RemoveSwimlane/RemoveSwimlaneCommandHandler';
import { RenameSwimlaneCommand } from '../usecases/commands/RenameSwimlane/RenameSwimlaneCommand';
import { RenameSwimlaneCommandHandler } from '../usecases/commands/RenameSwimlane/RenameSwimlaneCommandHandler';
import { ReorderSwimlanesCommand } from '../usecases/commands/ReorderSwimlanes/ReorderSwimlanesCommand';
import { ReorderSwimlanesCommandHandler } from '../usecases/commands/ReorderSwimlanes/ReorderSwimlanesCommandHandler';
import { ChangeSwimlaneActorTypeCommand } from '../usecases/commands/ChangeSwimlaneActorType/ChangeSwimlaneActorTypeCommand';
import { ChangeSwimlaneActorTypeCommandHandler } from '../usecases/commands/ChangeSwimlaneActorType/ChangeSwimlaneActorTypeCommandHandler';
import { ExportJSONQuery } from '../usecases/queries/ExportJSON/ExportJSONQuery';
import { ExportJSONQueryHandler } from '../usecases/queries/ExportJSON/ExportJSONQueryHandler';
import { ExportMarkdownQuery } from '../usecases/queries/ExportMarkdown/ExportMarkdownQuery';
import { ExportMarkdownQueryHandler } from '../usecases/queries/ExportMarkdown/ExportMarkdownQueryHandler';
import { type NodeLink } from '../domain/NodeLink';
import { type ConnectionType } from '../domain/ConnectionType';
import { Swimlane } from '../domain/Swimlane';

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

/** Serialisable representation of a swimlane for localStorage persistence. */
interface PersistedSwimlane {
  id: string;
  actorName: string;
  actorType: ActorType;
}

/** Shape of the data persisted in localStorage. */
interface PersistedState {
  nodes: PersistedNode[];
  links: NodeLink[];
  swimlanes?: PersistedSwimlane[];
}

const STORAGE_KEY = 'event2spec-board';

function loadFromStorage(): { board: GridBoard; links: ReadonlyArray<NodeLink>; swimlanes: SwimlaneCollection } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { board: GridBoard.empty(), links: [], swimlanes: SwimlaneCollection.empty() };
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
    let swimlanes = SwimlaneCollection.empty();
    for (const s of parsed.swimlanes ?? []) {
      swimlanes = swimlanes.add(Swimlane.create(s.id, s.actorName, s.actorType));
    }
    return { board, links, swimlanes };
  } catch {
    return { board: GridBoard.empty(), links: [], swimlanes: SwimlaneCollection.empty() };
  }
}

function saveToStorage(board: GridBoard, links: ReadonlyArray<NodeLink>, swimlanes: SwimlaneCollection): void {
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
  const persistedSwimlanes: PersistedSwimlane[] = [];
  swimlanes.describeTo({
    onSwimlane(id, actorName, actorType) {
      persistedSwimlanes.push({ id, actorName, actorType });
    },
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ nodes, links, swimlanes: persistedSwimlanes }));
}

interface BoardStoreState {
  board: GridBoard;
  links: ReadonlyArray<NodeLink>;
  swimlanes: SwimlaneCollection;
}

interface BoardActions {
  /** Add a new domain event node at the given grid position. */
  addDomainEventNode: (id: string, label: string, column: number, row: number) => void;
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
  /** Add a directed, typed link between two nodes. */
  addLink: (sourceNodeId: string, targetNodeId: string, connectionType: ConnectionType) => void;
  /** Remove a link by its source and target node ids. */
  removeLink: (sourceNodeId: string, targetNodeId: string) => void;
  /** Add a new swimlane. */
  addSwimlane: (id: string, actorName: string, actorType: ActorType) => void;
  /** Remove a swimlane by id. */
  removeSwimlane: (id: string) => void;
  /** Rename a swimlane. */
  renameSwimlane: (id: string, actorName: string) => void;
  /** Reorder a swimlane to a target index. */
  reorderSwimlanes: (id: string, targetIndex: number) => void;
  /** Change the actor type of a swimlane. */
  changeSwimlaneActorType: (id: string, actorType: ActorType) => void;
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

export const useBoardStore = create<BoardStoreState & BoardActions>((set, get) => {
  const swimlaneRepository: SwimlaneRepository = {
    load: () => get().swimlanes,
    save: (swimlanes) => {
      const { board, links } = get();
      saveToStorage(board, links, swimlanes);
      set({ swimlanes });
    },
  };

  const addSwimlaneHandler = new AddSwimlaneCommandHandler(swimlaneRepository);
  const removeSwimlaneHandler = new RemoveSwimlaneCommandHandler(swimlaneRepository);
  const renameSwimlaneHandler = new RenameSwimlaneCommandHandler(swimlaneRepository);
  const reorderSwimlanesHandler = new ReorderSwimlanesCommandHandler(swimlaneRepository);
  const changeSwimlaneActorTypeHandler = new ChangeSwimlaneActorTypeCommandHandler(swimlaneRepository);

  return {
    board: initialState.board,
    links: initialState.links,
    swimlanes: initialState.swimlanes,

    addDomainEventNode: (id, label, column, row) =>
      set((state) => {
        const board = addDomainEventNodeHandler.handle(state.board, new AddDomainEventNodeCommand(id, label, column, row));
        saveToStorage(board, state.links, state.swimlanes);
        return { board };
      }),

    addCommandNode: (id, label, column, row, linkedEventId) =>
      set((state) => {
        const board = addCommandNodeHandler.handle(state.board, new AddCommandNodeCommand(id, label, column, row, linkedEventId));
        const links = [...state.links, { sourceNodeId: id, targetNodeId: linkedEventId, connectionType: 'triggers' as const }];
        saveToStorage(board, links, state.swimlanes);
        return { board, links };
      }),

    addReadModelNode: (id, label, column, row) =>
      set((state) => {
        const board = addReadModelNodeHandler.handle(state.board, new AddReadModelNodeCommand(id, label, column, row));
        saveToStorage(board, state.links, state.swimlanes);
        return { board };
      }),

    addPolicyNode: (id, label, column, row) =>
      set((state) => {
        const board = addPolicyNodeHandler.handle(state.board, new AddPolicyNodeCommand(id, label, column, row));
        saveToStorage(board, state.links, state.swimlanes);
        return { board };
      }),

    addUIScreenNode: (id, label, column, row) =>
      set((state) => {
        const board = addUIScreenNodeHandler.handle(state.board, new AddUIScreenNodeCommand(id, label, column, row));
        saveToStorage(board, state.links, state.swimlanes);
        return { board };
      }),

    moveNode: (id, column, row) =>
      set((state) => {
        const board = moveNodeHandler.handle(state.board, new MoveNodeCommand(id, column, row));
        saveToStorage(board, state.links, state.swimlanes);
        return { board };
      }),

    updateLabel: (id, label) =>
      set((state) => {
        const board = updateLabelHandler.handle(state.board, new UpdateNodeLabelCommand(id, label));
        saveToStorage(board, state.links, state.swimlanes);
        return { board };
      }),

    removeNode: (id) =>
      set((state) => {
        const board = removeNodeHandler.handle(state.board, new RemoveNodeCommand(id));
        const links = state.links.filter((link) => link.sourceNodeId !== id && link.targetNodeId !== id);
        saveToStorage(board, links, state.swimlanes);
        return { board, links };
      }),

    addLink: (sourceNodeId, targetNodeId, connectionType) =>
      set((state) => {
        const alreadyExists = state.links.some(
          (link) => link.sourceNodeId === sourceNodeId && link.targetNodeId === targetNodeId
        );
        if (alreadyExists) return state;
        const links = [...state.links, { sourceNodeId, targetNodeId, connectionType }];
        saveToStorage(state.board, links, state.swimlanes);
        return { links };
      }),

    removeLink: (sourceNodeId, targetNodeId) =>
      set((state) => {
        const links = state.links.filter(
          (link) => !(link.sourceNodeId === sourceNodeId && link.targetNodeId === targetNodeId)
        );
        saveToStorage(state.board, links, state.swimlanes);
        return { links };
      }),

    addSwimlane: (id, actorName, actorType) => {
      addSwimlaneHandler.handle(new AddSwimlaneCommand(id, actorName, actorType));
    },

    removeSwimlane: (id) => {
      removeSwimlaneHandler.handle(new RemoveSwimlaneCommand(id));
    },

    renameSwimlane: (id, actorName) => {
      renameSwimlaneHandler.handle(new RenameSwimlaneCommand(id, actorName));
    },

    reorderSwimlanes: (id, targetIndex) => {
      reorderSwimlanesHandler.handle(new ReorderSwimlanesCommand(id, targetIndex));
    },

    changeSwimlaneActorType: (id, actorType) => {
      changeSwimlaneActorTypeHandler.handle(new ChangeSwimlaneActorTypeCommand(id, actorType));
    },

    exportJSON: () => {
      const { board, links, swimlanes } = get();
      return exportJSONHandler.handle(board, links, swimlanes, new ExportJSONQuery());
    },

    exportMarkdown: () => {
      const { board, links } = get();
      return exportMarkdownHandler.handle(board, links, new ExportMarkdownQuery());
    },
  };
});

export const useBoard = () => useBoardStore((state) => state.board);

export const useLinks = () => useBoardStore((state) => state.links);

export const useSwimlanes = () => useBoardStore((state) => state.swimlanes);

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

export const useSwimlaneActions = () =>
  useBoardStore(
    useShallow((state) => ({
      addSwimlane: state.addSwimlane,
      removeSwimlane: state.removeSwimlane,
      renameSwimlane: state.renameSwimlane,
      reorderSwimlanes: state.reorderSwimlanes,
      changeSwimlaneActorType: state.changeSwimlaneActorType,
    }))
  );
