import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
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

import { useBoard, useBoardActions, useLinks, useSelectedColumns, useColumnSelectionActions, useBoundedContexts } from '../../../core/store/useBoardStore';
import { type BoardProjection } from '../../../core/domain/BoardProjection';
import { type BoundedContextProjection } from '../../../core/domain/BoundedContextProjection';
import { type SwimlaneColor } from '../../../core/domain/SwimlaneColor';
import { type NodeKind } from '../../../core/domain/NodeKind';
import { resolveConnectionType } from '../../../core/domain/resolveConnectionType';
import { cellNodeOptions } from '../../../core/domain/CellNodeOptions';
import { DomainEventNode, type DomainEventNodeData } from './DomainEventNode';
import { CommandNodeComponent } from './CommandNodeComponent';
import { ReadModelNodeComponent } from './ReadModelNodeComponent';
import { PolicyNodeComponent } from './PolicyNodeComponent';
import { UIScreenNodeComponent } from './UIScreenNodeComponent';
import { BoundedContextRowBackgroundNode, type BoundedContextRowBackgroundNodeData } from './BoundedContextRowBackgroundNode';
import { CellQuickAddNode } from './CellQuickAddNode';
import { ContextMenu } from './ContextMenu';
import { type ContextMenuState } from './ContextMenuState';
import { GRID_SIZE, NOTE_SIZE, COMMAND_NODE_COLOR, DOMAIN_EVENT_NODE_COLOR, READ_MODEL_NODE_COLOR, POLICY_NODE_COLOR, UI_SCREEN_NODE_COLOR, EDGE_COLOR, domainNodeToPixelPosition, pixelToGrid } from './gridConstants';
import { useViewportCells } from '../../hooks/useViewportCells';

const ROW_BACKGROUND_OFFSET_X = -10000;
const FIXED_ROWS: readonly number[] = [0, 1] as const;
const BOUNDED_CONTEXT_ROW_COLORS: readonly SwimlaneColor[] = ['yellow', 'blue', 'red', 'grey'] as const;

interface BoundedContextRowEntry {
  id: string;
  name: string;
  index: number;
  color: SwimlaneColor;
}

const nodeTypes = {
  domainEvent: DomainEventNode,
  command: CommandNodeComponent,
  readModel: ReadModelNodeComponent,
  policy: PolicyNodeComponent,
  uiScreen: UIScreenNodeComponent,
  boundedContextRowBackground: BoundedContextRowBackgroundNode,
  cellQuickAdd: CellQuickAddNode,
};

