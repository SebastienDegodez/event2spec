import { GridBoard } from '../../domain/GridBoard';
import { DomainEventNode } from '../../domain/DomainEventNode';
import { GetAllNodesQuery } from './GetAllNodesQuery';

export class GetAllNodesQueryHandler {
  handle(board: GridBoard, query: GetAllNodesQuery): ReadonlyArray<DomainEventNode> {
    void query;
    return board.toArray();
  }
}
