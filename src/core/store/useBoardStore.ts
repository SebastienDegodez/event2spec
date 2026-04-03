import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { GridBoard } from '../domain/GridBoard';
import { AddNodeCommand } from '../usecases/commands/AddNodeCommand';
import { AddNodeCommandHandler } from '../usecases/commands/AddNodeCommandHandler';
import { MoveNodeCommand } from '../usecases/commands/MoveNodeCommand';
import { MoveNodeCommandHandler } from '../usecases/commands/MoveNodeCommandHandler';
import { UpdateNodeLabelCommand } from '../usecases/commands/UpdateNodeLabelCommand';
import { UpdateNodeLabelCommandHandler } from '../usecases/commands/UpdateNodeLabelCommandHandler';
import { RemoveNodeCommand } from '../usecases/commands/RemoveNodeCommand';
import { RemoveNodeCommandHandler } from '../usecases/commands/RemoveNodeCommandHandler';
import { AddCommandNodeCommand } from '../usecases/commands/AddCommandNodeCommand';
import { AddCommandNodeCommandHandler } from '../usecases/commands/AddCommandNodeCommandHandler';

/** A directed link from a command node to the domain event it triggers. */
interface NodeLink {
  commandNodeId: string;
  eventNodeId: string;
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
  /** Move an existing node to a new grid position (collision resolution applied). */
  moveNode: (id: string, column: number, row: number) => void;
  /** Update the label of an existing node. */
  updateLabel: (id: string, label: string) => void;
  /** Remove a node from the board. */
  removeNode: (id: string) => void;
}

const addNodeHandler = new AddNodeCommandHandler();
const addCommandNodeHandler = new AddCommandNodeCommandHandler();
const moveNodeHandler = new MoveNodeCommandHandler();
const updateLabelHandler = new UpdateNodeLabelCommandHandler();
const removeNodeHandler = new RemoveNodeCommandHandler();

export const useBoardStore = create<BoardStoreState & BoardActions>((set) => ({
  board: GridBoard.empty(),
  links: [],

  addNode: (id, label, column, row) =>
    set((state) => ({
      board: addNodeHandler.handle(state.board, new AddNodeCommand(id, label, column, row)),
    })),

  addCommandNode: (id, label, column, row, linkedEventId) =>
    set((state) => ({
      board: addCommandNodeHandler.handle(state.board, new AddCommandNodeCommand(id, label, column, row, linkedEventId)),
      links: [...state.links, { commandNodeId: id, eventNodeId: linkedEventId }],
    })),

  moveNode: (id, column, row) =>
    set((state) => ({
      board: moveNodeHandler.handle(state.board, new MoveNodeCommand(id, column, row)),
    })),

  updateLabel: (id, label) =>
    set((state) => ({
      board: updateLabelHandler.handle(state.board, new UpdateNodeLabelCommand(id, label)),
    })),

  removeNode: (id) =>
    set((state) => ({
      board: removeNodeHandler.handle(state.board, new RemoveNodeCommand(id)),
      links: state.links.filter((link) => link.commandNodeId !== id && link.eventNodeId !== id),
    })),
}));

export const useBoard = () => useBoardStore((state) => state.board);

export const useLinks = () => useBoardStore((state) => state.links);

export const useBoardActions = () =>
  useBoardStore(
    useShallow((state) => ({
      addNode: state.addNode,
      addCommandNode: state.addCommandNode,
      moveNode: state.moveNode,
      updateLabel: state.updateLabel,
      removeNode: state.removeNode,
    }))
  );
