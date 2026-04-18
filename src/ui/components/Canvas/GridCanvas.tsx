import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  useReactFlow,
  useViewport,
  ReactFlowProvider,
  type Node,
  type Edge,
  type OnNodeDrag,
  type Connection,
  type OnEdgesChange,
  applyEdgeChanges,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useBoard, useBoardActions, useLinks, useSlices, useSliceActions, useSelectedSliceRange, useColumnSelectionActions, useBoundedContexts, useBoundedContextActions } from '../../../core/store/useBoardStore';
import { type BoundedContextRowColor } from './BoundedContextRowColor';
import { type NodeKind } from '../../../core/domain/node/NodeKind';
import { resolveConnectionType } from '../../../core/domain/resolveConnectionType';
import { type DomainEventNodeData } from './DomainEventNode';
import { ContextMenuLayer } from './ContextMenuLayer';
import { type ContextMenuState } from './ContextMenuState';
import { SliceOverlayLayer } from './SliceOverlayLayer';
import { FixedRowLabelColumn } from './FixedRowLabelColumn';
import { SliceHeaderStrip, type SliceHeaderEntry } from './SliceHeaderStrip';
import { buildContextMenuItems } from './buildContextMenuItems';
import { buildSliceOverlayEntries } from './buildSliceOverlayEntries';
import { buildSliceHeaderEntries } from './buildSliceHeaderEntries';
import { buildVisibleColumns } from './buildVisibleColumns';
import { BoundedContextModalLayer } from './BoundedContextModalLayer';
import { CanvasFlowDecorations } from './CanvasFlowDecorations';
import { buildBoundedContextRowRenderData } from './buildBoundedContextRowRenderData';
import { buildBoardRenderData } from './buildBoardRenderData';
import { buildReactFlowEdges } from './buildReactFlowEdges';
import { buildReactFlowNodes } from './buildReactFlowNodes';
import { canvasNodeTypes } from './canvasNodeTypes';
import { GRID_SIZE, NOTE_SIZE, domainNodeToPixelPosition, pixelToGrid } from './gridConstants';
import { useViewportCells } from '../../hooks/useViewportCells';
import { useBoundedContextModals } from '../../hooks/useBoundedContextModals';

const ROW_BACKGROUND_OFFSET_X = 0;
const FIXED_ROWS: readonly number[] = [0, 1] as const;
const BOUNDED_CONTEXT_ROW_COLORS: readonly BoundedContextRowColor[] = ['yellow', 'blue', 'red', 'grey'] as const;

