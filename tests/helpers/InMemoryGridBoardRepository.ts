import { type GridBoardRepository } from '../../src/core/domain/board/GridBoardRepository';
import { type GridBoard } from '../../src/core/domain/board/GridBoard';

export class InMemoryGridBoardRepository implements GridBoardRepository {
  private board: GridBoard;

  constructor(initial: GridBoard) {
    this.board = initial;
  }

  load(): GridBoard {
    return this.board;
  }

  save(board: GridBoard): void {
    this.board = board;
  }
}