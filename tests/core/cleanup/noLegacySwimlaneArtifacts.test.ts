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

  it('groups vertical slice aggregate files under a dedicated domain subfolder', () => {
    expect(existsSync(pathInRepo('src/core/domain/VerticalSlice.ts'))).toBe(false);
    expect(existsSync(pathInRepo('src/core/domain/VerticalSliceCollection.ts'))).toBe(false);
    expect(existsSync(pathInRepo('src/core/domain/VerticalSliceProjection.ts'))).toBe(false);

    expect(existsSync(pathInRepo('src/core/domain/vertical-slice/VerticalSlice.ts'))).toBe(true);
    expect(existsSync(pathInRepo('src/core/domain/vertical-slice/VerticalSliceCollection.ts'))).toBe(true);
    expect(existsSync(pathInRepo('src/core/domain/vertical-slice/VerticalSliceProjection.ts'))).toBe(true);
  });
});
