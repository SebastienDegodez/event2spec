import { type GridBoardRepository } from '../../../domain/board/GridBoardRepository';
import { CommandNode } from '../../../domain/node/CommandNode';
import { AddCommandNodeCommand } from './AddCommandNodeCommand';

export class AddCommandNodeCommandHandler {
  private readonly repository: GridBoardRepository;

  constructor(repository: GridBoardRepository) {
    this.repository = repository;
  }

  handle(command: AddCommandNodeCommand): void {
    const board = this.repository.load();
    const node = CommandNode.create(command.id, command.label, command.column, command.row);
    this.repository.save(board.insertNode(node));
  }
}
