import { GridBoard } from '../../domain/GridBoard';
import { BoardNode } from '../../domain/BoardNode';
import { GetAllNodesQuery } from './GetAllNodesQuery';

export class GetAllNodesQueryHandler {
  handle(board: GridBoard, query: GetAllNodesQuery): ReadonlyArray<BoardNode> {
    void query;
    return board.toArray();
  }
}
