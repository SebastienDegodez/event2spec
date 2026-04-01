import { GridBoard } from '../../domain/GridBoard';
import { MoveNodeCommand } from './MoveNodeCommand';

export class MoveNodeCommandHandler {
  handle(board: GridBoard, command: MoveNodeCommand): GridBoard {
    return board.moveNode(command.id, command.column, command.row);
  }
}
