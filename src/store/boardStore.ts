import { create } from 'zustand';

export interface DomainEvent {
  id: string;
  label: string;
  col: number;
  row: number;
}

interface BoardState {
  events: DomainEvent[];
  addEvent: (label: string, col: number, row: number) => void;
  moveEvent: (id: string, col: number, row: number) => void;
  updateLabel: (id: string, label: string) => void;
  removeEvent: (id: string) => void;
}

function resolveCollisions(
  events: DomainEvent[],
  movedId: string,
  targetCol: number,
  targetRow: number
): DomainEvent[] {
  // Shift all events in the same row at targetCol or beyond (excluding the moved event)
  const shifted = events.map((e) => {
    if (e.id === movedId) return e;
    if (e.row === targetRow && e.col >= targetCol) {
      return { ...e, col: e.col + 1 };
    }
    return e;
  });

  return shifted.map((e) => {
    if (e.id === movedId) return { ...e, col: targetCol, row: targetRow };
    return e;
  });
}

let nextId = 1;

export const useBoardStore = create<BoardState>((set) => ({
  events: [],

  addEvent: (label, col, row) =>
    set((state) => {
      const newEvent: DomainEvent = {
        id: `event-${nextId++}`,
        label,
        col,
        row,
      };
      // Apply collision resolution for the new event
      const withNew = [...state.events, newEvent];
      const resolved = resolveCollisions(
        withNew,
        newEvent.id,
        col,
        row
      );
      return { events: resolved };
    }),

  moveEvent: (id, col, row) =>
    set((state) => {
      const existing = state.events.find((e) => e.id === id);
      if (!existing) return state;
      const withoutMoved = state.events.filter((e) => e.id !== id);
      const withMoved = [...withoutMoved, { ...existing, col, row }];
      const resolved = resolveCollisions(withMoved, id, col, row);
      return { events: resolved };
    }),

  updateLabel: (id, label) =>
    set((state) => ({
      events: state.events.map((e) => (e.id === id ? { ...e, label } : e)),
    })),

  removeEvent: (id) =>
    set((state) => ({
      events: state.events.filter((e) => e.id !== id),
    })),
}));
