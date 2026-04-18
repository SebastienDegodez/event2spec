/// <reference types="node" />
import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const repoRoot = process.cwd();

function pathInRepo(...segments: string[]): string {
  return join(repoRoot, ...segments);
}

describe('legacy swimlane cleanup', () => {
  it('removes dead swimlane domain and use case artifacts', () => {
    const removedPaths = [
      'src/core/domain/Swimlane.ts',
      'src/core/domain/SwimlaneCategory.ts',
      'src/core/domain/SwimlaneCollection.ts',
      'src/core/domain/SwimlaneLayout.ts',
      'src/core/domain/SwimlaneProjection.ts',
      'src/core/domain/SwimlaneRepository.ts',
      'src/core/domain/nodeKindToCategory.ts',
      'tests/helpers/InMemorySwimlaneRepository.ts',
      'tests/helpers/collectSwimlanes.ts',
      'tests/core/domain/SwimlaneLayout.test.ts',
      'tests/core/domain/nodeKindToCategory.test.ts',
    ];

    for (const relativePath of removedPaths) {
      expect(existsSync(pathInRepo(relativePath)), relativePath).toBe(false);
    }
  });

  it('renames bounded context row UI artifacts and removes old swimlane css', () => {
    expect(existsSync(pathInRepo('src/ui/components/Canvas/SwimlaneBackgroundNode.tsx'))).toBe(false);
    expect(existsSync(pathInRepo('src/ui/components/Canvas/BoundedContextRowBackgroundNode.tsx'))).toBe(true);

    const appCss = readFileSync(pathInRepo('src/App.css'), 'utf8');
    expect(appCss.includes('.swimlane-panel')).toBe(false);
    expect(appCss.includes('.swimlane-label')).toBe(false);
    expect(appCss.includes('.swimlane-category-label')).toBe(false);
  });

  it('extracts fixed row labels into a dedicated canvas component', () => {
    expect(existsSync(pathInRepo('src/ui/components/Canvas/FixedRowLabelColumn.tsx'))).toBe(true);

    const gridCanvas = readFileSync(pathInRepo('src/ui/components/Canvas/GridCanvas.tsx'), 'utf8');
    expect(gridCanvas.includes('function FixedRowLabelColumn(')).toBe(false);
  });

  it('extracts the slice header strip into a dedicated canvas component', () => {
    expect(existsSync(pathInRepo('src/ui/components/Canvas/SliceHeaderStrip.tsx'))).toBe(true);

    const gridCanvas = readFileSync(pathInRepo('src/ui/components/Canvas/GridCanvas.tsx'), 'utf8');
    expect(gridCanvas.includes('function SliceHeaderStrip(')).toBe(false);
  });

  it('extracts context menu item construction into a dedicated helper', () => {
    expect(existsSync(pathInRepo('src/ui/components/Canvas/buildContextMenuItems.ts'))).toBe(true);

    const gridCanvas = readFileSync(pathInRepo('src/ui/components/Canvas/GridCanvas.tsx'), 'utf8');
    expect(gridCanvas.includes('Insert event before')).toBe(false);
    expect(gridCanvas.includes('Insert event after')).toBe(false);
    expect(gridCanvas.includes('Add domain event')).toBe(false);
  });

  it('extracts slice overlay entry construction into a dedicated helper', () => {
    expect(existsSync(pathInRepo('src/ui/components/Canvas/buildSliceOverlayEntries.ts'))).toBe(true);

    const gridCanvas = readFileSync(pathInRepo('src/ui/components/Canvas/GridCanvas.tsx'), 'utf8');
    expect(gridCanvas.includes('slices.describeTo({')).toBe(false);
  });

  it('extracts slice header entry construction into a dedicated helper', () => {
    expect(existsSync(pathInRepo('src/ui/components/Canvas/buildSliceHeaderEntries.ts'))).toBe(true);

    const gridCanvas = readFileSync(pathInRepo('src/ui/components/Canvas/GridCanvas.tsx'), 'utf8');
    expect(gridCanvas.includes('label: `Columns ${selectedSliceRange.startColumn}-${selectedSliceRange.startColumn + selectedSliceRange.columnCount - 1}`')).toBe(false);
  });

  it('extracts visible column calculation into a dedicated helper', () => {
    expect(existsSync(pathInRepo('src/ui/components/Canvas/buildVisibleColumns.ts'))).toBe(true);

    const gridCanvas = readFileSync(pathInRepo('src/ui/components/Canvas/GridCanvas.tsx'), 'utf8');
    expect(gridCanvas.includes('for (let column = 0; column <= 20; column += 1)')).toBe(false);
  });

  it('extracts slice hitbox column calculation into a dedicated helper', () => {
    expect(existsSync(pathInRepo('src/ui/components/Canvas/buildSliceHitboxColumns.ts'))).toBe(true);

    const gridCanvas = readFileSync(pathInRepo('src/ui/components/Canvas/GridCanvas.tsx'), 'utf8');
    expect(gridCanvas.includes('visibleColumns.filter((col) => !slices.isColumnCovered(col))')).toBe(false);
  });

  it('extracts minimap node color mapping into a dedicated helper', () => {
    expect(existsSync(pathInRepo('src/ui/components/Canvas/resolveMiniMapNodeColor.ts'))).toBe(true);

    const gridCanvas = readFileSync(pathInRepo('src/ui/components/Canvas/GridCanvas.tsx'), 'utf8');
    expect(gridCanvas.includes("if (node.type === 'command') return COMMAND_NODE_COLOR;")).toBe(false);
  });

  it('extracts slice overlay rendering layer into a dedicated canvas component', () => {
    expect(existsSync(pathInRepo('src/ui/components/Canvas/SliceOverlayLayer.tsx'))).toBe(true);

    const gridCanvas = readFileSync(pathInRepo('src/ui/components/Canvas/GridCanvas.tsx'), 'utf8');
    expect(gridCanvas.includes('className="slice-overlay-layer"')).toBe(false);
  });

  it('extracts context menu rendering layer into a dedicated canvas component', () => {
    expect(existsSync(pathInRepo('src/ui/components/Canvas/ContextMenuLayer.tsx'))).toBe(true);

    const gridCanvas = readFileSync(pathInRepo('src/ui/components/Canvas/GridCanvas.tsx'), 'utf8');
    expect(gridCanvas.includes('{contextMenu && (')).toBe(false);
  });

  it('extracts bounded context modal rendering into a dedicated canvas component', () => {
    expect(existsSync(pathInRepo('src/ui/components/Canvas/BoundedContextModalLayer.tsx'))).toBe(true);

    const gridCanvas = readFileSync(pathInRepo('src/ui/components/Canvas/GridCanvas.tsx'), 'utf8');
    expect(gridCanvas.includes('title="Rename Bounded Context"')).toBe(false);
    expect(gridCanvas.includes('title="Delete Bounded Context?"')).toBe(false);
  });

  it('extracts minimap rendering into a dedicated canvas component', () => {
    expect(existsSync(pathInRepo('src/ui/components/Canvas/CanvasMiniMap.tsx'))).toBe(true);

    const gridCanvas = readFileSync(pathInRepo('src/ui/components/Canvas/GridCanvas.tsx'), 'utf8');
    expect(gridCanvas.includes('maskColor="rgba(15,15,25,0.7)"')).toBe(false);
  });

  it('extracts react flow visual decorations into a dedicated canvas component', () => {
    expect(existsSync(pathInRepo('src/ui/components/Canvas/CanvasFlowDecorations.tsx'))).toBe(true);

    const gridCanvas = readFileSync(pathInRepo('src/ui/components/Canvas/GridCanvas.tsx'), 'utf8');
    expect(gridCanvas.includes('<Background')).toBe(false);
    expect(gridCanvas.includes('<Controls position="bottom-right"')).toBe(false);
  });

  it('extracts bounded context row render-data builder into a dedicated helper', () => {
    expect(existsSync(pathInRepo('src/ui/components/Canvas/buildBoundedContextRowRenderData.ts'))).toBe(true);

    const gridCanvas = readFileSync(pathInRepo('src/ui/components/Canvas/GridCanvas.tsx'), 'utf8');
    expect(gridCanvas.includes('domainEventCountByBoundedContextId')).toBe(false);
  });

  it('extracts canvas node type mapping into a dedicated module', () => {
    expect(existsSync(pathInRepo('src/ui/components/Canvas/canvasNodeTypes.ts'))).toBe(true);

    const gridCanvas = readFileSync(pathInRepo('src/ui/components/Canvas/GridCanvas.tsx'), 'utf8');
    expect(gridCanvas.includes('const nodeTypes = {')).toBe(false);
  });

  it('extracts board render-data builder into a dedicated helper', () => {
    expect(existsSync(pathInRepo('src/ui/components/Canvas/buildBoardRenderData.ts'))).toBe(true);

    const gridCanvas = readFileSync(pathInRepo('src/ui/components/Canvas/GridCanvas.tsx'), 'utf8');
    expect(gridCanvas.includes('const createFlowNode = (')).toBe(false);
  });

  it('extracts bounded context modals hook into a dedicated hook', () => {
    expect(existsSync(pathInRepo('src/ui/hooks/useBoundedContextModals.ts'))).toBe(true);

    const gridCanvas = readFileSync(pathInRepo('src/ui/components/Canvas/GridCanvas.tsx'), 'utf8');
    expect(gridCanvas.includes('setRenamingBoundedContext') || gridCanvas.includes('setEditingBoundedContextId')).toBe(false);
  });

  it('extracts react flow nodes builder into a dedicated helper', () => {
    expect(existsSync(pathInRepo('src/ui/components/Canvas/buildReactFlowNodes.ts'))).toBe(true);

    const gridCanvas = readFileSync(pathInRepo('src/ui/components/Canvas/GridCanvas.tsx'), 'utf8');
    expect(gridCanvas.includes("type: 'cellQuickAdd'")).toBe(false);
  });

  it('extracts react flow edges builder into a dedicated helper', () => {
    expect(existsSync(pathInRepo('src/ui/components/Canvas/buildReactFlowEdges.ts'))).toBe(true);

    const gridCanvas = readFileSync(pathInRepo('src/ui/components/Canvas/GridCanvas.tsx'), 'utf8');
    expect(gridCanvas.includes('const HANDLE_MAP')).toBe(false);
  });

  it('groups vertical slice aggregate files under a dedicated domain subfolder', () => {
    expect(existsSync(pathInRepo('src/core/domain/VerticalSlice.ts'))).toBe(false);
    expect(existsSync(pathInRepo('src/core/domain/VerticalSliceCollection.ts'))).toBe(false);
    expect(existsSync(pathInRepo('src/core/domain/VerticalSliceProjection.ts'))).toBe(false);

    expect(existsSync(pathInRepo('src/core/domain/vertical-slice/VerticalSlice.ts'))).toBe(true);
    expect(existsSync(pathInRepo('src/core/domain/vertical-slice/VerticalSliceCollection.ts'))).toBe(true);
    expect(existsSync(pathInRepo('src/core/domain/vertical-slice/VerticalSliceProjection.ts'))).toBe(true);
  });

  it('groups bounded context files under a dedicated domain subfolder', () => {
    expect(existsSync(pathInRepo('src/core/domain/BoundedContext.ts'))).toBe(false);
    expect(existsSync(pathInRepo('src/core/domain/BoundedContextCollection.ts'))).toBe(false);
    expect(existsSync(pathInRepo('src/core/domain/BoundedContextProjection.ts'))).toBe(false);
    expect(existsSync(pathInRepo('src/core/domain/BoundedContextRepository.ts'))).toBe(false);

    expect(existsSync(pathInRepo('src/core/domain/bounded-context/BoundedContext.ts'))).toBe(true);
    expect(existsSync(pathInRepo('src/core/domain/bounded-context/BoundedContextCollection.ts'))).toBe(true);
    expect(existsSync(pathInRepo('src/core/domain/bounded-context/BoundedContextProjection.ts'))).toBe(true);
    expect(existsSync(pathInRepo('src/core/domain/bounded-context/BoundedContextRepository.ts'))).toBe(true);
  });

  it('groups board files under a dedicated domain subfolder', () => {
    expect(existsSync(pathInRepo('src/core/domain/GridBoard.ts'))).toBe(false);
    expect(existsSync(pathInRepo('src/core/domain/GridBoardRepository.ts'))).toBe(false);
    expect(existsSync(pathInRepo('src/core/domain/BoardNode.ts'))).toBe(false);
    expect(existsSync(pathInRepo('src/core/domain/BoardProjection.ts'))).toBe(false);
    expect(existsSync(pathInRepo('src/core/domain/GridPosition.ts'))).toBe(false);

    expect(existsSync(pathInRepo('src/core/domain/board/GridBoard.ts'))).toBe(true);
    expect(existsSync(pathInRepo('src/core/domain/board/GridBoardRepository.ts'))).toBe(true);
    expect(existsSync(pathInRepo('src/core/domain/board/BoardNode.ts'))).toBe(true);
    expect(existsSync(pathInRepo('src/core/domain/board/BoardProjection.ts'))).toBe(true);
    expect(existsSync(pathInRepo('src/core/domain/board/GridPosition.ts'))).toBe(true);
  });

  it('groups node files under a dedicated domain subfolder', () => {
    const nodeFiles = [
      'DomainEventNode.ts', 'CommandNode.ts', 'ReadModelNode.ts',
      'PolicyNode.ts', 'UIScreenNode.ts', 'NodeKind.ts', 'NodeLink.ts', 'NodeProperties.ts',
    ];
    for (const f of nodeFiles) {
      expect(existsSync(pathInRepo(`src/core/domain/${f}`))).toBe(false);
      expect(existsSync(pathInRepo(`src/core/domain/node/${f}`))).toBe(true);
    }
  });
});
