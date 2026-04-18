import { type GridBoard } from './GridBoard';
import { type BoardProjection } from './BoardProjection';
import { type BoardNodeSummary } from '../resolveAutoLinks';

/** Collects all board nodes as summaries for auto-link resolution. */
export function collectBoardNodeSummaries(board: GridBoard): BoardNodeSummary[] {
  const summaries: BoardNodeSummary[] = [];
  const projection: BoardProjection = {
    onDomainEventNode(id, _label, column, row) { summaries.push({ id, kind: 'domainEvent', column, row }); },
    onCommandNode(id, _label, column, row) { summaries.push({ id, kind: 'command', column, row }); },
    onReadModelNode(id, _label, column, row) { summaries.push({ id, kind: 'readModel', column, row }); },
    onPolicyNode(id, _label, column, row) { summaries.push({ id, kind: 'policy', column, row }); },
    onUIScreenNode(id, _label, column, row) { summaries.push({ id, kind: 'uiScreen', column, row }); },
  };
  board.describeTo(projection);
  return summaries;
}
