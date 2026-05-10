import { createDefaultNodeProperties, type NodeProperties } from '../../../core/domain/node/NodeProperties';
import { type GridBoard } from '../../../core/domain/board/GridBoard';
import { type NodeLink } from '../../../core/domain/node/NodeLink';
import { type ConnectionType } from '../../../core/domain/ConnectionType';
import { type NodeKind } from '../../../core/domain/node/NodeKind';
import { type VerticalSliceCollection } from '../../../core/domain/vertical-slice/VerticalSliceCollection';
import { type BoundedContextCollection } from '../../../core/domain/bounded-context/BoundedContextCollection';
import { ValidateModelQuery } from '../../../core/usecases/queries/ValidateModel/ValidateModelQuery';
import { ValidateModelQueryHandler } from '../../../core/usecases/queries/ValidateModel/ValidateModelQueryHandler';
import { type ValidationWarning } from '../../../core/domain/validation/ValidationWarning';

export interface SelectedNodeView {
  id: string;
  type: NodeKind;
  label: string;
}

export interface BoardViewModelState {
  board: GridBoard;
  links: ReadonlyArray<NodeLink>;
  slices: VerticalSliceCollection;
  boundedContexts: BoundedContextCollection;
  selectedNode: SelectedNodeView | null;
  nodeProperties: Record<string, NodeProperties>;
  selectedSliceRange: { startColumn: number; columnCount: number } | null;
  activeSliceInspectorId: string | null;
  activeSliceInspectorMode: 'details' | 'scenarios' | null;
  autoEditNodeId: string | null;
}

export interface BoardViewModelActions {
  addDomainEventNode: (id: string, label: string, column: number, row: number) => void;
  addCommandNode: (id: string, label: string, column: number, row: number, linkedEventId?: string) => void;
  addReadModelNode: (id: string, label: string, column: number, row: number) => void;
  addPolicyNode: (id: string, label: string, column: number, row: number) => void;
  addUIScreenNode: (id: string, label: string, column: number, row: number) => void;
  moveNode: (id: string, column: number, row: number) => void;
  updateLabel: (id: string, label: string) => void;
  removeNode: (id: string) => void;
  addLink: (sourceNodeId: string, targetNodeId: string, connectionType: ConnectionType) => void;
  removeLink: (sourceNodeId: string, targetNodeId: string) => void;
  selectNode: (id: string, type: NodeKind, label: string) => void;
  deselectNode: () => void;
  updateNodeProperties: (id: string, properties: NodeProperties) => void;
  createSlice: (id: string, name: string, commandId: string, eventIds: string[], readModelId: string, startColumn?: number, columnCount?: number) => void;
  renameSlice: (id: string, name: string) => void;
  deleteSlice: (id: string) => void;
  openSliceInspector: (sliceId: string, mode?: 'details' | 'scenarios') => void;
  closeSliceInspector: () => void;
  extendSliceRight: (sliceId: string) => void;
  addScenarioToSlice: (sliceId: string, given: string[], when: string, then: string[]) => void;
  removeScenarioFromSlice: (sliceId: string, scenarioIndex: number) => void;
  updateScenarioInSlice: (sliceId: string, scenarioIndex: number, given: string[], when: string, then: string[]) => void;
  createBoundedContext: (id: string, name: string, insertIndex?: number) => void;
  deleteBoundedContext: (id: string) => void;
  renameBoundedContext: (id: string, name: string) => void;
  assignSliceToBoundedContext: (sliceId: string, boundedContextId: string | undefined) => void;
  startSliceSelection: (column: number) => void;
  extendSelectedSliceRangeRight: () => void;
  clearSliceSelection: () => void;
  addNodeWithAutoLinks: (id: string, kind: NodeKind, label: string, column: number, row: number) => void;
  clearAutoEditNodeId: () => void;
  exportJSON: () => string;
  exportMarkdown: () => string;
}

export class BoardViewModel {
  readonly board: GridBoard;
  readonly links: ReadonlyArray<NodeLink>;
  readonly slices: VerticalSliceCollection;
  readonly boundedContexts: BoundedContextCollection;
  readonly selectedNode: SelectedNodeView | null;
  readonly nodeProperties: Record<string, NodeProperties>;
  readonly selectedSliceRange: { startColumn: number; columnCount: number } | null;
  readonly activeSliceInspectorId: string | null;
  readonly activeSliceInspectorMode: 'details' | 'scenarios' | null;
  readonly autoEditNodeId: string | null;

  private readonly actions: BoardViewModelActions;

  constructor(state: BoardViewModelState, actions: BoardViewModelActions) {
    this.board = state.board;
    this.links = state.links;
    this.slices = state.slices;
    this.boundedContexts = state.boundedContexts;
    this.selectedNode = state.selectedNode;
    this.nodeProperties = state.nodeProperties;
    this.selectedSliceRange = state.selectedSliceRange;
    this.activeSliceInspectorId = state.activeSliceInspectorId;
    this.activeSliceInspectorMode = state.activeSliceInspectorMode;
    this.autoEditNodeId = state.autoEditNodeId;
    this.actions = actions;
  }

  selectedNodeProperties(): NodeProperties | null {
    if (!this.selectedNode) return null;
    return this.nodeProperties[this.selectedNode.id] ?? createDefaultNodeProperties(this.selectedNode.type);
  }

  validationWarnings(): ReadonlyArray<ValidationWarning> {
    const queryHandler = new ValidateModelQueryHandler({
      loadBoard: () => this.board,
      loadLinks: () => this.links,
    });

    return queryHandler.handle(new ValidateModelQuery());
  }

  commands(): BoardViewModelActions {
    return this.actions;
  }
}
