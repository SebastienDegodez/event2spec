# event2spec

A browser-based event-storming whiteboard that progresses through layered phases — from **Domain Events** to **Commands** — all snapped to a strict grid.

## Phases

### Phase 1 — Event Storming

Double-click the canvas to place **Domain Events** (orange sticky notes) on the grid. Drag to reposition, click the label to rename, right-click for insert options.

### Phase 2 — Command Discovery

Click the **+** button on any Domain Event to create a linked **Command** (blue sticky note) one row above. An animated edge visualises the command → event relationship.

## Features

- **Snap-to-Grid Canvas** — all cards occupy discrete grid cells (`column`, `row`). No pixel coordinates are stored.
- **Collision Resolution** — dropping a card on an occupied cell shifts all cards in that row (at `column ≥ target`) one column to the right. Moving to an unoccupied cell places the card without shifting.
- **Card Inheritance** — `DomainEventNode` and `CommandNode` both extend an abstract `BoardNode`, sharing grid position, shift, move, and label behaviours.
- **Link Tracking** — each Command stores a link to its triggering Domain Event. Links are auto-cleaned when either node is removed.
- **Inline Editing** — single-click a card label to rename it.
- **Context Menu** — right-click the canvas or a card to insert events at specific positions.
- **Local-First** — runs entirely in the browser; React + Zustand + React Flow.

## Architecture

```
src/
  core/
    domain/                  # Pure domain model
      BoardNode.ts           #   Abstract base class (id, label, position, shift, move)
      DomainEventNode.ts     #   Orange sticky note — extends BoardNode
      CommandNode.ts          #   Blue sticky note  — extends BoardNode
      GridBoard.ts            #   First-class collection of BoardNode (collision logic)
      GridPosition.ts         #   Value object wrapping column + row
    usecases/
      commands/
        AddNode/              #   Add a DomainEventNode to the board
        AddCommandNode/       #   Add a CommandNode linked to an event
        MoveNode/             #   Move any node (collision-aware)
        RemoveNode/           #   Remove a node (cleans up links)
        UpdateNodeLabel/      #   Rename a node
      queries/
        GetAllNodes/          #   Retrieve all board nodes
    store/
      useBoardStore.ts       # Zustand store (board + links + actions)
  ui/
    components/
      Canvas/
        GridCanvas.tsx        # React Flow adapter (nodes, edges, context menu)
        DomainEventNode.tsx   # Orange card component (with + button)
        CommandNodeComponent.tsx  # Blue card component
        ContextMenu.tsx       # Right-click menu
        ContextMenuState.ts   # Menu state type
        ContextMenuItem.ts    # Menu item type
        gridConstants.ts      # Grid sizes, pixel conversions, colour constants
tests/
  core/usecases/              # Vitest unit tests — one folder per use case
    AddNode/
    AddCommandNode/
    MoveNode/
    RemoveNode/
    UpdateNodeLabel/
  e2e/                        # Playwright E2E tests
```

### Domain model

```
BoardNode (abstract)
├── DomainEventNode  (orange)
└── CommandNode      (blue)
```

`GridBoard` is a first-class collection operating on `BoardNode`. All collision resolution, shifting, and placement logic is polymorphic — the same `insertNode`, `moveNode`, `removeNode`, and `updateLabel` methods work for both node types.

### Use cases

Each use case is a Command + CommandHandler pair grouped in its own folder. Tests mirror the same structure under `tests/core/usecases/`.

| Use case | Command | Handler | Description |
|---|---|---|---|
| **AddNode** | `AddNodeCommand` | `AddNodeCommandHandler` | Places a DomainEventNode on the grid |
| **AddCommandNode** | `AddCommandNodeCommand` | `AddCommandNodeCommandHandler` | Places a CommandNode linked to a DomainEvent |
| **MoveNode** | `MoveNodeCommand` | `MoveNodeCommandHandler` | Moves any node with collision resolution |
| **RemoveNode** | `RemoveNodeCommand` | `RemoveNodeCommandHandler` | Removes a node and cleans up links |
| **UpdateNodeLabel** | `UpdateNodeLabelCommand` | `UpdateNodeLabelCommandHandler` | Renames a node |

### Store

The Zustand store holds two pieces of state:

- `board: GridBoard` — the immutable collection of all nodes on the grid
- `links: NodeLink[]` — directed links from command nodes to event nodes

Actions: `addNode`, `addCommandNode`, `moveNode`, `removeNode`, `updateLabel`.

### UI

React Flow renders two custom node types (`domainEvent`, `command`) and animated edges for links. The `GridCanvas` converts between grid coordinates and pixel positions. The minimap shows commands in blue and events in amber.

## Getting started

```bash
npm install
npm run dev       # start dev server
npm test          # run unit tests
npm run build     # production build
```

## Deployment

The application is automatically deployed to **GitHub Pages** on every push to `main` via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

The workflow builds the project with `npm run build` and publishes the `dist/` folder using native GitHub Pages deployment.