function GridCanvasInner() {
  const board = useBoard();
  const links = useLinks();
  const boundedContexts = useBoundedContexts();
  const { addDomainEventNode, addNodeWithAutoLinks, moveNode, addLink, removeLink, selectNode, deselectNode } = useBoardActions();
  const { screenToFlowPosition } = useReactFlow();
  const viewport = useViewport();
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);
  const selectedColumns = useSelectedColumns();
  const { selectColumns, clearColumnSelection } = useColumnSelectionActions();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 800, height: 600 });

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

  // Compute the minimum column per absolute row from board nodes.
  const minColumnPerRow = useMemo(() => {
    const map = new Map<number, number>();
    const recordMinimumColumn = (_id: string, _label: string, column: number, row: number) => {
      const current = map.get(row);
      if (current === undefined || column < current) {
        map.set(row, column);
      }
    };
    const projection: BoardProjection = {
      onDomainEventNode: recordMinimumColumn,
      onCommandNode: recordMinimumColumn,
      onReadModelNode: recordMinimumColumn,
      onPolicyNode: recordMinimumColumn,
      onUIScreenNode: recordMinimumColumn,
    };
    board.describeTo(projection);
    return map;
  }, [board]);

  // Collect bounded-context row backgrounds (rows 2+).
  const boundedContextRowRenderData = useMemo(() => {
    const bgNodes: Node<BoundedContextRowBackgroundNodeData>[] = [];
    const rows: BoundedContextRowEntry[] = [];
    const projection: BoundedContextProjection = {
      onBoundedContext(id, name) {
        const index = rows.length;
        const row = 2 + index;
        const color = BOUNDED_CONTEXT_ROW_COLORS[index % BOUNDED_CONTEXT_ROW_COLORS.length];
        const startColumn = minColumnPerRow.get(row);
        const startX = startColumn !== undefined ? startColumn * GRID_SIZE : ROW_BACKGROUND_OFFSET_X;
        bgNodes.push({
          id: `bounded-context-row-bg-${id}`,
          type: 'boundedContextRowBackground',
          position: { x: startX, y: row * GRID_SIZE },
          data: { name, color },
          style: { width: 20000, height: GRID_SIZE },
          draggable: false,
          selectable: false,
          focusable: false,
          zIndex: -1,
        });
        rows.push({ id, name, index, color });
      },
    };
    boundedContexts.describeTo(projection);
    return { bgNodes, rows };
  }, [boundedContexts, minColumnPerRow]);

  const boardRenderData = useMemo(() => {
    const actualNodes: Node[] = [
      ...boundedContextRowRenderData.bgNodes,
    ];
    const occupiedCells = new Set<string>();

    const createFlowNode = (id: string, label: string, column: number, row: number, type: 'domainEvent' | 'command' | 'readModel' | 'policy' | 'uiScreen') => {
      const position = domainNodeToPixelPosition({ column, row });
      actualNodes.push({ id, type, position, data: { label, column, row }, style: { width: NOTE_SIZE, height: NOTE_SIZE } });
      occupiedCells.add(`${column},${row}`);
    };

    const projection: BoardProjection = {
      onDomainEventNode(id, label, column, row) { createFlowNode(id, label, column, row, 'domainEvent'); },
      onCommandNode(id, label, column, row) { createFlowNode(id, label, column, row, 'command'); },
      onReadModelNode(id, label, column, row) { createFlowNode(id, label, column, row, 'readModel'); },
      onPolicyNode(id, label, column, row) { createFlowNode(id, label, column, row, 'policy'); },
      onUIScreenNode(id, label, column, row) { createFlowNode(id, label, column, row, 'uiScreen'); },
    };
    board.describeTo(projection);

    const boundedContextRows = boundedContextRowRenderData.rows.map((entry) => 2 + entry.index);
    const rowsToRender = [...FIXED_ROWS, ...boundedContextRows];

    return { actualNodes, occupiedCells, rowsToRender };
  }, [board, boundedContextRowRenderData]);

  const viewportCells = useViewportCells({
    viewport,
    containerWidth: containerSize.width,
    containerHeight: containerSize.height,
    occupiedCells: boardRenderData.occupiedCells,
    rows: boardRenderData.rowsToRender,
  });

  const reactFlowNodes = useMemo<Node[]>(
    () => {
      const result: Node[] = [...boardRenderData.actualNodes];

      for (const { column, row } of viewportCells) {
        const options = cellNodeOptions(row);
        const position = domainNodeToPixelPosition({ column, row });
        result.push({
          id: `quick-add-${column}-${row}`,
          type: 'cellQuickAdd',
          position,
          data: { column, row, options },
          style: { width: NOTE_SIZE, height: NOTE_SIZE },
          draggable: false,
          selectable: false,
          focusable: false,
        });
      }

      return result;
    },
    [boardRenderData, viewportCells]
  );

  // Create edges from links
  const reactFlowEdges = useMemo<Edge[]>(
    () => {
      const HANDLE_MAP: Record<string, { sourceHandle: string; targetHandle: string }> = {
        'triggers':        { sourceHandle: 'bottom',     targetHandle: 'top' },        // Command→DomainEvent ↓
        'feeds':           { sourceHandle: 'top-out',    targetHandle: 'bottom' },     // DomainEvent→ReadModel ↑
        'triggers policy': { sourceHandle: 'top-out',    targetHandle: 'bottom' },     // DomainEvent→Policy ↑
        'executes':        { sourceHandle: 'right',      targetHandle: 'left' },       // Policy→Command →
        'user action':     { sourceHandle: 'bottom-out', targetHandle: 'top' },        // UIScreen→Command ↓
        'displays':        { sourceHandle: 'top',        targetHandle: 'bottom' },     // ReadModel→UIScreen ↑
      };
      return links.map((link) => {
        const handles = HANDLE_MAP[link.connectionType] ?? { sourceHandle: null, targetHandle: null };
        return {
          id: `edge-${link.sourceNodeId}-${link.targetNodeId}`,
          source: link.sourceNodeId,
          target: link.targetNodeId,
          sourceHandle: handles.sourceHandle,
          targetHandle: handles.targetHandle,
          type: 'default',
          animated: true,
          label: link.connectionType,
          style: { stroke: EDGE_COLOR, strokeWidth: 2 },
          labelStyle: { fill: '#fff', fontWeight: 600, fontSize: 11 },
          labelBgStyle: { fill: 'rgba(30,30,40,0.75)', rx: 4 },
        };
      });
    },
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

  // Click on the pane: close context menu and deselect node (or toggle column selection with Alt key)
  const onPaneClick = useCallback((event: React.MouseEvent) => {
    setContextMenu(null);
    if (event.altKey) {
      const flowPosition = screenToFlowPosition({ x: event.clientX, y: event.clientY });
      const { column } = pixelToGrid(flowPosition.x, flowPosition.y);
      const already = selectedColumns.includes(column);
      if (already) {
        selectColumns(selectedColumns.filter((c) => c !== column));
      } else if (selectedColumns.length < 2) {
        selectColumns([...selectedColumns, column]);
      } else {
        selectColumns([selectedColumns[1], column]);
      }
      return;
    }
    clearColumnSelection();
    deselectNode();
  }, [deselectNode, screenToFlowPosition, selectedColumns, selectColumns, clearColumnSelection]);

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
    if (!contextMenu) return [];

    // Offer category-specific node types for empty pane clicks
    if (!contextMenu.nodeId) {
      const options = cellNodeOptions(contextMenu.row);
      return options.map((opt) => ({
        label: `Add ${opt.label}`,
        onClick: () => addNodeAtPosition(opt.kind, opt.label, contextMenu.column, contextMenu.row),
      }));
    }

    if (contextMenu.nodeId) {
      return [
        { label: 'Insert event before', onClick: () => addEventAtPosition(contextMenu.column, contextMenu.row) },
        { label: 'Insert event after', onClick: () => addEventAtPosition(contextMenu.column + 1, contextMenu.row) },
      ];
    }
    return [
      { label: 'Add domain event', onClick: () => addEventAtPosition(contextMenu.column, contextMenu.row) },
    ];
  }, [contextMenu, addEventAtPosition, addNodeAtPosition]);

  return (
    <div
      style={{ width: '100%', height: '100%', position: 'relative', display: 'flex' }}
      data-testid="grid-canvas"
    >
      <FixedRowLabelColumn viewport={viewport} boundedContextRows={boundedContextRowRenderData.rows} />
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
          nodeTypes={nodeTypes}
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
          <Background
            variant={BackgroundVariant.Cross}
            gap={GRID_SIZE}
            size={6}
            color="rgba(255,255,255,0.18)"
          />
          <Controls position="bottom-right" />
          <MiniMap
            nodeColor={(node) => {
              if (node.type === 'command') return COMMAND_NODE_COLOR;
              if (node.type === 'readModel') return READ_MODEL_NODE_COLOR;
              if (node.type === 'policy') return POLICY_NODE_COLOR;
              if (node.type === 'uiScreen') return UI_SCREEN_NODE_COLOR;
              return DOMAIN_EVENT_NODE_COLOR;
            }}
            maskColor="rgba(15,15,25,0.7)"
            position="bottom-left"
          />
        </ReactFlow>
        {selectedColumns.length > 0 && (
          <div className="column-selection-overlay" aria-hidden="true">
            {selectedColumns.map((col) => {
              const x = col * GRID_SIZE * viewport.zoom + viewport.x;
              const width = GRID_SIZE * viewport.zoom;
              return (
                <div
                  key={col}
                  className="column-selection-highlight"
                  style={{ left: x, width }}
                />
              );
            })}
          </div>
        )}
        {contextMenu && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            items={contextMenuItems}
            onClose={closeContextMenu}
          />
        )}
      </div>
    </div>
  );
}

