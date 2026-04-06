import { GridBoard } from '../../../domain/GridBoard';
import { PolicyNode } from '../../../domain/PolicyNode';
import { AddPolicyNodeCommand } from './AddPolicyNodeCommand';

export class AddPolicyNodeCommandHandler {
  handle(board: GridBoard, command: AddPolicyNodeCommand): GridBoard {
    const node = PolicyNode.create(command.id, command.label, command.column, command.row);
    return board.insertNode(node);
  }
}
