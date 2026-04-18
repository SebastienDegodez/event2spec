import { type GridBoardRepository } from '../../../domain/GridBoardRepository';
import { PolicyNode } from '../../../domain/PolicyNode';
import { AddPolicyNodeCommand } from './AddPolicyNodeCommand';

export class AddPolicyNodeCommandHandler {
  private readonly repository: GridBoardRepository;

  constructor(repository: GridBoardRepository) {
    this.repository = repository;
  }

  handle(command: AddPolicyNodeCommand): void {
    const board = this.repository.load();
    const node = PolicyNode.create(command.id, command.label, command.column, command.row);
    this.repository.save(board.insertNode(node));
  }
}
