import { GridBoard } from '../../../domain/GridBoard';
import { ReadModelNode } from '../../../domain/ReadModelNode';
import { AddReadModelNodeCommand } from './AddReadModelNodeCommand';

export class AddReadModelNodeCommandHandler {
  handle(board: GridBoard, command: AddReadModelNodeCommand): GridBoard {
    const node = ReadModelNode.create(command.id, command.label, command.column, command.row);
    return board.insertNode(node);
  }
}
