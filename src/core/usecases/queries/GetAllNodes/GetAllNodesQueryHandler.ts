import { GridBoard } from '../../../domain/GridBoard';
import type { BoardNodeVisitor } from '../../../domain/BoardNodeVisitor';
import { GetAllNodesQuery } from './GetAllNodesQuery';

export class GetAllNodesQueryHandler {
  handle(board: GridBoard, visitor: BoardNodeVisitor, query: GetAllNodesQuery): void {
    void query;
    board.accept(visitor);
  }
}
