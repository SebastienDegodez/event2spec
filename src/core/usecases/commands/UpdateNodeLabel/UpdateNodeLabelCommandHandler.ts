import { GridBoard } from '../../../domain/GridBoard';
import { UpdateNodeLabelCommand } from './UpdateNodeLabelCommand';

export class UpdateNodeLabelCommandHandler {
  handle(board: GridBoard, command: UpdateNodeLabelCommand): GridBoard {
    return board.updateLabel(command.id, command.label);
  }
}
