import { GridBoard } from '../../../domain/GridBoard';
import { CommandNode } from '../../../domain/CommandNode';
import { AddCommandNodeCommand } from './AddCommandNodeCommand';

export class AddCommandNodeCommandHandler {
  handle(board: GridBoard, command: AddCommandNodeCommand): GridBoard {
    const node = CommandNode.create(command.id, command.label, command.column, command.row);
    return board.insertNode(node);
  }
}
