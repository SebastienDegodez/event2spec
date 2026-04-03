import { GridBoard } from '../../../domain/GridBoard';
import { DomainEventNode } from '../../../domain/DomainEventNode';
import { AddNodeCommand } from './AddNodeCommand';

export class AddNodeCommandHandler {
  handle(board: GridBoard, command: AddNodeCommand): GridBoard {
    const node = DomainEventNode.create(command.id, command.label, command.column, command.row);
    return board.insertNode(node);
  }
}
