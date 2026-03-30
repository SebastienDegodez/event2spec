import { create } from 'zustand';
import { GridBoard } from '../domain/GridBoard';
import { DomainEventNode } from '../domain/DomainEventNode';

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

export const useBoardStore = create<BoardStoreState & BoardActions>((set) => ({
  board: GridBoard.empty(),

  addNode: (id, label, column, row) =>
    set((state) => ({
      board: state.board.insertNode(DomainEventNode.create(id, label, column, row)),
    })),

  moveNode: (id, column, row) =>
    set((state) => ({
      board: state.board.moveNode(id, column, row),
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

export const useBoardState = () => useBoardStore((s) => s.board);
export const useAddNode = () => useBoardStore((s) => s.addNode);
export const useMoveNode = () => useBoardStore((s) => s.moveNode);
export const useUpdateLabel = () => useBoardStore((s) => s.updateLabel);
export const useRemoveNode = () => useBoardStore((s) => s.removeNode);
