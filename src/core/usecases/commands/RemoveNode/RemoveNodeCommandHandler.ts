import { type GridBoardRepository } from '../../../domain/board/GridBoardRepository';
import { RemoveNodeCommand } from './RemoveNodeCommand';

export class RemoveNodeCommandHandler {
  private readonly repository: GridBoardRepository;

  constructor(repository: GridBoardRepository) {
    this.repository = repository;
  }

  handle(command: RemoveNodeCommand): void {
    const board = this.repository.load();
    this.repository.save(board.removeNode(command.id));
  }
}
