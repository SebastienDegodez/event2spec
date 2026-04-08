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
import { type NodeKind } from '../domain/NodeKind';
import { type NodeProperties, createDefaultNodeProperties } from '../domain/NodeProperties';
import { type BoardMode } from '../domain/BoardMode';
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
import { CreateSliceCommand } from '../usecases/commands/CreateSlice/CreateSliceCommand';
import { CreateSliceCommandHandler } from '../usecases/commands/CreateSlice/CreateSliceCommandHandler';
import { RenameSliceCommand } from '../usecases/commands/RenameSlice/RenameSliceCommand';
import { RenameSliceCommandHandler } from '../usecases/commands/RenameSlice/RenameSliceCommandHandler';
import { DeleteSliceCommand } from '../usecases/commands/DeleteSlice/DeleteSliceCommand';
import { DeleteSliceCommandHandler } from '../usecases/commands/DeleteSlice/DeleteSliceCommandHandler';
import { AddScenarioToSliceCommand } from '../usecases/commands/AddScenarioToSlice/AddScenarioToSliceCommand';
import { AddScenarioToSliceCommandHandler } from '../usecases/commands/AddScenarioToSlice/AddScenarioToSliceCommandHandler';
import { RemoveScenarioFromSliceCommand } from '../usecases/commands/RemoveScenarioFromSlice/RemoveScenarioFromSliceCommand';
import { RemoveScenarioFromSliceCommandHandler } from '../usecases/commands/RemoveScenarioFromSlice/RemoveScenarioFromSliceCommandHandler';
import { UpdateScenarioInSliceCommand } from '../usecases/commands/UpdateScenarioInSlice/UpdateScenarioInSliceCommand';
import { UpdateScenarioInSliceCommandHandler } from '../usecases/commands/UpdateScenarioInSlice/UpdateScenarioInSliceCommandHandler';
import { ExportJSONQuery } from '../usecases/queries/ExportJSON/ExportJSONQuery';
import { ExportJSONQueryHandler } from '../usecases/queries/ExportJSON/ExportJSONQueryHandler';
import { ExportMarkdownQuery } from '../usecases/queries/ExportMarkdown/ExportMarkdownQuery';
import { ExportMarkdownQueryHandler } from '../usecases/queries/ExportMarkdown/ExportMarkdownQueryHandler';
import { type NodeLink } from '../domain/NodeLink';
import { type ConnectionType } from '../domain/ConnectionType';
import { Swimlane } from '../domain/Swimlane';
import { VerticalSliceCollection } from '../domain/VerticalSliceCollection';
import { type VerticalSliceRepository } from '../domain/VerticalSliceRepository';
import { VerticalSlice } from '../domain/VerticalSlice';
import { Scenario } from '../domain/Scenario';
import { resolveAutoLinks, type BoardNodeSummary } from '../domain/resolveAutoLinks';

export type { NodeLink };
export type { ConnectionType };
export type { NodeProperties };
export type { BoardMode };

/** Information about the currently selected node. */
export interface SelectedNode {
  id: string;
  type: NodeKind;
  label: string;
}

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
}

/** Shape of the data persisted in localStorage. */
interface PersistedState {
  nodes: PersistedNode[];
  links: NodeLink[];
  swimlanes?: PersistedSwimlane[];
  slices?: PersistedSlice[];
  nodeProperties?: Record<string, NodeProperties>;
  boardMode?: BoardMode;
}

const STORAGE_KEY = 'event2spec-board';

function loadFromStorage(): { board: GridBoard; links: ReadonlyArray<NodeLink>; swimlanes: SwimlaneCollection; slices: VerticalSliceCollection; nodeProperties: Record<string, NodeProperties>; boardMode: BoardMode } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { board: GridBoard.empty(), links: [], swimlanes: SwimlaneCollection.empty(), slices: VerticalSliceCollection.empty(), nodeProperties: {}, boardMode: 'classic' };
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
    let slices = VerticalSliceCollection.empty();
    for (const ps of parsed.slices ?? []) {
      let slice = VerticalSlice.create(ps.id, ps.name, ps.commandId, ps.eventIds, ps.readModelId);
      for (const sc of ps.scenarios) {
        slice = slice.addScenario(Scenario.create(sc.given, sc.when, sc.then));
      }
      slices = slices.add(slice);
    }
    return { board, links, swimlanes, slices, nodeProperties: parsed.nodeProperties ?? {}, boardMode: parsed.boardMode ?? 'classic' };
  } catch {
    return { board: GridBoard.empty(), links: [], swimlanes: SwimlaneCollection.empty(), slices: VerticalSliceCollection.empty(), nodeProperties: {}, boardMode: 'classic' };
  }
}

