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
});
