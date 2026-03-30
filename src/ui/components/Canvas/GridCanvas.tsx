import { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  type Node,
  type OnNodeDrag,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useBoardStore } from '../../../core/store/useBoardStore';
import { DomainEventNode, type DomainEventNodeData } from './DomainEventNode';
import { GRID_SIZE, NOTE_SIZE, gridToPixel, pixelToGrid } from './gridConstants';

const nodeTypes = { domainEvent: DomainEventNode };

function GridCanvasInner() {
  const { nodes: storeNodes, addNode, moveNode } = useBoardStore();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  // Map Zustand grid nodes → React Flow nodes (col/row → x/y pixels)
  const rfNodes = useMemo<Node<DomainEventNodeData>[]>(
    () =>
      storeNodes.map((n) => {
        const pos = gridToPixel(n.col, n.row);
        return {
          id: n.id,
          type: 'domainEvent',
          position: pos,
          data: { label: n.label },
          style: { width: NOTE_SIZE, height: NOTE_SIZE },
        };
      }),
    [storeNodes]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(rfNodes);
  const [edges, , onEdgesChange] = useEdgesState([]);

  // Keep React Flow nodes in sync whenever the Zustand store changes
  useEffect(() => {
    setNodes(rfNodes);
  }, [rfNodes, setNodes]);

  // On drag stop: convert pixel position back to grid coordinates and update store
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
      const wrapper = reactFlowWrapper.current;
      if (!wrapper) return;

      const bounds = wrapper.getBoundingClientRect();
      const rawX = event.clientX - bounds.left;
      const rawY = event.clientY - bounds.top;

      // Translate screen coordinates into React Flow world coordinates
      const flowEl = wrapper.querySelector('.react-flow__viewport') as HTMLElement | null;
      if (!flowEl) return;
      const matrix = new DOMMatrixReadOnly(window.getComputedStyle(flowEl).transform);
      const worldX = (rawX - matrix.m41) / matrix.m11;
      const worldY = (rawY - matrix.m42) / matrix.m11;

      const { col, row } = pixelToGrid(worldX, worldY);
      addNode({ label: 'Domain Event', col, row });
    },
    [addNode]
  );

  return (
    <div ref={reactFlowWrapper} style={{ width: '100%', height: '100%' }}>
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
