import { type GridBoardRepository } from '../../../domain/GridBoardRepository';
import { UpdateNodeLabelCommand } from './UpdateNodeLabelCommand';

export class UpdateNodeLabelCommandHandler {
  private readonly repository: GridBoardRepository;

  constructor(repository: GridBoardRepository) {
    this.repository = repository;
  }

  handle(command: UpdateNodeLabelCommand): void {
    const board = this.repository.load();
    this.repository.save(board.updateLabel(command.id, command.label));
  }
}
