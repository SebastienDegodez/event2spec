import { useCallback, useEffect, useMemo, useState } from 'react';
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

import { useBoard, useBoardActions, useBoardMode, useLinks, useSwimlanes, useSelectedColumns, useColumnSelectionActions } from '../../../core/store/useBoardStore';
import { type BoardProjection } from '../../../core/domain/BoardProjection';
import { type SwimlaneProjection } from '../../../core/domain/SwimlaneProjection';
import { type ActorType } from '../../../core/domain/ActorType';
import { type SwimlaneColor } from '../../../core/domain/SwimlaneColor';
import { type NodeKind } from '../../../core/domain/NodeKind';
import { type BoardMode } from '../../../core/domain/BoardMode';
import { type SwimlaneCategory, SWIMLANE_CATEGORIES, ROWS_PER_SWIMLANE } from '../../../core/domain/SwimlaneCategory';
import { resolveConnectionType } from '../../../core/domain/resolveConnectionType';
import { DomainEventNode, type DomainEventNodeData } from './DomainEventNode';
import { CommandNodeComponent, type CommandNodeData } from './CommandNodeComponent';
import { ReadModelNodeComponent, type ReadModelNodeData } from './ReadModelNodeComponent';
import { PolicyNodeComponent, type PolicyNodeData } from './PolicyNodeComponent';
import { UIScreenNodeComponent, type UIScreenNodeData } from './UIScreenNodeComponent';
import { SwimlaneBackgroundNode, type SwimlaneBackgroundNodeData } from './SwimlaneBackgroundNode';
import { ContextMenu } from './ContextMenu';
import { type ContextMenuState } from './ContextMenuState';
import { GRID_SIZE, NOTE_SIZE, COMMAND_NODE_COLOR, DOMAIN_EVENT_NODE_COLOR, READ_MODEL_NODE_COLOR, POLICY_NODE_COLOR, UI_SCREEN_NODE_COLOR, EDGE_COLOR, domainNodeToPixelPosition, pixelToGrid } from './gridConstants';

const SWIMLANE_LABEL_OFFSET_X = -10000;

interface SwimlaneLabelEntry {
  id: string;
  actorName: string;
  actorType: ActorType;
  color: SwimlaneColor;
  index: number;
}

/** Human-readable labels for swimlane categories. */
const CATEGORY_LABELS: Record<SwimlaneCategory, string> = {
  actor_ui: 'UI / Actor',
  command_readmodel: 'Cmd / Read',
  event: 'Event',
};

const nodeTypes = {
  domainEvent: DomainEventNode,
  command: CommandNodeComponent,
  readModel: ReadModelNodeComponent,
  policy: PolicyNodeComponent,
  uiScreen: UIScreenNodeComponent,
  swimlane: SwimlaneBackgroundNode,
};