const FIXED_ROW_LABEL_COLOR: Record<string, string> = {
  yellow: 'rgba(253, 224, 71, 0.35)',
  blue: 'rgba(96, 165, 250, 0.35)',
  red: 'rgba(248, 113, 113, 0.35)',
  grey: 'rgba(156, 163, 175, 0.35)',
};

function FixedRowLabelColumn({ viewport, boundedContextRows }: {
  viewport: { x: number; y: number; zoom: number };
  boundedContextRows: readonly BoundedContextRowEntry[];
}) {
  const rowHeight = GRID_SIZE * viewport.zoom;

  return (
    <div className="fixed-row-labels-column" aria-label="Row labels">
      <div
        className="fixed-row-label fixed-row-label--ui"
        style={{ top: 0 * GRID_SIZE * viewport.zoom + viewport.y, height: rowHeight }}
      >
        UI
      </div>
      <div
        className="fixed-row-label fixed-row-label--cmd"
        style={{ top: 1 * GRID_SIZE * viewport.zoom + viewport.y, height: rowHeight }}
      >
        Cmd · RM
      </div>
      {boundedContextRows.map((entry) => {
        const row = 2 + entry.index;
        return (
          <div
            key={entry.id}
            className="fixed-row-label fixed-row-label--bc"
            style={{
              top: row * GRID_SIZE * viewport.zoom + viewport.y,
              height: rowHeight,
              borderLeftColor: FIXED_ROW_LABEL_COLOR[entry.color] || FIXED_ROW_LABEL_COLOR.grey,
            }}
          >
            {entry.name}
          </div>
        );
      })}
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
