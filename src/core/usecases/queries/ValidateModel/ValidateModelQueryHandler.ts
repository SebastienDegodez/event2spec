import { GridBoard } from '../../../domain/GridBoard';
import { type BoardProjection } from '../../../domain/BoardProjection';
import { type NodeLink } from '../../../domain/NodeLink';
import { type ValidationWarning } from '../../../domain/ValidationWarning';
import { validateModel, type ValidatableNode } from '../../../domain/ModelValidator';
import { ValidateModelQuery } from './ValidateModelQuery';

export interface ValidateModelQueryRepository {
  loadBoard(): GridBoard;
  loadLinks(): ReadonlyArray<NodeLink>;
}

export class ValidateModelQueryHandler {
  private readonly repository: ValidateModelQueryRepository | undefined;

  constructor(repository?: ValidateModelQueryRepository) {
    this.repository = repository;
  }

  handle(query: ValidateModelQuery): ReadonlyArray<ValidationWarning>;
  handle(
    board: GridBoard,
    links: ReadonlyArray<NodeLink>,
    query: ValidateModelQuery,
  ): ReadonlyArray<ValidationWarning> {
    let resolvedBoard = board;
    let resolvedLinks = links;
    let resolvedQuery = query;

    if (board instanceof ValidateModelQuery) {
      if (!this.repository) {
        throw new Error('ValidateModelQueryRepository is required when calling handle(query)');
      }
      resolvedBoard = this.repository.loadBoard();
      resolvedLinks = this.repository.loadLinks();
      resolvedQuery = board;
    }

    void resolvedQuery;

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

    resolvedBoard.describeTo(projection);

    return validateModel(nodes, resolvedLinks);
  }
}