function GridCanvasInner() {
  const board = useBoard();
  const links = useLinks();
  const slices = useSlices();
  const boundedContexts = useBoundedContexts();
  const { createBoundedContext, renameBoundedContext, deleteBoundedContext } = useBoundedContextActions();
  const { openSliceInspector, deleteSlice } = useSliceActions();
  const { addDomainEventNode, addNodeWithAutoLinks, moveNode, addLink, removeLink, selectNode, deselectNode } = useBoardActions();
  const { screenToFlowPosition } = useReactFlow();
  const viewport = useViewport();
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);
  const selectedSliceRange = useSelectedSliceRange();
  const { startSliceSelection, extendSelectedSliceRangeRight, clearSliceSelection } = useColumnSelectionActions();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 800, height: 600 });

  const {
    editingBoundedContextId,
    editingBoundedContextName,
    deleteConfirmingBcId,
    deleteConfirmingBcName,
    handleStartRenameBoundedContext,
    handleStartDeleteBoundedContext,
    handleConfirmRenameBoundedContext,
    handleCancelRenameBoundedContext,
    handleConfirmDeleteBoundedContext,
    handleCancelDeleteBoundedContext,
    handleCreateBoundedContext,
  } = useBoundedContextModals({ deleteBoundedContext, renameBoundedContext, createBoundedContext });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setContainerSize({ width, height });
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Collect bounded-context row backgrounds (rows 2+).
  const boundedContextRowRenderData = useMemo(() => {
    return buildBoundedContextRowRenderData({
      board,
      boundedContexts,
      rowColors: BOUNDED_CONTEXT_ROW_COLORS,
      rowBackgroundOffsetX: ROW_BACKGROUND_OFFSET_X,
      gridSize: GRID_SIZE,
    });
  }, [
    board,
    boundedContexts,
  ]);

  const boardRenderData = useMemo(() => {
    return buildBoardRenderData({
      board,
      boundedContextRowBackgroundNodes: boundedContextRowRenderData.bgNodes,
      boundedContextRows: boundedContextRowRenderData.rows,
      fixedRows: FIXED_ROWS,
      noteSize: NOTE_SIZE,
      positionFor: domainNodeToPixelPosition,
    });
  }, [board, boundedContextRowRenderData]);

  const viewportCells = useViewportCells({
    viewport,
    containerWidth: containerSize.width,
    containerHeight: containerSize.height,
    occupiedCells: boardRenderData.occupiedCells,
    rows: boardRenderData.rowsToRender,
  });

  const reactFlowNodes = useMemo<Node[]>(
    () => buildReactFlowNodes(boardRenderData.actualNodes, viewportCells, NOTE_SIZE),
    [boardRenderData, viewportCells]
  );

  // Create edges from links
  const reactFlowEdges = useMemo<Edge[]>(
    () => buildReactFlowEdges(links),
    [links]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(reactFlowNodes);
  const [edges, setEdges] = useEdgesState(reactFlowEdges);

  // Keep React Flow nodes in sync whenever the board state changes
  useEffect(() => {
    setNodes(reactFlowNodes);
  }, [reactFlowNodes, setNodes]);

  // Keep React Flow edges in sync whenever links change
  useEffect(() => {
    setEdges(reactFlowEdges);
  }, [reactFlowEdges, setEdges]);

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => {
      const deletions = changes.filter((c) => c.type === 'remove');
      deletions.forEach((c) => {
        if (c.type !== 'remove') return;
        const edge = edges.find((e) => e.id === c.id);
        if (edge) removeLink(edge.source, edge.target);
      });
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [edges, removeLink, setEdges]
  );

  const isValidConnection = useCallback(
    (connection: Edge | Connection) => {
      if (!connection.source || !connection.target) return false;
      const sourceNode = nodes.find((n) => n.id === connection.source);
      const targetNode = nodes.find((n) => n.id === connection.target);
      if (!sourceNode?.type || !targetNode?.type) return false;
      return resolveConnectionType(sourceNode.type as NodeKind, targetNode.type as NodeKind) !== null;
    },
    [nodes]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      if (!connection.source || !connection.target) return;
      const sourceNode = nodes.find((n) => n.id === connection.source);
      const targetNode = nodes.find((n) => n.id === connection.target);
      if (!sourceNode?.type || !targetNode?.type) return;
      const connectionType = resolveConnectionType(sourceNode.type as NodeKind, targetNode.type as NodeKind);
      if (!connectionType) return;
      addLink(connection.source, connection.target, connectionType);
    },
    [nodes, addLink]
  );

  // On drag stop: convert pixel position back to grid coordinates and dispatch (skip row backgrounds and quick-add placeholders)
  const onNodeDragStop: OnNodeDrag<Node> = useCallback(
    (_event, node) => {
      if (node.type === 'boundedContextRowBackground' || node.type === 'cellQuickAdd') return;
      const { column, row } = pixelToGrid(node.position.x, node.position.y);
      moveNode(node.id, column, row);
    },
    [moveNode]
  );

  const closeContextMenu = useCallback(() => setContextMenu(null), []);

  // Click on a node: select it to open the properties panel
  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      if (node.type === 'boundedContextRowBackground' || node.type === 'cellQuickAdd') return;
      const nodeData = node.data as DomainEventNodeData;
      selectNode(node.id, node.type as NodeKind, nodeData.label);
    },
    [selectNode]
  );

  // Click on the pane: close context menu, deselect the node and start slice range selection.
  const onPaneClick = useCallback((event: React.MouseEvent) => {
    setContextMenu(null);
    clearSliceSelection();
    const flowPosition = screenToFlowPosition({ x: event.clientX, y: event.clientY });
    const { column } = pixelToGrid(flowPosition.x, flowPosition.y);
    startSliceSelection(column);
    deselectNode();
  }, [clearSliceSelection, deselectNode, screenToFlowPosition, startSliceSelection]);

  const addEventAtPosition = useCallback(
    (column: number, row: number) => {
      addDomainEventNode(`domain-event-${crypto.randomUUID()}`, 'Domain Event', column, row);
    },
    [addDomainEventNode]
  );

  const addNodeAtPosition = useCallback(
    (kind: NodeKind, label: string, column: number, row: number) => {
      const id = `${kind}-${crypto.randomUUID()}`;
      addNodeWithAutoLinks(id, kind, label, column, row);
    },
    [addNodeWithAutoLinks]
  );

  // Right-click on a node: show insert before / insert after options
  const onNodeContextMenu = useCallback(
    (event: React.MouseEvent, node: Node) => {
      event.preventDefault();
      if (node.type === 'boundedContextRowBackground') return;
      const nodeData = node.data as { column: number; row: number };
      if (node.type === 'cellQuickAdd') {
        setContextMenu({
          x: event.clientX,
          y: event.clientY,
          column: nodeData.column,
          row: nodeData.row,
        });
        return;
      }
      setContextMenu({
        x: event.clientX,
        y: event.clientY,
        column: nodeData.column,
        row: nodeData.row,
        nodeId: node.id,
      });
    },
    []
  );

  // Right-click on the pane: show add domain event option
  const onPaneContextMenu = useCallback(
    (event: React.MouseEvent | MouseEvent) => {
      event.preventDefault();
      const flowPosition = screenToFlowPosition({ x: event.clientX, y: event.clientY });
      const { column, row } = pixelToGrid(flowPosition.x, flowPosition.y);
      setContextMenu({
        x: event.clientX,
        y: event.clientY,
        column,
        row,
      });
    },
    [screenToFlowPosition]
  );

  const contextMenuItems = useMemo(() => {
    return buildContextMenuItems({
      contextMenu,
      addEventAtPosition,
      addNodeAtPosition,
    });
  }, [contextMenu, addEventAtPosition, addNodeAtPosition]);

  const sliceOverlayEntries = useMemo(() => {
    return buildSliceOverlayEntries({
      slices,
      openSliceInspector,
      deleteSlice,
    });
  }, [deleteSlice, openSliceInspector, slices]);

  const visibleColumns = useMemo(() => {
    return buildVisibleColumns(viewportCells);
  }, [viewportCells]);

  const allHeaderEntries = useMemo<SliceHeaderEntry[]>(() => {
    return buildSliceHeaderEntries({
      sliceOverlayEntries,
      selectedSliceRange,
      isColumnCovered: (column: number) => slices.isColumnCovered(column),
      extendSelectedSliceRangeRight,
    });
  }, [sliceOverlayEntries, selectedSliceRange, slices, extendSelectedSliceRangeRight]);

  return (
    <div
      style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', flexDirection: 'column' }}
      data-testid="grid-canvas"
    >
      {/* Slice header strip — dedicated row above the swimlanes */}
      <div style={{ display: 'flex', flexShrink: 0 }}>
        <div className="slice-header-corner" />
        <SliceHeaderStrip
          entries={allHeaderEntries}
          viewport={viewport}
          hitboxColumns={visibleColumns}
          onHitboxClick={startSliceSelection}
        />
      </div>
      {/* Main canvas area */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>
        <FixedRowLabelColumn
          viewport={viewport}
          boundedContextRows={boundedContextRowRenderData.rows}
          onCreateBoundedContext={handleCreateBoundedContext}
          onDeleteBoundedContext={handleStartDeleteBoundedContext}
          onStartEditBoundedContext={handleStartRenameBoundedContext}
        />
        <div ref={containerRef} style={{ flex: 1, position: 'relative' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            isValidConnection={isValidConnection}
            onNodeDragStop={onNodeDragStop}
            onNodeClick={onNodeClick}
            onNodeContextMenu={onNodeContextMenu}
            onPaneContextMenu={onPaneContextMenu}
            onPaneClick={onPaneClick}
            onMoveStart={closeContextMenu}
            nodeTypes={canvasNodeTypes}
            snapToGrid
            snapGrid={[GRID_SIZE, GRID_SIZE]}
            translateExtent={[[0, 0], [Infinity, Infinity]]}
            zoomOnDoubleClick={false}
            fitView={false}
            minZoom={0.3}
            maxZoom={2}
            deleteKeyCode="Delete"
            proOptions={{ hideAttribution: false }}
          >
            <CanvasFlowDecorations />
          </ReactFlow>

          <SliceOverlayLayer
            sliceOverlayEntries={sliceOverlayEntries}
            selectedSliceRange={selectedSliceRange}
            viewport={viewport}
            height={containerSize.height}
          />
          <ContextMenuLayer
            contextMenu={contextMenu}
            items={contextMenuItems}
            onClose={closeContextMenu}
          />
        </div>
      </div>
      <BoundedContextModalLayer
        editingBoundedContextId={editingBoundedContextId}
        editingBoundedContextName={editingBoundedContextName}
        onConfirmRename={handleConfirmRenameBoundedContext}
        onCancelRename={handleCancelRenameBoundedContext}
        deleteConfirmingBcId={deleteConfirmingBcId}
        deleteConfirmingBcName={deleteConfirmingBcName}
        onConfirmDelete={handleConfirmDeleteBoundedContext}
        onCancelDelete={handleCancelDeleteBoundedContext}
      />
    </div>
  );
}

export function GridCanvas() {
  return (
    <ReactFlowProvider>
      <GridCanvasInner />
    </ReactFlowProvider>
  );
}
