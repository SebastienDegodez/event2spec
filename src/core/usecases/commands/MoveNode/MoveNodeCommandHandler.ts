import { GridBoard } from '../../../domain/GridBoard';
import { isRowValidForKind } from '../../../domain/isRowValidForKind';
import { type NodeKind } from '../../../domain/NodeKind';
import { MoveNodeCommand } from './MoveNodeCommand';

export class MoveNodeCommandHandler {
  handle(board: GridBoard, command: MoveNodeCommand): GridBoard {
    const kind = this.findKind(board, command.id);
    if (!kind) return board;
    if (!isRowValidForKind(kind, command.row)) return board;
    return board.moveNode(command.id, command.column, command.row);
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
