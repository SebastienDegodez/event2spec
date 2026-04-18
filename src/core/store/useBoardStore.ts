import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { GridBoard } from '../domain/board/GridBoard';
import { type BoardProjection } from '../domain/board/BoardProjection';
import { type GridBoardRepository } from '../domain/board/GridBoardRepository';
import { type NodeKind } from '../domain/node/NodeKind';
import { type NodeProperties, createDefaultNodeProperties } from '../domain/node/NodeProperties';
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
import { CreateSliceCommand } from '../usecases/commands/CreateSlice/CreateSliceCommand';
import { CreateSliceCommandHandler } from '../usecases/commands/CreateSlice/CreateSliceCommandHandler';
import { ExtendSliceRightCommand } from '../usecases/commands/ExtendSliceRight/ExtendSliceRightCommand';
import { ExtendSliceRightCommandHandler } from '../usecases/commands/ExtendSliceRight/ExtendSliceRightCommandHandler';
import { RenameSliceCommand } from '../usecases/commands/RenameSlice/RenameSliceCommand';
import { RenameSliceCommandHandler } from '../usecases/commands/RenameSlice/RenameSliceCommandHandler';
import { CreateBoundedContextCommand } from '../usecases/commands/CreateBoundedContext/CreateBoundedContextCommand';
import { CreateBoundedContextCommandHandler } from '../usecases/commands/CreateBoundedContext/CreateBoundedContextCommandHandler';
import { DeleteBoundedContextCommand } from '../usecases/commands/DeleteBoundedContext/DeleteBoundedContextCommand';
import { DeleteBoundedContextCommandHandler } from '../usecases/commands/DeleteBoundedContext/DeleteBoundedContextCommandHandler';
import { RenameBoundedContextCommand } from '../usecases/commands/RenameBoundedContext/RenameBoundedContextCommand';
import { RenameBoundedContextCommandHandler } from '../usecases/commands/RenameBoundedContext/RenameBoundedContextCommandHandler';
import { AssignSliceToBoundedContextCommand } from '../usecases/commands/AssignSliceToBoundedContext/AssignSliceToBoundedContextCommand';
import { AssignSliceToBoundedContextCommandHandler } from '../usecases/commands/AssignSliceToBoundedContext/AssignSliceToBoundedContextCommandHandler';
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
import { type NodeLink } from '../domain/node/NodeLink';
import { type ConnectionType } from '../domain/ConnectionType';
import { VerticalSliceCollection } from '../domain/vertical-slice/VerticalSliceCollection';
import { type VerticalSliceRepository } from '../domain/VerticalSliceRepository';
import { BoundedContextCollection } from '../domain/bounded-context/BoundedContextCollection';
import { type BoundedContextRepository } from '../domain/bounded-context/BoundedContextRepository';
import { resolveAutoLinks } from '../domain/resolveAutoLinks';
import { collectBoardNodeSummaries } from '../domain/board/collectBoardNodeSummaries';
import { loadFromStorage, saveToStorage } from './boardPersistence';

export type { NodeLink };
export type { ConnectionType };
export type { NodeProperties };

/** Information about the currently selected node. */
export interface SelectedNode {
  id: string;
  type: NodeKind;
  label: string;
}

function createBoardRepository(initialBoard: GridBoard) {
  let board = initialBoard;
  const repository: GridBoardRepository = {
    load: () => board,
    save: (nextBoard) => { board = nextBoard; },
  };
  return { repository, getBoard: () => board };
}

