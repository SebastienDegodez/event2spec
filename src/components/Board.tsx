import { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  type Node,
  type OnNodeDrag,
  ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useBoardStore } from '../store/boardStore';
import { DomainEventNode, type DomainEventNodeData } from './DomainEventNode';
import { GRID_SIZE, NOTE_SIZE, gridToPixel, pixelToGrid } from '../constants';

const nodeTypes = { domainEvent: DomainEventNode };

function BoardInner() {
  const { events, addEvent, moveEvent } = useBoardStore();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const rfNodes = useMemo<Node<DomainEventNodeData>[]>(() =>
    events.map((e) => {
      const pos = gridToPixel(e.col, e.row);
      return {
        id: e.id,
        type: 'domainEvent',
        position: pos,
        data: { label: e.label },
        style: { width: NOTE_SIZE, height: NOTE_SIZE },
      };
    }),
    [events]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(rfNodes);
  const [edges, , onEdgesChange] = useEdgesState([]);

  // Keep RF nodes in sync with store when store changes
  useEffect(() => {
    setNodes(rfNodes);
  }, [events, setNodes]);

  const onNodeDragStop: OnNodeDrag<Node<DomainEventNodeData>> = useCallback(
    (_event, node) => {
      const { col, row } = pixelToGrid(node.position.x, node.position.y);
      moveEvent(node.id, col, row);
    },
    [moveEvent]
  );

  const onPaneDoubleClick = useCallback(
    (event: React.MouseEvent) => {
      const wrapper = reactFlowWrapper.current;
      if (!wrapper) return;

      const bounds = wrapper.getBoundingClientRect();
      const rawX = event.clientX - bounds.left;
      const rawY = event.clientY - bounds.top;

      // Account for viewport transform (panning / zoom) via the flow container
      const flowEl = wrapper.querySelector('.react-flow__viewport') as HTMLElement | null;
      if (!flowEl) return;
      const style = window.getComputedStyle(flowEl);
      const matrix = new DOMMatrixReadOnly(style.transform);
      const zoom = matrix.m11;
      const panX = matrix.m41;
      const panY = matrix.m42;

      const worldX = (rawX - panX) / zoom;
      const worldY = (rawY - panY) / zoom;

      const { col, row } = pixelToGrid(worldX, worldY);
      addEvent('Domain Event', col, row);
    },
    [addEvent]
  );

  return (
    <div ref={reactFlowWrapper} style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeDragStop={onNodeDragStop}
        onPaneClick={undefined}
        onDoubleClick={onPaneDoubleClick}
        nodeTypes={nodeTypes}
        snapToGrid
        snapGrid={[GRID_SIZE, GRID_SIZE]}
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

export function Board() {
  return (
    <ReactFlowProvider>
      <BoardInner />
    </ReactFlowProvider>
  );
}
