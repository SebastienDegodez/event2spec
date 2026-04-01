# event2spec

A browser-based event-storming whiteboard where **Domain Events** snap to a strict grid.

## Features

- **Snap-to-Grid Canvas** — sticky notes (Domain Events) can only occupy discrete grid cells (`col`, `row`). No pixel coordinates are stored.
- **Collision Resolution** — dropping a note on an occupied cell shifts all notes in that row (at `col ≥ targetCol`) one column to the right.
- **Inline Editing** — double-click a note to rename it.
- **Local-First** — runs entirely in the browser; React + Zustand + React Flow.

## Architecture

```
src/
  core/
    domain/         # Pure TypeScript types (GridNode, BoardState)
    usecases/       # Pure functions (insertNodeAt — collision logic)
    store/          # Zustand store (useBoardStore)
  ui/
    components/
      Canvas/       # React Flow adapter (GridCanvas, DomainEventNode)
tests/
  core/usecases/    # Vitest unit tests for collision logic
```

## Getting started

```bash
npm install
npm run dev       # start dev server
npm test          # run unit tests
npm run build     # production build
```
