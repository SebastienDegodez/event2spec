import { DomainEventNode } from '../domain/DomainEventNode';

/**
 * Pure function — inserts a node at the target cell on the board.
 *
 * Collision rule: if one or more nodes already occupy cells in the same row
 * at `column >= targetColumn`, those nodes are shifted one column to the right
 * before the new node is placed. The original array is never mutated.
 */
export function insertNodeAt(board: readonly DomainEventNode[], node: DomainEventNode): DomainEventNode[] {
  const shifted = board.map((existing) =>
    existing.shouldShiftWhenInserted(node) ? existing.shiftRight() : existing
  );
  return [...shifted, node];
}
