import { type GridBoard } from '../../../domain/board/GridBoard';
import { type GridBoardRepository } from '../../../domain/board/GridBoardRepository';
import { isRowValidForKind } from '../../../domain/isRowValidForKind';
import { type NodeKind } from '../../../domain/node/NodeKind';
import { MoveNodeCommand } from './MoveNodeCommand';

export class MoveNodeCommandHandler {
  private readonly repository: GridBoardRepository;

  constructor(repository: GridBoardRepository) {
    this.repository = repository;
  }

  handle(command: MoveNodeCommand): void {
    const board = this.repository.load();
    const kind = this.findKind(board, command.id);
    if (!kind) return;
    if (!isRowValidForKind(kind, command.row)) return;
    this.repository.save(board.moveNode(command.id, command.column, command.row));
  }

  private findKind(board: GridBoard, id: string): NodeKind | undefined {
    let kind: NodeKind | undefined;
    board.describeTo({
      onDomainEventNode(nodeId) {
        if (nodeId !== id) return;
        kind = 'domainEvent';
      },
      onCommandNode(nodeId) {
        if (nodeId !== id) return;
        kind = 'command';
      },
      onReadModelNode(nodeId) {
        if (nodeId !== id) return;
        kind = 'readModel';
      },
      onPolicyNode(nodeId) {
        if (nodeId !== id) return;
        kind = 'policy';
      },
      onUIScreenNode(nodeId) {
        if (nodeId !== id) return;
        kind = 'uiScreen';
      },
    });
    return kind;
  }
}
