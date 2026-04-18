import { type GridBoard } from './GridBoard';

/** Port interface for board persistence used by board command handlers. */
export interface GridBoardRepository {
  load(): GridBoard;
  save(board: GridBoard): void;
}