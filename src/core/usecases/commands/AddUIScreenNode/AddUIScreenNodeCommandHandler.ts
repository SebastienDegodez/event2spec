import { GridBoard } from '../../../domain/GridBoard';
import { UIScreenNode } from '../../../domain/UIScreenNode';
import { AddUIScreenNodeCommand } from './AddUIScreenNodeCommand';

export class AddUIScreenNodeCommandHandler {
  handle(board: GridBoard, command: AddUIScreenNodeCommand): GridBoard {
    const node = UIScreenNode.create(command.id, command.label, command.column, command.row);
    return board.insertNode(node);
  }
}
