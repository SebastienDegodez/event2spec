import { GridBoard } from '../../../domain/GridBoard';
import { DomainEventNode } from '../../../domain/DomainEventNode';
import { AddDomainEventNodeCommand } from './AddDomainEventNodeCommand';

export class AddDomainEventNodeCommandHandler {
  handle(board: GridBoard, command: AddDomainEventNodeCommand): GridBoard {
    const node = DomainEventNode.create(
      command.id,
      command.label,
      command.column,
      command.row,
      command.boundedContextId
    );
    return board.insertNode(node);
  }
}