interface BoardStoreState {
  board: GridBoard;
  links: ReadonlyArray<NodeLink>;
  slices: VerticalSliceCollection;
  boundedContexts: BoundedContextCollection;
  selectedNode: SelectedNode | null;
  nodeProperties: Record<string, NodeProperties>;
  selectedSliceRange: { startColumn: number; columnCount: number } | null;
  activeSliceInspectorId: string | null;
  activeSliceInspectorMode: 'details' | 'scenarios' | null;
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
  /** Create a new vertical slice. */
  createSlice: (id: string, name: string, commandId: string, eventIds: string[], readModelId: string, startColumn?: number, columnCount?: number) => void;
  /** Rename a vertical slice. */
  renameSlice: (id: string, name: string) => void;
  /** Delete a vertical slice. */
  deleteSlice: (id: string) => void;
  /** Open the slice inspector. */
  openSliceInspector: (sliceId: string, mode?: 'details' | 'scenarios') => void;
  /** Close the slice inspector. */
  closeSliceInspector: () => void;
  /** Extend an existing slice by one column to the right. */
  extendSliceRight: (sliceId: string) => void;
  /** Add a scenario (Given/When/Then) to a slice. */
  addScenarioToSlice: (sliceId: string, given: string[], when: string, then: string[]) => void;
  /** Remove a scenario from a slice by index. */
  removeScenarioFromSlice: (sliceId: string, scenarioIndex: number) => void;
  /** Update an existing scenario in a slice by index. */
  updateScenarioInSlice: (sliceId: string, scenarioIndex: number, given: string[], when: string, then: string[]) => void;
  /** Create a new bounded context, optionally at a specific index. */
  createBoundedContext: (id: string, name: string, insertIndex?: number) => void;
  /** Delete a bounded context (and unassign its slices). */
  deleteBoundedContext: (id: string) => void;
  /** Rename a bounded context. */
  renameBoundedContext: (id: string, name: string) => void;
  /** Assign a vertical slice to a bounded context (or unassign if boundedContextId is undefined). */
  assignSliceToBoundedContext: (sliceId: string, boundedContextId: string | undefined) => void;
  /** Start a temporary slice range from a free column. Ignored if column is already covered. */
  startSliceSelection: (column: number) => void;
  /** Extend the current temporary slice range by one column to the right. */
  extendSelectedSliceRangeRight: () => void;
  /** Clear the temporary slice selection range. */
  clearSliceSelection: () => void;
  /** Add a node at a grid position and automatically create links with adjacent nodes. */
  addNodeWithAutoLinks: (id: string, kind: NodeKind, label: string, column: number, row: number) => void;
  /** Clear the auto-edit node id (after a node has entered editing mode). */
  clearAutoEditNodeId: () => void;
  /** Export the current board as a JSON string conforming to the EventModel schema. */
  exportJSON: () => string;
  /** Export the current board as a Markdown string conforming to the event-modeling skill format. */
  exportMarkdown: () => string;
}

const initialState = loadFromStorage();

