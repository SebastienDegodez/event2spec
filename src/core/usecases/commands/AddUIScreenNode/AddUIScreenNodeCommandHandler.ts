import { type GridBoardRepository } from '../../../domain/board/GridBoardRepository';
import { UIScreenNode } from '../../../domain/node/UIScreenNode';
import { AddUIScreenNodeCommand } from './AddUIScreenNodeCommand';

export class AddUIScreenNodeCommandHandler {
  private readonly repository: GridBoardRepository;

  constructor(repository: GridBoardRepository) {
    this.repository = repository;
  }

  handle(command: AddUIScreenNodeCommand): void {
    const board = this.repository.load();
    const node = UIScreenNode.create(command.id, command.label, command.column, command.row);
    this.repository.save(board.insertNode(node));
  }
}
