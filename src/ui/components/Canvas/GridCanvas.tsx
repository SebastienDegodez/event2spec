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
  ReactFlowProvider,
  type Node,
  type Edge,
  type OnNodeDrag,
  type Connection,
  type OnEdgesChange,
  applyEdgeChanges,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useBoard, useBoardActions, useLinks } from '../../../core/store/useBoardStore';
import { type BoardProjection } from '../../../core/domain/BoardProjection';
import { type NodeKind } from '../../../core/domain/NodeKind';
import { resolveConnectionType } from '../../../core/domain/resolveConnectionType';
import { DomainEventNode, type DomainEventNodeData } from './DomainEventNode';
import { CommandNodeComponent, type CommandNodeData } from './CommandNodeComponent';
import { ReadModelNodeComponent, type ReadModelNodeData } from './ReadModelNodeComponent';
import { PolicyNodeComponent, type PolicyNodeData } from './PolicyNodeComponent';
import { UIScreenNodeComponent, type UIScreenNodeData } from './UIScreenNodeComponent';
import { ContextMenu } from './ContextMenu';
import { type ContextMenuState } from './ContextMenuState';
import { GRID_SIZE, NOTE_SIZE, COMMAND_NODE_COLOR, DOMAIN_EVENT_NODE_COLOR, READ_MODEL_NODE_COLOR, POLICY_NODE_COLOR, UI_SCREEN_NODE_COLOR, EDGE_COLOR, DRAG_NODE_TYPE_MIME, domainNodeToPixelPosition, pixelToGrid } from './gridConstants';

const nodeTypes = {
  domainEvent: DomainEventNode,
  command: CommandNodeComponent,
  readModel: ReadModelNodeComponent,
  policy: PolicyNodeComponent,
  uiScreen: UIScreenNodeComponent,
};

function GridCanvasInner() {
  const board = useBoard();
  const links = useLinks();
  const { addDomainEventNode, addCommandNode, addReadModelNode, addPolicyNode, addUIScreenNode, moveNode, addLink, removeLink } = useBoardActions();
  const { screenToFlowPosition } = useReactFlow();
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);

  // Map domain nodes to React Flow nodes via visitor (column/row to x/y pixels)
  const reactFlowNodes = useMemo<Node<DomainEventNodeData | CommandNodeData | ReadModelNodeData | PolicyNodeData | UIScreenNodeData>[]>(
    () => {
      const result: Node<DomainEventNodeData | CommandNodeData | ReadModelNodeData | PolicyNodeData | UIScreenNodeData>[] = [];

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
    [board]
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

  // On drag stop: convert pixel position back to grid coordinates and dispatch
  const onNodeDragStop: OnNodeDrag<Node<DomainEventNodeData | CommandNodeData | ReadModelNodeData | PolicyNodeData | UIScreenNodeData>> = useCallback(
    (_event, node) => {
      const { column, row } = pixelToGrid(node.position.x, node.position.y);
      moveNode(node.id, column, row);
    },
    [moveNode]
  );

  const closeContextMenu = useCallback(() => setContextMenu(null), []);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const nodeType = event.dataTransfer.getData(DRAG_NODE_TYPE_MIME);
      if (!nodeType) return;

      const flowPosition = screenToFlowPosition({ x: event.clientX, y: event.clientY });
      const { column, row } = pixelToGrid(flowPosition.x, flowPosition.y);
      const id = `${nodeType}-${crypto.randomUUID()}`;

      if (nodeType === 'domain-event') {
        addDomainEventNode(id, 'Domain Event', column, row);
      } else if (nodeType === 'command') {
        addCommandNode(id, 'Command', column, row);
      } else if (nodeType === 'read-model') {
        addReadModelNode(id, 'Read Model', column, row);
      } else if (nodeType === 'policy') {
        addPolicyNode(id, 'Policy', column, row);
      } else if (nodeType === 'ui-screen') {
        addUIScreenNode(id, 'UI Screen', column, row);
      }
    },
    [addDomainEventNode, addCommandNode, addReadModelNode, addPolicyNode, addUIScreenNode, screenToFlowPosition]
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
      style={{ width: '100%', height: '100%' }}
      data-testid="grid-canvas"
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        isValidConnection={isValidConnection}
        onNodeDragStop={onNodeDragStop}
        onNodeContextMenu={onNodeContextMenu}
        onPaneContextMenu={onPaneContextMenu}
        onPaneClick={closeContextMenu}
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

export function GridCanvas() {
  return (
    <ReactFlowProvider>
      <GridCanvasInner />
    </ReactFlowProvider>
  );
}
