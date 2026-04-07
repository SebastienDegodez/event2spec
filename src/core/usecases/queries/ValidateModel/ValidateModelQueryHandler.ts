import { GridBoard } from '../../../domain/GridBoard';
import { type BoardProjection } from '../../../domain/BoardProjection';
import { type NodeLink } from '../../../domain/NodeLink';
import { type ValidationWarning } from '../../../domain/ValidationWarning';
import { validateModel, type ValidatableNode } from '../../../domain/ModelValidator';
import { ValidateModelQuery } from './ValidateModelQuery';

export class ValidateModelQueryHandler {
  handle(
    board: GridBoard,
    links: ReadonlyArray<NodeLink>,
    query: ValidateModelQuery,
  ): ReadonlyArray<ValidationWarning> {
    void query;

    const nodes: ValidatableNode[] = [];

    const projection: BoardProjection = {
      onDomainEventNode(id, label) {
        nodes.push({ id, label, kind: 'domainEvent' });
      },
      onCommandNode(id, label) {
        nodes.push({ id, label, kind: 'command' });
      },
      onReadModelNode(id, label) {
        nodes.push({ id, label, kind: 'readModel' });
      },
      onPolicyNode(id, label) {
        nodes.push({ id, label, kind: 'policy' });
      },
      onUIScreenNode(id, label) {
        nodes.push({ id, label, kind: 'uiScreen' });
      },
    };

    board.describeTo(projection);

    return validateModel(nodes, links);
  }
}