export const useBoardStore = create<BoardStoreState & BoardActions>((set, get) => {
  const sliceRepository: VerticalSliceRepository = {
    load: () => get().slices,
    save: (slices) => {
      const { board, links, boundedContexts, nodeProperties } = get();
      saveToStorage(board, links, slices, boundedContexts, nodeProperties);
      set({ slices });
    },
  };

  const createSliceHandler = new CreateSliceCommandHandler(sliceRepository);
  const renameSliceHandler = new RenameSliceCommandHandler(sliceRepository);
  const deleteSliceHandler = new DeleteSliceCommandHandler(sliceRepository);
  const addScenarioToSliceHandler = new AddScenarioToSliceCommandHandler(sliceRepository);
  const removeScenarioFromSliceHandler = new RemoveScenarioFromSliceCommandHandler(sliceRepository);
  const updateScenarioInSliceHandler = new UpdateScenarioInSliceCommandHandler(sliceRepository);
  const extendSliceRightHandler = new ExtendSliceRightCommandHandler(sliceRepository);

  const boundedContextRepository: BoundedContextRepository = {
    load: () => get().boundedContexts,
    save: (boundedContexts) => {
      const { board, links, slices, nodeProperties } = get();
      saveToStorage(board, links, slices, boundedContexts, nodeProperties);
      set({ boundedContexts });
    },
  };

  const createBoundedContextHandler = new CreateBoundedContextCommandHandler(boundedContextRepository);
  const deleteBoundedContextHandler = new DeleteBoundedContextCommandHandler(boundedContextRepository, sliceRepository);
  const renameBoundedContextHandler = new RenameBoundedContextCommandHandler(boundedContextRepository);
  const assignSliceToBoundedContextHandler = new AssignSliceToBoundedContextCommandHandler(sliceRepository);
  const exportJSONHandler = new ExportJSONQueryHandler({
    loadBoard: () => get().board,
    loadLinks: () => get().links,
    loadSlices: () => get().slices,
    loadNodeProperties: () => get().nodeProperties,
  });
  const exportMarkdownHandler = new ExportMarkdownQueryHandler({
    loadBoard: () => get().board,
    loadLinks: () => get().links,
    loadSlices: () => get().slices,
  });

  return {
    board: initialState.board,
    links: initialState.links,
    slices: initialState.slices,
    boundedContexts: initialState.boundedContexts,
    selectedNode: null,
    nodeProperties: initialState.nodeProperties,
    selectedSliceRange: null,
    activeSliceInspectorId: null,
    activeSliceInspectorMode: null,
    autoEditNodeId: null,

    addDomainEventNode: (id, label, column, row) =>
      set((state) => {
        // Resolve bounded context from the row
        const bcIds: string[] = [];
        state.boundedContexts.describeTo({ onBoundedContext(bcId) { bcIds.push(bcId); } });
        const bcIndex = row - 2;
        const boundedContextId = bcIndex >= 0 && bcIndex < bcIds.length ? bcIds[bcIndex] : undefined;
        const { repository, getBoard } = createBoardRepository(state.board);
        const addDomainEventNodeHandler = new AddDomainEventNodeCommandHandler(repository);
        addDomainEventNodeHandler.handle(new AddDomainEventNodeCommand(id, label, column, row, boundedContextId));
        const board = getBoard();
        const nodeProperties = { ...state.nodeProperties, [id]: createDefaultNodeProperties('domainEvent') };
        saveToStorage(board, state.links, state.slices, state.boundedContexts, nodeProperties);
        return { board, nodeProperties };
      }),

    addCommandNode: (id, label, column, row, linkedEventId) =>
      set((state) => {
        const { repository, getBoard } = createBoardRepository(state.board);
        const addCommandNodeHandler = new AddCommandNodeCommandHandler(repository);
        addCommandNodeHandler.handle(new AddCommandNodeCommand(id, label, column, row, linkedEventId ?? ''));
        const board = getBoard();
        const links = linkedEventId
          ? [...state.links, { sourceNodeId: id, targetNodeId: linkedEventId, connectionType: 'triggers' as const }]
          : state.links;
        const nodeProperties = { ...state.nodeProperties, [id]: createDefaultNodeProperties('command') };
        saveToStorage(board, links, state.slices, state.boundedContexts, nodeProperties);
        return { board, links, nodeProperties };
      }),

    addReadModelNode: (id, label, column, row) =>
      set((state) => {
        const { repository, getBoard } = createBoardRepository(state.board);
        const addReadModelNodeHandler = new AddReadModelNodeCommandHandler(repository);
        addReadModelNodeHandler.handle(new AddReadModelNodeCommand(id, label, column, row));
        const board = getBoard();
        const nodeProperties = { ...state.nodeProperties, [id]: createDefaultNodeProperties('readModel') };
        saveToStorage(board, state.links, state.slices, state.boundedContexts, nodeProperties);
        return { board, nodeProperties };
      }),

    addPolicyNode: (id, label, column, row) =>
      set((state) => {
        const { repository, getBoard } = createBoardRepository(state.board);
        const addPolicyNodeHandler = new AddPolicyNodeCommandHandler(repository);
        addPolicyNodeHandler.handle(new AddPolicyNodeCommand(id, label, column, row));
        const board = getBoard();
        const nodeProperties = { ...state.nodeProperties, [id]: createDefaultNodeProperties('policy') };
        saveToStorage(board, state.links, state.slices, state.boundedContexts, nodeProperties);
        return { board, nodeProperties };
      }),

    addUIScreenNode: (id, label, column, row) =>
      set((state) => {
        const { repository, getBoard } = createBoardRepository(state.board);
        const addUIScreenNodeHandler = new AddUIScreenNodeCommandHandler(repository);
        addUIScreenNodeHandler.handle(new AddUIScreenNodeCommand(id, label, column, row));
        const board = getBoard();
        const nodeProperties = { ...state.nodeProperties, [id]: createDefaultNodeProperties('uiScreen') };
        saveToStorage(board, state.links, state.slices, state.boundedContexts, nodeProperties);
        return { board, nodeProperties };
      }),

    moveNode: (id, column, row) =>
      set((state) => {
        const { repository, getBoard } = createBoardRepository(state.board);
        const moveNodeHandler = new MoveNodeCommandHandler(repository);
        moveNodeHandler.handle(new MoveNodeCommand(id, column, row));
        const board = getBoard();
        saveToStorage(board, state.links, state.slices, state.boundedContexts, state.nodeProperties);
        return { board };
      }),

    updateLabel: (id, label) =>
      set((state) => {
        const { repository, getBoard } = createBoardRepository(state.board);
        const updateLabelHandler = new UpdateNodeLabelCommandHandler(repository);
        updateLabelHandler.handle(new UpdateNodeLabelCommand(id, label));
        const board = getBoard();
        saveToStorage(board, state.links, state.slices, state.boundedContexts, state.nodeProperties);
        const selectedNode = state.selectedNode?.id === id ? { ...state.selectedNode, label } : state.selectedNode;
        return { board, selectedNode };
      }),

    removeNode: (id) =>
      set((state) => {
        const { repository, getBoard } = createBoardRepository(state.board);
        const removeNodeHandler = new RemoveNodeCommandHandler(repository);
        removeNodeHandler.handle(new RemoveNodeCommand(id));
        const board = getBoard();
        const links = state.links.filter((link) => link.sourceNodeId !== id && link.targetNodeId !== id);
        const { [id]: _, ...nodeProperties } = state.nodeProperties;
        void _;
        saveToStorage(board, links, state.slices, state.boundedContexts, nodeProperties);
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
        saveToStorage(state.board, links, state.slices, state.boundedContexts, state.nodeProperties);
        return { links };
      }),

    removeLink: (sourceNodeId, targetNodeId) =>
      set((state) => {
        const links = state.links.filter(
          (link) => !(link.sourceNodeId === sourceNodeId && link.targetNodeId === targetNodeId)
        );
        saveToStorage(state.board, links, state.slices, state.boundedContexts, state.nodeProperties);
        return { links };
      }),

    selectNode: (id, type, label) =>
      set({ selectedNode: { id, type, label } }),

    deselectNode: () =>
      set({ selectedNode: null }),

    updateNodeProperties: (id, properties) =>
      set((state) => {
        const nodeProperties = { ...state.nodeProperties, [id]: properties };
        saveToStorage(state.board, state.links, state.slices, state.boundedContexts, nodeProperties);
        return { nodeProperties };
      }),

    createSlice: (id, name, commandId, eventIds, readModelId, startColumn = 0, columnCount = 1) => {
      createSliceHandler.handle(new CreateSliceCommand(id, name, commandId, eventIds, readModelId, startColumn, columnCount));
    },

    startSliceSelection: (column) =>
      set((state) => {
        if (state.slices.isColumnCovered(column)) {
          return state;
        }
        return { selectedSliceRange: { startColumn: column, columnCount: 1 } };
      }),

    extendSelectedSliceRangeRight: () =>
      set((state) => {
        if (!state.selectedSliceRange) return state;
        const nextColumn = state.selectedSliceRange.startColumn + state.selectedSliceRange.columnCount;
        if (state.slices.isColumnCovered(nextColumn)) {
          return state;
        }
        return {
          selectedSliceRange: {
            startColumn: state.selectedSliceRange.startColumn,
            columnCount: state.selectedSliceRange.columnCount + 1,
          },
        };
      }),

    clearSliceSelection: () => set({ selectedSliceRange: null }),

    renameSlice: (id, name) => {
      renameSliceHandler.handle(new RenameSliceCommand(id, name));
    },

    deleteSlice: (id) => {
      deleteSliceHandler.handle(new DeleteSliceCommand(id));
    },

    openSliceInspector: (sliceId, mode = 'details') => set({ activeSliceInspectorId: sliceId, activeSliceInspectorMode: mode }),

    closeSliceInspector: () => set({ activeSliceInspectorId: null, activeSliceInspectorMode: null }),

    extendSliceRight: (sliceId) => {
      extendSliceRightHandler.handle(new ExtendSliceRightCommand(sliceId));
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

    createBoundedContext: (id, name, insertIndex) => {
      createBoundedContextHandler.handle(new CreateBoundedContextCommand(id, name, insertIndex));
    },

    deleteBoundedContext: (id) => {
      deleteBoundedContextHandler.handle(new DeleteBoundedContextCommand(id));
      // Cascade: remove domain events belonging to the deleted BC, their links, and their nodeProperties
      set((state) => {
        const eventIdsToDelete: string[] = [];
        const cascadeProjection: BoardProjection = {
          onDomainEventNode(nodeId, _label, _column, _row, boundedContextId) {
            if (boundedContextId === id) eventIdsToDelete.push(nodeId);
          },
          onCommandNode() {},
          onReadModelNode() {},
          onPolicyNode() {},
          onUIScreenNode() {},
        };
        state.board.describeTo(cascadeProjection);
        if (eventIdsToDelete.length === 0) return state;
        let board = state.board;
        for (const eventId of eventIdsToDelete) {
          board = board.removeNode(eventId);
        }
        const eventIdSet = new Set(eventIdsToDelete);
        const links = state.links.filter(
          (link) => !eventIdSet.has(link.sourceNodeId) && !eventIdSet.has(link.targetNodeId)
        );
        const nodeProperties = { ...state.nodeProperties };
        for (const eventId of eventIdsToDelete) {
          delete nodeProperties[eventId];
        }
        saveToStorage(board, links, state.slices, state.boundedContexts, nodeProperties);
        return { board, links, nodeProperties };
      });
    },

    renameBoundedContext: (id, name) => {
      renameBoundedContextHandler.handle(new RenameBoundedContextCommand(id, name));
    },

    assignSliceToBoundedContext: (sliceId, boundedContextId) => {
      assignSliceToBoundedContextHandler.handle(new AssignSliceToBoundedContextCommand(sliceId, boundedContextId));
    },


    addNodeWithAutoLinks: (id, kind, label, column, row) =>
      set((state) => {
        const { repository, getBoard } = createBoardRepository(state.board);
        if (kind === 'domainEvent') {
          // Resolve bounded context from the row (row 2 → BC index 0, row 3 → BC index 1, etc.)
          const bcIds: string[] = [];
          state.boundedContexts.describeTo({ onBoundedContext(bcId) { bcIds.push(bcId); } });
          const bcIndex = row - 2;
          const boundedContextId = bcIndex >= 0 && bcIndex < bcIds.length ? bcIds[bcIndex] : undefined;
          const addDomainEventNodeHandler = new AddDomainEventNodeCommandHandler(repository);
          addDomainEventNodeHandler.handle(new AddDomainEventNodeCommand(id, label, column, row, boundedContextId));
        } else if (kind === 'command') {
          const addCommandNodeHandler = new AddCommandNodeCommandHandler(repository);
          addCommandNodeHandler.handle(new AddCommandNodeCommand(id, label, column, row, ''));
        } else if (kind === 'readModel') {
          const addReadModelNodeHandler = new AddReadModelNodeCommandHandler(repository);
          addReadModelNodeHandler.handle(new AddReadModelNodeCommand(id, label, column, row));
        } else if (kind === 'policy') {
          const addPolicyNodeHandler = new AddPolicyNodeCommandHandler(repository);
          addPolicyNodeHandler.handle(new AddPolicyNodeCommand(id, label, column, row));
        } else if (kind === 'uiScreen') {
          const addUIScreenNodeHandler = new AddUIScreenNodeCommandHandler(repository);
          addUIScreenNodeHandler.handle(new AddUIScreenNodeCommand(id, label, column, row));
        }
        const board = getBoard();
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
        saveToStorage(board, links, state.slices, state.boundedContexts, nodeProperties);
        return { board, links, nodeProperties, autoEditNodeId: id };
      }),

    clearAutoEditNodeId: () => set({ autoEditNodeId: null }),

    exportJSON: () => {
      return exportJSONHandler.handle(new ExportJSONQuery());
    },

    exportMarkdown: () => {
      return exportMarkdownHandler.handle(new ExportMarkdownQuery());
    },
  };
});

export const useBoard = () => useBoardStore((state) => state.board);

export const useLinks = () => useBoardStore((state) => state.links);

export const useSlices = () => useBoardStore((state) => state.slices);

export const useBoundedContexts = () => useBoardStore((state) => state.boundedContexts);

export const useSelectedNode = () => useBoardStore((state) => state.selectedNode);

export const useNodeProperties = () => useBoardStore((state) => state.nodeProperties);

export const useAutoEditNodeId = () => useBoardStore((state) => state.autoEditNodeId);

export const useActiveSliceInspectorId = () => useBoardStore((state) => state.activeSliceInspectorId);

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
      addNodeWithAutoLinks: state.addNodeWithAutoLinks,
      clearAutoEditNodeId: state.clearAutoEditNodeId,
    }))
  );

