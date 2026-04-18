import { DomainEventNode } from './DomainEventNode';
import { CommandNodeComponent } from './CommandNodeComponent';
import { ReadModelNodeComponent } from './ReadModelNodeComponent';
import { PolicyNodeComponent } from './PolicyNodeComponent';
import { UIScreenNodeComponent } from './UIScreenNodeComponent';
import { BoundedContextRowBackgroundNode } from './BoundedContextRowBackgroundNode';
import { CellQuickAddNode } from './CellQuickAddNode';

export const canvasNodeTypes = {
  domainEvent: DomainEventNode,
  command: CommandNodeComponent,
  readModel: ReadModelNodeComponent,
  policy: PolicyNodeComponent,
  uiScreen: UIScreenNodeComponent,
  boundedContextRowBackground: BoundedContextRowBackgroundNode,
  cellQuickAdd: CellQuickAddNode,
};