function saveToStorage(board: GridBoard, links: ReadonlyArray<NodeLink>, swimlanes: SwimlaneCollection, slices: VerticalSliceCollection, nodeProperties: Record<string, NodeProperties>, boardMode: BoardMode): void {
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
  const persistedSlices: PersistedSlice[] = [];
  slices.describeTo({
    onSlice(id, name, commandId, eventIds, readModelId, scenarios) {
      persistedSlices.push({
        id,
        name,
        commandId,
        eventIds: [...eventIds],
        readModelId,
        scenarios: scenarios.map((s) => ({ given: [...s.given], when: s.when, then: [...s.then] })),
      });
    },
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ nodes, links, swimlanes: persistedSwimlanes, slices: persistedSlices, nodeProperties, boardMode }));
}

/** Collects all board nodes as summaries for auto-link resolution. */
function collectBoardNodeSummaries(board: GridBoard): BoardNodeSummary[] {
  const summaries: BoardNodeSummary[] = [];
  const projection: BoardProjection = {
    onDomainEventNode(id, _label, column, row) { summaries.push({ id, kind: 'domainEvent', column, row }); },
    onCommandNode(id, _label, column, row) { summaries.push({ id, kind: 'command', column, row }); },
    onReadModelNode(id, _label, column, row) { summaries.push({ id, kind: 'readModel', column, row }); },
    onPolicyNode(id, _label, column, row) { summaries.push({ id, kind: 'policy', column, row }); },
    onUIScreenNode(id, _label, column, row) { summaries.push({ id, kind: 'uiScreen', column, row }); },
  };
  board.describeTo(projection);
  return summaries;
}

