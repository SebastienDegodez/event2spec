import { BoardNode } from './BoardNode';
import type { BoardNodeVisitor } from './BoardNodeVisitor';
import { GridPosition } from './GridPosition';

export class GridBoard {
  private readonly nodes: ReadonlyArray<BoardNode>;

  private constructor(nodes: ReadonlyArray<BoardNode>) {
    this.nodes = nodes;
  }

  static empty(): GridBoard {
    return new GridBoard([]);
  }

  insertNode(node: BoardNode): GridBoard {
    const shifted = this.nodes.map((existing) =>
      this.shouldShift(existing, node)
        ? existing.shiftRight()
        : existing
    );
    return new GridBoard([...shifted, node]);
  }

  removeNode(id: string): GridBoard {
    return new GridBoard(this.nodes.filter((node) => !node.hasId(id)));
  }

  moveNode(id: string, column: number, row: number): GridBoard {
    const node = this.nodes.find((existing) => existing.hasId(id));
    if (!node) return this;
    const targetPosition = new GridPosition(column, row);
    const withoutMoved = this.removeNode(id);
    if (!withoutMoved.hasNodeAt(targetPosition)) {
      return withoutMoved.placeNode(node.moveTo(targetPosition));
    }
    return withoutMoved.insertNode(node.moveTo(targetPosition));
  }

  updateLabel(id: string, label: string): GridBoard {
    return new GridBoard(this.nodes.map((node) =>
      node.hasId(id) ? node.withLabel(label) : node
    ));
  }

  accept(visitor: BoardNodeVisitor): void {
    for (const node of this.nodes) {
      node.accept(visitor);
    }
  }

  private shouldShift(existing: BoardNode, incoming: BoardNode): boolean {
    return existing.shouldShiftWhenInserted(incoming);
  }

  private hasNodeAt(position: GridPosition): boolean {
    return this.nodes.some((node) => node.isAt(position));
  }

  private placeNode(node: BoardNode): GridBoard {
    return new GridBoard([...this.nodes, node]);
  }
}
