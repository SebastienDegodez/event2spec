import { useCallback, useEffect, useMemo } from 'react';
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
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useBoard, useBoardActions, useLinks } from '../../../core/store/useBoardStore';
import { DomainEventNode as DomainEventNodeDomain } from '../../../core/domain/DomainEventNode';
import { CommandNode as CommandNodeDomain } from '../../../core/domain/CommandNode';
import { DomainEventNode, type DomainEventNodeData } from './DomainEventNode';
import { CommandNodeComponent, type CommandNodeData } from './CommandNodeComponent';
import { GRID_SIZE, NOTE_SIZE, domainNodeToPixelPosition, pixelToGrid } from './gridConstants';

const nodeTypes = {
  domainEvent: DomainEventNode,
  command: CommandNodeComponent,
};

function GridCanvasInner() {
  const board = useBoard();
  const links = useLinks();
  const { addNode, moveNode } = useBoardActions();
  const { screenToFlowPosition } = useReactFlow();

  // Map domain nodes → React Flow nodes (column/row → x/y pixels)
  const rfNodes = useMemo<Node<DomainEventNodeData | CommandNodeData>[]>(
    () =>
      board.toArray().map((domainNode) => {
        const gridPos = domainNode.gridPosition();
        const pos = domainNodeToPixelPosition(gridPos);
        const isCommand = domainNode instanceof CommandNodeDomain;
        const isDomainEvent = domainNode instanceof DomainEventNodeDomain;
        return {
          id: domainNode.id,
          type: isCommand ? 'command' : isDomainEvent ? 'domainEvent' : 'domainEvent',
          position: pos,
          data: {
            label: domainNode.label,
            column: gridPos.column,
            row: gridPos.row,
          },
          style: { width: NOTE_SIZE, height: NOTE_SIZE },
        };
      }),
    [board]
  );

  // Create edges from links
  const rfEdges = useMemo<Edge[]>(
    () =>
      links.map((link) => ({
        id: `edge-${link.commandNodeId}-${link.eventNodeId}`,
        source: link.commandNodeId,
        target: link.eventNodeId,
        sourceHandle: null,
        targetHandle: null,
        type: 'default',
        animated: true,
        style: { stroke: '#60a5fa', strokeWidth: 2 },
      })),
    [links]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(rfNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(rfEdges);

  // Keep React Flow nodes in sync whenever the board state changes
  useEffect(() => {
    setNodes(rfNodes);
  }, [rfNodes, setNodes]);

  // Keep React Flow edges in sync whenever links change
  useEffect(() => {
    setEdges(rfEdges);
  }, [rfEdges, setEdges]);

  // On drag stop: convert pixel position back to grid coordinates and dispatch
  const onNodeDragStop: OnNodeDrag<Node<DomainEventNodeData | CommandNodeData>> = useCallback(
    (_event, node) => {
      const { column, row } = pixelToGrid(node.position.x, node.position.y);
      moveNode(node.id, column, row);
    },
    [moveNode]
  );

  // Double-click on the pane: create a new Domain Event at the clicked grid cell
  const onPaneDoubleClick = useCallback(
    (event: React.MouseEvent) => {
      const flowPos = screenToFlowPosition({ x: event.clientX, y: event.clientY });
      const { column, row } = pixelToGrid(flowPos.x, flowPos.y);
      addNode(`domain-event-${crypto.randomUUID()}`, 'Domain Event', column, row);
    },
    [addNode, screenToFlowPosition]
  );

  return (
    <div
      style={{ width: '100%', height: '100%' }}
      data-testid="grid-canvas"
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeDragStop={onNodeDragStop}
        onDoubleClick={onPaneDoubleClick}
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
          variant={BackgroundVariant.Dots}
          gap={GRID_SIZE}
          size={2}
          color="rgba(255,255,255,0.12)"
        />
        <Controls position="bottom-right" />
        <MiniMap
          nodeColor={(node) => node.type === 'command' ? '#3b82f6' : '#f59e0b'}
          maskColor="rgba(15,15,25,0.7)"
          position="bottom-left"
        />
      </ReactFlow>
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