interface BoardStoreState {
  board: GridBoard;
  links: ReadonlyArray<NodeLink>;
  swimlanes: SwimlaneCollection;
  slices: VerticalSliceCollection;
  selectedNode: SelectedNode | null;
  nodeProperties: Record<string, NodeProperties>;
  selectedColumns: number[];
  boardMode: BoardMode;
  /** When set, the node component with this id should enter editing mode immediately. */
  autoEditNodeId: string | null;
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
  /** Select a node by id, type and label (opens properties panel). */
  selectNode: (id: string, type: NodeKind, label: string) => void;
  /** Deselect the currently selected node (closes properties panel). */
  deselectNode: () => void;
  /** Update the properties of a node. */
  updateNodeProperties: (id: string, properties: NodeProperties) => void;
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
  /** Create a new vertical slice. */
  createSlice: (id: string, name: string, commandId: string, eventIds: string[], readModelId: string) => void;
  /** Rename a vertical slice. */
  renameSlice: (id: string, name: string) => void;
  /** Delete a vertical slice. */
  deleteSlice: (id: string) => void;
  /** Add a scenario (Given/When/Then) to a slice. */
  addScenarioToSlice: (sliceId: string, given: string[], when: string, then: string[]) => void;
  /** Remove a scenario from a slice by index. */
  removeScenarioFromSlice: (sliceId: string, scenarioIndex: number) => void;
  /** Update an existing scenario in a slice by index. */
  updateScenarioInSlice: (sliceId: string, scenarioIndex: number, given: string[], when: string, then: string[]) => void;
  /** Set the currently selected columns (for slice creation). */
  selectColumns: (columns: number[]) => void;
  /** Clear the column selection. */
  clearColumnSelection: () => void;
  /** Switch the board display mode (classic or swimlane). */
  setBoardMode: (mode: BoardMode) => void;
  /** Add a node at a grid position and automatically create links with adjacent nodes. */
  addNodeWithAutoLinks: (id: string, kind: NodeKind, label: string, column: number, row: number) => void;
  /** Clear the auto-edit node id (after a node has entered editing mode). */
  clearAutoEditNodeId: () => void;
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
      const { board, links, slices, nodeProperties, boardMode } = get();
      saveToStorage(board, links, swimlanes, slices, nodeProperties, boardMode);
      set({ swimlanes });
    },
  };

  const addSwimlaneHandler = new AddSwimlaneCommandHandler(swimlaneRepository);
  const removeSwimlaneHandler = new RemoveSwimlaneCommandHandler(swimlaneRepository);
  const renameSwimlaneHandler = new RenameSwimlaneCommandHandler(swimlaneRepository);
  const reorderSwimlanesHandler = new ReorderSwimlanesCommandHandler(swimlaneRepository);
  const changeSwimlaneActorTypeHandler = new ChangeSwimlaneActorTypeCommandHandler(swimlaneRepository);

  const sliceRepository: VerticalSliceRepository = {
    load: () => get().slices,
    save: (slices) => {
      const { board, links, swimlanes, nodeProperties, boardMode } = get();
      saveToStorage(board, links, swimlanes, slices, nodeProperties, boardMode);
      set({ slices });
    },
  };

  const createSliceHandler = new CreateSliceCommandHandler(sliceRepository);
  const renameSliceHandler = new RenameSliceCommandHandler(sliceRepository);
  const deleteSliceHandler = new DeleteSliceCommandHandler(sliceRepository);
  const addScenarioToSliceHandler = new AddScenarioToSliceCommandHandler(sliceRepository);
  const removeScenarioFromSliceHandler = new RemoveScenarioFromSliceCommandHandler(sliceRepository);
  const updateScenarioInSliceHandler = new UpdateScenarioInSliceCommandHandler(sliceRepository);

  return {
    board: initialState.board,
    links: initialState.links,
    swimlanes: initialState.swimlanes,
    slices: initialState.slices,
    selectedNode: null,
    nodeProperties: initialState.nodeProperties,
    selectedColumns: [],
    boardMode: initialState.boardMode,
    autoEditNodeId: null,

    addDomainEventNode: (id, label, column, row) =>
      set((state) => {
        const board = addDomainEventNodeHandler.handle(state.board, new AddDomainEventNodeCommand(id, label, column, row));
        const nodeProperties = { ...state.nodeProperties, [id]: createDefaultNodeProperties('domainEvent') };
        saveToStorage(board, state.links, state.swimlanes, state.slices, nodeProperties, state.boardMode);
        return { board, nodeProperties };
      }),

    addCommandNode: (id, label, column, row, linkedEventId) =>
      set((state) => {
        const board = addCommandNodeHandler.handle(state.board, new AddCommandNodeCommand(id, label, column, row, linkedEventId ?? ''));
        const links = linkedEventId
          ? [...state.links, { sourceNodeId: id, targetNodeId: linkedEventId, connectionType: 'triggers' as const }]
          : state.links;
        const nodeProperties = { ...state.nodeProperties, [id]: createDefaultNodeProperties('command') };
        saveToStorage(board, links, state.swimlanes, state.slices, nodeProperties, state.boardMode);
        return { board, links, nodeProperties };
      }),

    addReadModelNode: (id, label, column, row) =>
      set((state) => {
        const board = addReadModelNodeHandler.handle(state.board, new AddReadModelNodeCommand(id, label, column, row));
        const nodeProperties = { ...state.nodeProperties, [id]: createDefaultNodeProperties('readModel') };
        saveToStorage(board, state.links, state.swimlanes, state.slices, nodeProperties, state.boardMode);
        return { board, nodeProperties };
      }),

    addPolicyNode: (id, label, column, row) =>
      set((state) => {
        const board = addPolicyNodeHandler.handle(state.board, new AddPolicyNodeCommand(id, label, column, row));
        const nodeProperties = { ...state.nodeProperties, [id]: createDefaultNodeProperties('policy') };
        saveToStorage(board, state.links, state.swimlanes, state.slices, nodeProperties, state.boardMode);
        return { board, nodeProperties };
      }),

    addUIScreenNode: (id, label, column, row) =>
      set((state) => {
        const board = addUIScreenNodeHandler.handle(state.board, new AddUIScreenNodeCommand(id, label, column, row));
        const nodeProperties = { ...state.nodeProperties, [id]: createDefaultNodeProperties('uiScreen') };
        saveToStorage(board, state.links, state.swimlanes, state.slices, nodeProperties, state.boardMode);
        return { board, nodeProperties };
      }),

    moveNode: (id, column, row) =>
      set((state) => {
        const board = moveNodeHandler.handle(state.board, new MoveNodeCommand(id, column, row));
        saveToStorage(board, state.links, state.swimlanes, state.slices, state.nodeProperties, state.boardMode);
        return { board };
      }),

    updateLabel: (id, label) =>
      set((state) => {
        const board = updateLabelHandler.handle(state.board, new UpdateNodeLabelCommand(id, label));
        saveToStorage(board, state.links, state.swimlanes, state.slices, state.nodeProperties, state.boardMode);
        const selectedNode = state.selectedNode?.id === id ? { ...state.selectedNode, label } : state.selectedNode;
        return { board, selectedNode };
      }),

    removeNode: (id) =>
      set((state) => {
        const board = removeNodeHandler.handle(state.board, new RemoveNodeCommand(id));
        const links = state.links.filter((link) => link.sourceNodeId !== id && link.targetNodeId !== id);
        const { [id]: _, ...nodeProperties } = state.nodeProperties;
        void _;
        saveToStorage(board, links, state.swimlanes, state.slices, nodeProperties, state.boardMode);
        const selectedNode = state.selectedNode?.id === id ? null : state.selectedNode;
        return { board, links, nodeProperties, selectedNode };
      }),

    addLink: (sourceNodeId, targetNodeId, connectionType) =>
      set((state) => {
        const alreadyExists = state.links.some(
          (link) => link.sourceNodeId === sourceNodeId && link.targetNodeId === targetNodeId
        );
        if (alreadyExists) return state;
        const links = [...state.links, { sourceNodeId, targetNodeId, connectionType }];
        saveToStorage(state.board, links, state.swimlanes, state.slices, state.nodeProperties, state.boardMode);
        return { links };
      }),

    removeLink: (sourceNodeId, targetNodeId) =>
      set((state) => {
        const links = state.links.filter(
          (link) => !(link.sourceNodeId === sourceNodeId && link.targetNodeId === targetNodeId)
        );
        saveToStorage(state.board, links, state.swimlanes, state.slices, state.nodeProperties, state.boardMode);
        return { links };
      }),

    selectNode: (id, type, label) =>
      set({ selectedNode: { id, type, label } }),

    deselectNode: () =>
      set({ selectedNode: null }),

    updateNodeProperties: (id, properties) =>
      set((state) => {
        const nodeProperties = { ...state.nodeProperties, [id]: properties };
        saveToStorage(state.board, state.links, state.swimlanes, state.slices, nodeProperties, state.boardMode);
        return { nodeProperties };
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

    createSlice: (id, name, commandId, eventIds, readModelId) => {
      createSliceHandler.handle(new CreateSliceCommand(id, name, commandId, eventIds, readModelId));
    },

    renameSlice: (id, name) => {
      renameSliceHandler.handle(new RenameSliceCommand(id, name));
    },

    deleteSlice: (id) => {
      deleteSliceHandler.handle(new DeleteSliceCommand(id));
    },

    addScenarioToSlice: (sliceId, given, when, then) => {
      addScenarioToSliceHandler.handle(new AddScenarioToSliceCommand(sliceId, given, when, then));
    },

    removeScenarioFromSlice: (sliceId, scenarioIndex) => {
      removeScenarioFromSliceHandler.handle(new RemoveScenarioFromSliceCommand(sliceId, scenarioIndex));
    },

    updateScenarioInSlice: (sliceId, scenarioIndex, given, when, then) => {
      updateScenarioInSliceHandler.handle(new UpdateScenarioInSliceCommand(sliceId, scenarioIndex, given, when, then));
    },

    selectColumns: (columns) => set({ selectedColumns: columns }),

    clearColumnSelection: () => set({ selectedColumns: [] }),

    setBoardMode: (mode) =>
      set((state) => {
        saveToStorage(state.board, state.links, state.swimlanes, state.slices, state.nodeProperties, mode);
        return { boardMode: mode };
      }),

    addNodeWithAutoLinks: (id, kind, label, column, row) =>
      set((state) => {
        let board = state.board;
        if (kind === 'domainEvent') {
          board = addDomainEventNodeHandler.handle(board, new AddDomainEventNodeCommand(id, label, column, row));
        } else if (kind === 'command') {
          board = addCommandNodeHandler.handle(board, new AddCommandNodeCommand(id, label, column, row, ''));
        } else if (kind === 'readModel') {
          board = addReadModelNodeHandler.handle(board, new AddReadModelNodeCommand(id, label, column, row));
        } else if (kind === 'policy') {
          board = addPolicyNodeHandler.handle(board, new AddPolicyNodeCommand(id, label, column, row));
        } else if (kind === 'uiScreen') {
          board = addUIScreenNodeHandler.handle(board, new AddUIScreenNodeCommand(id, label, column, row));
        }
        // Resolve auto-links using the updated board (after insertion and collision shifts)
        const existingNodes = collectBoardNodeSummaries(board);
        const autoLinks = resolveAutoLinks(id, kind, column, row, existingNodes);
        const newLinks: NodeLink[] = autoLinks.map((al) => ({
          sourceNodeId: al.sourceNodeId,
          targetNodeId: al.targetNodeId,
          connectionType: al.connectionType,
        }));
        const links = [...state.links, ...newLinks];
        const nodeProperties = { ...state.nodeProperties, [id]: createDefaultNodeProperties(kind) };
        saveToStorage(board, links, state.swimlanes, state.slices, nodeProperties, state.boardMode);
        return { board, links, nodeProperties, autoEditNodeId: id };
      }),

    clearAutoEditNodeId: () => set({ autoEditNodeId: null }),

    exportJSON: () => {
      const { board, links, swimlanes, slices, nodeProperties } = get();
      return exportJSONHandler.handle(board, links, swimlanes, slices, nodeProperties, new ExportJSONQuery());
    },

    exportMarkdown: () => {
      const { board, links, slices } = get();
      return exportMarkdownHandler.handle(board, links, slices, new ExportMarkdownQuery());
    },
  };
});

