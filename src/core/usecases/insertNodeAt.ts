import type { GridNode } from '../domain/GridBoard';

/**
 * Pure function — inserts a node at the target cell on the board.
 *
 * Collision rule: if one or more nodes already occupy cells in the same row
 * at `col >= targetCol`, those nodes are shifted one column to the right
 * before the new node is placed. The original array is never mutated.
 */
export function insertNodeAt(board: readonly GridNode[], node: GridNode): GridNode[] {
  const shifted = board.map((existing) => {
    if (existing.row === node.row && existing.col >= node.col) {
      return { ...existing, col: existing.col + 1 };
    }
    return existing;
  });

  return [...shifted, node];
}
