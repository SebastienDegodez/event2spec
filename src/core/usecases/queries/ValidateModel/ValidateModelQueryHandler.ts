import { GridBoard } from '../../../domain/board/GridBoard';
import { type BoardProjection } from '../../../domain/board/BoardProjection';
import { type NodeLink } from '../../../domain/node/NodeLink';
import { type ValidationWarning } from '../../../domain/validation/ValidationWarning';
import { validateModel, type ValidatableNode } from '../../../domain/validation/ModelValidator';
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
  ): ReadonlyArray<ValidationWarning>;
  handle(
    boardOrQuery: GridBoard | ValidateModelQuery,
    links?: ReadonlyArray<NodeLink>,
    query?: ValidateModelQuery,
  ): ReadonlyArray<ValidationWarning> {
    let resolvedBoard: GridBoard;
    let resolvedLinks: ReadonlyArray<NodeLink>;
    let resolvedQuery: ValidateModelQuery;

    if (boardOrQuery instanceof ValidateModelQuery) {
      if (!this.repository) {
        throw new Error('ValidateModelQueryRepository is required when calling handle(query)');
      }
      resolvedBoard = this.repository.loadBoard();
      resolvedLinks = this.repository.loadLinks();
      resolvedQuery = boardOrQuery;
    } else {
      if (!links || !query) {
        throw new Error('board, links, and query are required when calling handle(board, links, query)');
      }
      resolvedBoard = boardOrQuery;
      resolvedLinks = links;
      resolvedQuery = query;
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
