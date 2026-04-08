import { describe, it, expect } from 'vitest';
import { resolveAutoLinks, type BoardNodeSummary } from '../../../src/core/domain/resolveAutoLinks';

describe('resolveAutoLinks', () => {
  it('creates a triggers link when command is added above a domain event', () => {
    const existingNodes: BoardNodeSummary[] = [
      { id: 'ev1', kind: 'domainEvent', column: 0, row: 2 },
    ];

    const links = resolveAutoLinks('cmd1', 'command', 0, 1, existingNodes);

    expect(links).toEqual([
      { sourceNodeId: 'cmd1', targetNodeId: 'ev1', connectionType: 'triggers' },
    ]);
  });

  it('creates a feeds link when domain event is above a read model', () => {
    const existingNodes: BoardNodeSummary[] = [
      { id: 'rm1', kind: 'readModel', column: 0, row: 2 },
    ];

    const links = resolveAutoLinks('ev1', 'domainEvent', 0, 1, existingNodes);

    expect(links).toEqual([
      { sourceNodeId: 'ev1', targetNodeId: 'rm1', connectionType: 'feeds' },
    ]);
  });

  it('creates incoming link from an existing node above', () => {
    const existingNodes: BoardNodeSummary[] = [
      { id: 'ui1', kind: 'uiScreen', column: 3, row: 0 },
    ];

    const links = resolveAutoLinks('cmd1', 'command', 3, 1, existingNodes);

    expect(links).toEqual([
      { sourceNodeId: 'ui1', targetNodeId: 'cmd1', connectionType: 'user action' },
    ]);
  });

  it('ignores nodes in a different column', () => {
    const existingNodes: BoardNodeSummary[] = [
      { id: 'ev1', kind: 'domainEvent', column: 1, row: 2 },
    ];

    const links = resolveAutoLinks('cmd1', 'command', 0, 1, existingNodes);

    expect(links).toEqual([]);
  });

  it('ignores nodes that are not adjacent (more than 1 row away)', () => {
    const existingNodes: BoardNodeSummary[] = [
      { id: 'ev1', kind: 'domainEvent', column: 0, row: 5 },
    ];

    const links = resolveAutoLinks('cmd1', 'command', 0, 1, existingNodes);

    expect(links).toEqual([]);
  });

  it('does not create link when connection type is not allowed', () => {
    const existingNodes: BoardNodeSummary[] = [
      { id: 'rm1', kind: 'readModel', column: 0, row: 1 },
    ];

    const links = resolveAutoLinks('cmd1', 'command', 0, 0, existingNodes);

    expect(links).toEqual([]);
  });

  it('creates links with multiple adjacent nodes', () => {
    const existingNodes: BoardNodeSummary[] = [
      { id: 'ui1', kind: 'uiScreen', column: 2, row: 0 },
      { id: 'ev1', kind: 'domainEvent', column: 2, row: 2 },
    ];

    const links = resolveAutoLinks('cmd1', 'command', 2, 1, existingNodes);

    expect(links).toHaveLength(2);
    expect(links).toContainEqual({ sourceNodeId: 'ui1', targetNodeId: 'cmd1', connectionType: 'user action' });
    expect(links).toContainEqual({ sourceNodeId: 'cmd1', targetNodeId: 'ev1', connectionType: 'triggers' });
  });
});