export const useBoard = () => useBoardStore((state) => state.board);

export const useLinks = () => useBoardStore((state) => state.links);

export const useSwimlanes = () => useBoardStore((state) => state.swimlanes);

export const useSlices = () => useBoardStore((state) => state.slices);

export const useSelectedNode = () => useBoardStore((state) => state.selectedNode);

export const useNodeProperties = () => useBoardStore((state) => state.nodeProperties);

export const useBoardMode = () => useBoardStore((state) => state.boardMode);

export const useAutoEditNodeId = () => useBoardStore((state) => state.autoEditNodeId);

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
      selectNode: state.selectNode,
      deselectNode: state.deselectNode,
      updateNodeProperties: state.updateNodeProperties,
      exportJSON: state.exportJSON,
      exportMarkdown: state.exportMarkdown,
      setBoardMode: state.setBoardMode,
      addNodeWithAutoLinks: state.addNodeWithAutoLinks,
      clearAutoEditNodeId: state.clearAutoEditNodeId,
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

export const useSliceActions = () =>
  useBoardStore(
    useShallow((state) => ({
      createSlice: state.createSlice,
      renameSlice: state.renameSlice,
      deleteSlice: state.deleteSlice,
      addScenarioToSlice: state.addScenarioToSlice,
      removeScenarioFromSlice: state.removeScenarioFromSlice,
      updateScenarioInSlice: state.updateScenarioInSlice,
    }))
  );

export const useSelectedColumns = () => useBoardStore((state) => state.selectedColumns);

export const useColumnSelectionActions = () =>
  useBoardStore(
    useShallow((state) => ({
      selectColumns: state.selectColumns,
      clearColumnSelection: state.clearColumnSelection,
    }))
  );
