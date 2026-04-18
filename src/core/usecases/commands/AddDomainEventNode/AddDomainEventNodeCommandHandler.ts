import { type GridBoardRepository } from '../../../domain/board/GridBoardRepository';
import { DomainEventNode } from '../../../domain/DomainEventNode';
import { AddDomainEventNodeCommand } from './AddDomainEventNodeCommand';

export class AddDomainEventNodeCommandHandler {
  private readonly repository: GridBoardRepository;

  constructor(repository: GridBoardRepository) {
    this.repository = repository;
  }

  handle(command: AddDomainEventNodeCommand): void {
    const board = this.repository.load();
    const node = DomainEventNode.create(
      command.id,
      command.label,
      command.column,
      command.row,
      command.boundedContextId
    );
    this.repository.save(board.insertNode(node));
  }
}
