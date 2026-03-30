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
  type OnNodeDrag,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useBoardStore } from '../../../core/store/useBoardStore';
import { DomainEventNode, type DomainEventNodeData } from './DomainEventNode';
import { GRID_SIZE, NOTE_SIZE, gridToPixel, pixelToGrid } from './gridConstants';

const nodeTypes = { domainEvent: DomainEventNode };

let _nextId = 1;

function GridCanvasInner() {
  const { board, addNode, moveNode } = useBoardStore();
  const { screenToFlowPosition } = useReactFlow();

  // Map domain nodes → React Flow nodes (col/row → x/y pixels)
  const rfNodes = useMemo<Node<DomainEventNodeData>[]>(
    () =>
      board.toArray().map((n) => {
        const pos = gridToPixel(n.position.col, n.position.row);
        return {
          id: n.id,
          type: 'domainEvent',
          position: pos,
          data: { label: n.label, col: n.position.col, row: n.position.row },
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
      const { col, row } = pixelToGrid(node.position.x, node.position.y);
      moveNode(node.id, col, row);
    },
    [moveNode]
  );

  // Double-click on the pane: create a new Domain Event at the clicked grid cell
  const onPaneDoubleClick = useCallback(
    (event: React.MouseEvent) => {
      const flowPos = screenToFlowPosition({ x: event.clientX, y: event.clientY });
      const { col, row } = pixelToGrid(flowPos.x, flowPos.y);
      addNode(`event-${_nextId++}`, 'Domain Event', col, row);
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
          nodeColor="#f59e0b"
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
