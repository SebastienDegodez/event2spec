import { GridBoard } from '../../../domain/GridBoard';
import type { BoardProjection } from '../../../domain/BoardProjection';
import { GetAllNodesQuery } from './GetAllNodesQuery';

export class GetAllNodesQueryHandler {
  handle(board: GridBoard, projection: BoardProjection, query: GetAllNodesQuery): void {
    void query;
    board.describeTo(projection);
  }
}
