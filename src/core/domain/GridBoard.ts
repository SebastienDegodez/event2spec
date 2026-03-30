import { DomainEventNode } from './DomainEventNode';
import { GridPosition } from './GridPosition';

export class GridBoard {
  private readonly nodes: ReadonlyArray<DomainEventNode>;

  private constructor(nodes: ReadonlyArray<DomainEventNode>) {
    this.nodes = nodes;
  }

  static empty(): GridBoard {
    return new GridBoard([]);
  }

  insertNode(node: DomainEventNode): GridBoard {
    const shifted = this.nodes.map((existing) =>
      this.shouldShift(existing, node)
        ? existing.shiftRight()
        : existing
    );
    return new GridBoard([...shifted, node]);
  }

  removeNode(id: string): GridBoard {
    return new GridBoard(this.nodes.filter((node) => node.id !== id));
  }

  moveNode(id: string, position: GridPosition): GridBoard {
    const node = this.nodes.find((existing) => existing.id === id);
    if (!node) return this;
    const withoutMoved = this.removeNode(id);
    return withoutMoved.insertNode(node.moveTo(position));
  }

  updateLabel(id: string, label: string): GridBoard {
    return new GridBoard(this.nodes.map((node) =>
      node.id === id ? node.withLabel(label) : node
    ));
  }

  toArray(): ReadonlyArray<DomainEventNode> {
    return this.nodes;
  }

  private shouldShift(existing: DomainEventNode, incoming: DomainEventNode): boolean {
    return existing.shouldShiftWhenInserted(incoming);
  }
}