export const useSliceActions = () =>
  useBoardStore(
    useShallow((state) => ({
      createSlice: state.createSlice,
      renameSlice: state.renameSlice,
      deleteSlice: state.deleteSlice,
      openSliceInspector: state.openSliceInspector,
      closeSliceInspector: state.closeSliceInspector,
      extendSliceRight: state.extendSliceRight,
      addScenarioToSlice: state.addScenarioToSlice,
      removeScenarioFromSlice: state.removeScenarioFromSlice,
      updateScenarioInSlice: state.updateScenarioInSlice,
    }))
  );

export const useBoundedContextActions = () =>
  useBoardStore(
    useShallow((state) => ({
      createBoundedContext: state.createBoundedContext,
      deleteBoundedContext: state.deleteBoundedContext,
      renameBoundedContext: state.renameBoundedContext,
      assignSliceToBoundedContext: state.assignSliceToBoundedContext,
    }))
  );

export const useSelectedSliceRange = () => useBoardStore((state) => state.selectedSliceRange);

export const useColumnSelectionActions = () =>
  useBoardStore(
    useShallow((state) => ({
      startSliceSelection: state.startSliceSelection,
      extendSelectedSliceRangeRight: state.extendSelectedSliceRangeRight,
      clearSliceSelection: state.clearSliceSelection,
    }))
  );
