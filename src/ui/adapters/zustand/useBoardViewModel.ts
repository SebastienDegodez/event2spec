import { useMemo } from 'react';
import { BoardViewModel, type BoardViewModelActions, type BoardViewModelState } from '../../../frontend/application/viewmodels/BoardViewModel';
import {
  useBoard,
  useLinks,
  useSlices,
  useBoundedContexts,
  useSelectedNode,
  useNodeProperties,
  useSelectedSliceRange,
  useActiveSliceInspectorId,
  useAutoEditNodeId,
  useBoardActions,
  useSliceActions,
  useColumnSelectionActions,
  useBoundedContextActions,
  useBoardStore,
} from './useBoardStore';

export function useBoardViewModel(): BoardViewModel {
  const board = useBoard();
  const links = useLinks();
  const slices = useSlices();
  const boundedContexts = useBoundedContexts();
  const selectedNode = useSelectedNode();
  const nodeProperties = useNodeProperties();
  const selectedSliceRange = useSelectedSliceRange();
  const activeSliceInspectorId = useActiveSliceInspectorId();
  const autoEditNodeId = useAutoEditNodeId();
  const activeSliceInspectorMode = useBoardStore((state) => state.activeSliceInspectorMode);

  const boardActions = useBoardActions();
  const sliceActions = useSliceActions();
  const columnSelectionActions = useColumnSelectionActions();
  const boundedContextActions = useBoundedContextActions();

  const state = useMemo<BoardViewModelState>(
    () => ({
      board,
      links,
      slices,
      boundedContexts,
      selectedNode,
      nodeProperties,
      selectedSliceRange,
      activeSliceInspectorId,
      activeSliceInspectorMode,
      autoEditNodeId,
    }),
    [
      board,
      links,
      slices,
      boundedContexts,
      selectedNode,
      nodeProperties,
      selectedSliceRange,
      activeSliceInspectorId,
      activeSliceInspectorMode,
      autoEditNodeId,
    ]
  );

  const actions = useMemo<BoardViewModelActions>(
    () => ({
      ...boardActions,
      ...sliceActions,
      ...columnSelectionActions,
      ...boundedContextActions,
    }),
    [boardActions, sliceActions, columnSelectionActions, boundedContextActions]
  );

  return useMemo(() => new BoardViewModel(state, actions), [state, actions]);
}
