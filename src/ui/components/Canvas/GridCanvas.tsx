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
  type OnNodeDrag,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useBoard, useBoardActions } from '../../../core/store/useBoardStore';
import { DomainEventNode, type DomainEventNodeData } from './DomainEventNode';
import { ContextMenu } from './ContextMenu';
import { type ContextMenuState } from './ContextMenuState';
import { GRID_SIZE, NOTE_SIZE, domainNodeToPixelPosition, pixelToGrid } from './gridConstants';

const nodeTypes = { domainEvent: DomainEventNode };

function GridCanvasInner() {
  const board = useBoard();
  const { addNode, moveNode } = useBoardActions();
  const { screenToFlowPosition } = useReactFlow();
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);

  // Map domain nodes → React Flow nodes (column/row → x/y pixels)
  const rfNodes = useMemo<Node<DomainEventNodeData>[]>(
    () =>
      board.toArray().map((domainNode) => {
        const gridPos = domainNode.gridPosition();
        const pos = domainNodeToPixelPosition(gridPos);
        return {
          id: domainNode.id,
          type: 'domainEvent',
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

  const [nodes, setNodes, onNodesChange] = useNodesState(rfNodes);
  const [edges, , onEdgesChange] = useEdgesState([]);

  // Keep React Flow nodes in sync whenever the board state changes
  useEffect(() => {
    setNodes(rfNodes);
  }, [rfNodes, setNodes]);

  // On drag stop: convert pixel position back to grid coordinates and dispatch
  const onNodeDragStop: OnNodeDrag<Node<DomainEventNodeData>> = useCallback(
    (_event, node) => {
      const { column, row } = pixelToGrid(node.position.x, node.position.y);
      moveNode(node.id, column, row);
    },
    [moveNode]
  );

  const closeContextMenu = useCallback(() => setContextMenu(null), []);

  // Right-click on a node: show insert before / insert after options
  const onNodeContextMenu = useCallback(
    (event: React.MouseEvent, node: Node<DomainEventNodeData>) => {
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
      const flowPos = screenToFlowPosition({ x: event.clientX, y: event.clientY });
      const { column, row } = pixelToGrid(flowPos.x, flowPos.y);
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
      addNode(`domain-event-${crypto.randomUUID()}`, 'Domain Event', column, row);
    },
    [addNode]
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
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
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
          nodeColor="#f59e0b"
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
