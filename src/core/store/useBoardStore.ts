import { create } from 'zustand';
import { GridBoard } from '../domain/GridBoard';
import { AddNodeCommand } from '../usecases/commands/AddNodeCommand';
import { AddNodeCommandHandler } from '../usecases/commands/AddNodeCommandHandler';
import { MoveNodeCommand } from '../usecases/commands/MoveNodeCommand';
import { MoveNodeCommandHandler } from '../usecases/commands/MoveNodeCommandHandler';
import { UpdateNodeLabelCommand } from '../usecases/commands/UpdateNodeLabelCommand';
import { UpdateNodeLabelCommandHandler } from '../usecases/commands/UpdateNodeLabelCommandHandler';
import { RemoveNodeCommand } from '../usecases/commands/RemoveNodeCommand';
import { RemoveNodeCommandHandler } from '../usecases/commands/RemoveNodeCommandHandler';

interface BoardStoreState {
  board: GridBoard;
}

interface BoardActions {
  /** Add a new domain event node at the given grid position. */
  addNode: (id: string, label: string, column: number, row: number) => void;
  /** Move an existing node to a new grid position (collision resolution applied). */
  moveNode: (id: string, column: number, row: number) => void;
  /** Update the label of an existing node. */
  updateLabel: (id: string, label: string) => void;
  /** Remove a node from the board. */
  removeNode: (id: string) => void;
}

const addNodeHandler = new AddNodeCommandHandler();
const moveNodeHandler = new MoveNodeCommandHandler();
const updateLabelHandler = new UpdateNodeLabelCommandHandler();
const removeNodeHandler = new RemoveNodeCommandHandler();

export const useBoardStore = create<BoardStoreState & BoardActions>((set) => ({
  board: GridBoard.empty(),

  addNode: (id, label, column, row) =>
    set((state) => ({
      board: addNodeHandler.handle(state.board, new AddNodeCommand(id, label, column, row)),
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
    })),
}));

export const useBoard = () => useBoardStore((state) => state.board);

export const useBoardActions = () =>
  useBoardStore((state) => ({
    addNode: state.addNode,
    moveNode: state.moveNode,
    updateLabel: state.updateLabel,
    removeNode: state.removeNode,
  }));
