import { create } from 'zustand';
import { GridBoard } from '../domain/GridBoard';
import { DomainEventNode } from '../domain/DomainEventNode';
import { GridPosition } from '../domain/GridPosition';

interface BoardStoreState {
  board: GridBoard;
}

interface BoardActions {
  /** Add a new domain event node at the given grid position. */
  addNode: (id: string, label: string, col: number, row: number) => void;
  /** Move an existing node to a new grid position (collision resolution applied). */
  moveNode: (id: string, col: number, row: number) => void;
  /** Update the label of an existing node. */
  updateLabel: (id: string, label: string) => void;
  /** Remove a node from the board. */
  removeNode: (id: string) => void;
}

export const useBoardStore = create<BoardStoreState & BoardActions>((set) => ({
  board: GridBoard.empty(),

  addNode: (id, label, col, row) =>
    set((state) => ({
      board: state.board.insertNode(
        new DomainEventNode(id, label, new GridPosition(col, row))
      ),
    })),

  moveNode: (id, col, row) =>
    set((state) => ({
      board: state.board.moveNode(id, new GridPosition(col, row)),
    })),

  updateLabel: (id, label) =>
    set((state) => ({
      board: state.board.updateLabel(id, label),
    })),

  removeNode: (id) =>
    set((state) => ({
      board: state.board.removeNode(id),
    })),
}));
