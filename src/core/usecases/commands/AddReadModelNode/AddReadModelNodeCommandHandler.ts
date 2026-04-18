import { type GridBoardRepository } from '../../../domain/board/GridBoardRepository';
import { ReadModelNode } from '../../../domain/ReadModelNode';
import { AddReadModelNodeCommand } from './AddReadModelNodeCommand';

export class AddReadModelNodeCommandHandler {
  private readonly repository: GridBoardRepository;

  constructor(repository: GridBoardRepository) {
    this.repository = repository;
  }

  handle(command: AddReadModelNodeCommand): void {
    const board = this.repository.load();
    const node = ReadModelNode.create(command.id, command.label, command.column, command.row);
    this.repository.save(board.insertNode(node));
  }
}
