import { GridBoard } from '../../../domain/GridBoard';
import { RemoveNodeCommand } from './RemoveNodeCommand';

export class RemoveNodeCommandHandler {
  handle(board: GridBoard, command: RemoveNodeCommand): GridBoard {
    return board.removeNode(command.id);
  }
}
