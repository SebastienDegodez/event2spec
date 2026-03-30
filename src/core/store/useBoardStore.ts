import { create } from 'zustand';
import type { GridNode, BoardState } from '../domain/GridBoard';
import { insertNodeAt } from '../usecases/insertNodeAt';

interface BoardActions {
  /** Add a new node at the given grid position (collision resolution applied). */
  addNode: (node: Omit<GridNode, 'id'>) => void;
  /** Move an existing node to a new grid position (collision resolution applied). */
  moveNode: (id: string, col: number, row: number) => void;
  /** Update the label of an existing node. */
  updateLabel: (id: string, label: string) => void;
  /** Remove a node from the board. */
  removeNode: (id: string) => void;
}

let _nextId = 1;

export const useBoardStore = create<BoardState & BoardActions>((set) => ({
  nodes: [],

  addNode: (nodeData) =>
    set((state) => {
      const node: GridNode = { ...nodeData, id: `event-${_nextId++}` };
      return { nodes: insertNodeAt(state.nodes, node) };
    }),

  moveNode: (id, col, row) =>
    set((state) => {
      const existing = state.nodes.find((n) => n.id === id);
      if (!existing) return state;
      const boardWithoutMoved = state.nodes.filter((n) => n.id !== id);
      return { nodes: insertNodeAt(boardWithoutMoved, { ...existing, col, row }) };
    }),

  updateLabel: (id, label) =>
    set((state) => ({
      nodes: state.nodes.map((n) => (n.id === id ? { ...n, label } : n)),
    })),

  removeNode: (id) =>
    set((state) => ({
      nodes: state.nodes.filter((n) => n.id !== id),
    })),
}));