function GridCanvasInner() {
  const board = useBoard();
  const links = useLinks();
  const swimlanes = useSwimlanes();
  const boardMode = useBoardMode();
  const { addDomainEventNode, moveNode, addLink, removeLink, selectNode, deselectNode } = useBoardActions();
  const { screenToFlowPosition } = useReactFlow();
  const viewport = useViewport();
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);
  const selectedColumns = useSelectedColumns();
  const { selectColumns, clearColumnSelection } = useColumnSelectionActions();

  // Collect swimlane background nodes AND label entries in a single projection pass
  const swimlaneRenderData = useMemo(() => {
    const bgNodes: Node<SwimlaneBackgroundNodeData>[] = [];
    const labels: SwimlaneLabelEntry[] = [];
    const isSwimlaneMode = boardMode === 'swimlane';
    const projection: SwimlaneProjection = {
      onSwimlane(id, actorName, actorType, color, index) {
        if (isSwimlaneMode) {
          // Each swimlane occupies ROWS_PER_SWIMLANE rows in swimlane mode
          const baseRow = index * ROWS_PER_SWIMLANE;
          bgNodes.push({
            id: `swimlane-bg-${id}`,
            type: 'swimlane',
            position: { x: SWIMLANE_LABEL_OFFSET_X, y: baseRow * GRID_SIZE },
            data: { actorName, color, rowSpan: ROWS_PER_SWIMLANE },
            style: { width: 20000, height: GRID_SIZE * ROWS_PER_SWIMLANE },
            draggable: false,
            selectable: false,
            focusable: false,
            zIndex: -1,
          });
        } else {
          bgNodes.push({
            id: `swimlane-bg-${id}`,
            type: 'swimlane',
            position: { x: SWIMLANE_LABEL_OFFSET_X, y: index * GRID_SIZE },
            data: { actorName, color, rowSpan: 1 },
            style: { width: 20000, height: GRID_SIZE },
            draggable: false,
            selectable: false,
            focusable: false,
            zIndex: -1,
          });
        }
        labels.push({ id, actorName, actorType, color, index });
      },
    };
    swimlanes.describeTo(projection);
    return { bgNodes, labels };
  }, [swimlanes, boardMode]);

  // Map domain nodes to React Flow nodes via visitor (column/row to x/y pixels)
  const reactFlowNodes = useMemo<Node<DomainEventNodeData | CommandNodeData | ReadModelNodeData | PolicyNodeData | UIScreenNodeData | SwimlaneBackgroundNodeData>[]>(
    () => {
      const result: Node<DomainEventNodeData | CommandNodeData | ReadModelNodeData | PolicyNodeData | UIScreenNodeData | SwimlaneBackgroundNodeData>[] = [
        ...swimlaneRenderData.bgNodes,
      ];

      const createFlowNode = (id: string, label: string, column: number, row: number, type: 'domainEvent' | 'command' | 'readModel' | 'policy' | 'uiScreen') => {
        const position = domainNodeToPixelPosition({ column, row });
        result.push({ id, type, position, data: { label, column, row }, style: { width: NOTE_SIZE, height: NOTE_SIZE } });
      };

      const projection: BoardProjection = {
        onDomainEventNode(id, label, column, row) { createFlowNode(id, label, column, row, 'domainEvent'); },
        onCommandNode(id, label, column, row) { createFlowNode(id, label, column, row, 'command'); },
        onReadModelNode(id, label, column, row) { createFlowNode(id, label, column, row, 'readModel'); },
        onPolicyNode(id, label, column, row) { createFlowNode(id, label, column, row, 'policy'); },
        onUIScreenNode(id, label, column, row) { createFlowNode(id, label, column, row, 'uiScreen'); },
      };

      board.describeTo(projection);
      return result;
    },
    [board, swimlaneRenderData]
  );

  // Create edges from links
  const reactFlowEdges = useMemo<Edge[]>(
    () =>
      links.map((link) => ({
        id: `edge-${link.sourceNodeId}-${link.targetNodeId}`,
        source: link.sourceNodeId,
        target: link.targetNodeId,
        sourceHandle: null,
        targetHandle: null,
        type: 'default',
        animated: true,
        label: link.connectionType,
        style: { stroke: EDGE_COLOR, strokeWidth: 2 },
        labelStyle: { fill: '#fff', fontWeight: 600, fontSize: 11 },
        labelBgStyle: { fill: 'rgba(30,30,40,0.75)', rx: 4 },
      })),
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

  // On drag stop: convert pixel position back to grid coordinates and dispatch (skip swimlane bands)
  const onNodeDragStop: OnNodeDrag<Node<DomainEventNodeData | CommandNodeData | ReadModelNodeData | PolicyNodeData | UIScreenNodeData | SwimlaneBackgroundNodeData>> = useCallback(
    (_event, node) => {
      if (node.type === 'swimlane') return;
      const { column, row } = pixelToGrid(node.position.x, node.position.y);
      moveNode(node.id, column, row);
    },
    [moveNode]
  );

  const closeContextMenu = useCallback(() => setContextMenu(null), []);

  // Click on a node: select it to open the properties panel
  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      if (node.type === 'swimlane') return;
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

  // Double-click on the pane: create a new Domain Event at the clicked grid cell
  const onPaneDoubleClick = useCallback(
    (event: React.MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest('.react-flow__node')) return;
      const flowPosition = screenToFlowPosition({ x: event.clientX, y: event.clientY });
      const { column, row } = pixelToGrid(flowPosition.x, flowPosition.y);
      addDomainEventNode(`domain-event-${crypto.randomUUID()}`, 'Domain Event', column, row);
    },
    [addDomainEventNode, screenToFlowPosition]
  );

  // Right-click on a node: show insert before / insert after options
  const onNodeContextMenu = useCallback(
    (event: React.MouseEvent, node: Node) => {
      event.preventDefault();
      const nodeData = node.data as DomainEventNodeData;
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

  const addEventAtPosition = useCallback(
    (column: number, row: number) => {
      addDomainEventNode(`domain-event-${crypto.randomUUID()}`, 'Domain Event', column, row);
    },
    [addDomainEventNode]
  );

  const contextMenuItems = useMemo(() => {
    if (!contextMenu) return [];
    if (contextMenu.nodeId) {
      return [
        { label: 'Insert event before', onClick: () => addEventAtPosition(contextMenu.column, contextMenu.row) },
        { label: 'Insert event after', onClick: () => addEventAtPosition(contextMenu.column + 1, contextMenu.row) },
      ];
    }
    return [
      { label: 'Add domain event', onClick: () => addEventAtPosition(contextMenu.column, contextMenu.row) },
    ];
  }, [contextMenu, addEventAtPosition]);

  return (
    <div
      style={{ width: '100%', height: '100%', position: 'relative' }}
      data-testid="grid-canvas"
    >
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
        onDoubleClick={onPaneDoubleClick}
        onMoveStart={closeContextMenu}
        nodeTypes={nodeTypes}
        snapToGrid
        snapGrid={[GRID_SIZE, GRID_SIZE]}
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
      {!swimlanes.isEmpty() && (
        <SwimlaneLabelOverlay
          labels={swimlaneRenderData.labels}
          boardMode={boardMode}
          viewport={viewport}
        />
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
  );
}

/** Renders swimlane labels on the left side, adapting to the current board mode. */
function SwimlaneLabelOverlay({ labels, boardMode, viewport }: {
  labels: SwimlaneLabelEntry[];
  boardMode: BoardMode;
  viewport: { x: number; y: number; zoom: number };
}) {
  const isSwimlaneMode = boardMode === 'swimlane';
  return (
    <div className="swimlane-labels-overlay" aria-hidden="true">
      {labels.map((entry) => {
        const rowMultiplier = isSwimlaneMode ? ROWS_PER_SWIMLANE : 1;
        const top = entry.index * rowMultiplier * GRID_SIZE * viewport.zoom + viewport.y;
        const height = rowMultiplier * GRID_SIZE * viewport.zoom;
        return (
          <div
            key={entry.id}
            className={`swimlane-label swimlane-label--${entry.color}`}
            style={{ top, height }}
          >
            <span className="swimlane-label-text">{entry.actorName}</span>
            <span className="swimlane-label-type">{entry.actorType.replace('_', ' ')}</span>
            {isSwimlaneMode && (
              <div className="swimlane-category-labels">
                {SWIMLANE_CATEGORIES.map((cat, i) => (
                  <div
                    key={cat}
                    className="swimlane-category-label"
                    style={{
                      top: i * GRID_SIZE * viewport.zoom,
                      height: GRID_SIZE * viewport.zoom,
                    }}
                  >
                    {CATEGORY_LABELS[cat]}
                  </div>
                ))}
              </div>
            )}
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
