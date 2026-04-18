import { GridBoard } from '../../../domain/board/GridBoard';
import type { BoardProjection } from '../../../domain/board/BoardProjection';
import { GetAllNodesQuery } from './GetAllNodesQuery';

export class GetAllNodesQueryHandler {
  handle(board: GridBoard, projection: BoardProjection, query: GetAllNodesQuery): void {
    void query;
    board.describeTo(projection);
  }
}
