import { DomainEventNode } from './DomainEventNode';
import { GridPosition } from './GridPosition';

/**
 * Plain data interface used by the insertNodeAt pure-function use-case.
 * Kept here for backward compatibility with insertNodeAt.ts.
 */
export interface GridNode {
  id: string;
  label: string;
  col: number;
  row: number;
}

/**
 * First-class collection of Domain Event nodes on the grid.
 * OC Rule 4: Wraps the node array — the only field is the collection.
 * OC Rule 1: One level of indentation per method.
 * OC Rule 2: No else keyword — guard clauses only.
 */
export class GridBoard {
  private readonly nodes: ReadonlyArray<DomainEventNode>;

  private constructor(nodes: ReadonlyArray<DomainEventNode>) {
    this.nodes = nodes;
  }

  static empty(): GridBoard {
    return new GridBoard([]);
  }

  static from(nodes: ReadonlyArray<DomainEventNode>): GridBoard {
    return new GridBoard(nodes);
  }

  /** Returns a new board with the node inserted and collisions resolved. */
  insertNode(node: DomainEventNode): GridBoard {
    const shifted = this.nodes.map((existing) =>
      this.shouldShift(existing, node.position)
        ? existing.shiftRight()
        : existing
    );
    return new GridBoard([...shifted, node]);
  }

  /** Returns a new board with the node removed. */
  removeNode(id: string): GridBoard {
    return new GridBoard(this.nodes.filter((n) => n.id !== id));
  }

  /** Returns a new board with the node moved to a new position, collisions resolved. */
  moveNode(id: string, position: GridPosition): GridBoard {
    const node = this.nodes.find((n) => n.id === id);
    if (!node) return this;
    const withoutMoved = this.removeNode(id);
    return withoutMoved.insertNode(node.moveTo(position));
  }

  /** Returns a new board with the label of the identified node updated. */
  updateLabel(id: string, label: string): GridBoard {
    return new GridBoard(this.nodes.map((n) =>
      n.id === id ? n.withLabel(label) : n
    ));
  }

  /** Exposes the nodes as an immutable array for use by the store / UI adapter. */
  toArray(): ReadonlyArray<DomainEventNode> {
    return this.nodes;
  }

  private shouldShift(existing: DomainEventNode, target: GridPosition): boolean {
    return existing.position.isSameRowAndAtOrBeyond(target);
  }
}
