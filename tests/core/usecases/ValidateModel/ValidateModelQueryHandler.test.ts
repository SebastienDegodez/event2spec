import { describe, it, expect } from 'vitest';
import { GridBoard } from '../../../../src/core/domain/board/GridBoard';
import { DomainEventNode } from '../../../../src/core/domain/node/DomainEventNode';
import { CommandNode } from '../../../../src/core/domain/node/CommandNode';
import { ReadModelNode } from '../../../../src/core/domain/node/ReadModelNode';
import { PolicyNode } from '../../../../src/core/domain/node/PolicyNode';
import { UIScreenNode } from '../../../../src/core/domain/node/UIScreenNode';
import { type NodeLink } from '../../../../src/core/domain/node/NodeLink';
import { ValidateModelQuery } from '../../../../src/core/usecases/queries/ValidateModel/ValidateModelQuery';
import { ValidateModelQueryHandler } from '../../../../src/core/usecases/queries/ValidateModel/ValidateModelQueryHandler';

const handler = new ValidateModelQueryHandler();

describe('ValidateModelQueryHandler', () => {
  it('returns no warnings for an empty board', () => {
    const warnings = handler.handle(GridBoard.empty(), [], new ValidateModelQuery());

    expect(warnings).toEqual([]);
  });

  describe('domain event validation', () => {
    it('returns orphan warning when event has no triggering command', () => {
      const board = GridBoard.empty().insertNode(
        DomainEventNode.create('e1', 'OrderPlaced', 0, 0),
      );

      const warnings = handler.handle(board, [], new ValidateModelQuery());

      expect(warnings).toEqual([
        expect.objectContaining({
          nodeId: 'e1',
          nodeKind: 'domainEvent',
          warningType: 'orphan',
        }),
      ]);
    });

    it('returns no warning when event has a triggering command', () => {
      const board = GridBoard.empty()
        .insertNode(DomainEventNode.create('e1', 'OrderPlaced', 0, 0))
        .insertNode(CommandNode.create('c1', 'PlaceOrder', 0, 1));
      const links: NodeLink[] = [
        { sourceNodeId: 'c1', targetNodeId: 'e1', connectionType: 'triggers' },
      ];

      const warnings = handler.handle(board, links, new ValidateModelQuery());

      const eventWarnings = warnings.filter((w) => w.nodeId === 'e1');
      expect(eventWarnings).toEqual([]);
    });
  });

  describe('command validation', () => {
    it('returns incomplete warning when command produces no event', () => {
      const board = GridBoard.empty().insertNode(
        CommandNode.create('c1', 'PlaceOrder', 0, 0),
      );

      const warnings = handler.handle(board, [], new ValidateModelQuery());

      expect(warnings).toEqual([
        expect.objectContaining({
          nodeId: 'c1',
          nodeKind: 'command',
          warningType: 'incomplete',
        }),
      ]);
    });

    it('returns no warning when command triggers an event', () => {
      const board = GridBoard.empty()
        .insertNode(CommandNode.create('c1', 'PlaceOrder', 0, 0))
        .insertNode(DomainEventNode.create('e1', 'OrderPlaced', 1, 0));
      const links: NodeLink[] = [
        { sourceNodeId: 'c1', targetNodeId: 'e1', connectionType: 'triggers' },
      ];

      const warnings = handler.handle(board, links, new ValidateModelQuery());

      const commandWarnings = warnings.filter((w) => w.nodeId === 'c1');
      expect(commandWarnings).toEqual([]);
    });
  });

  describe('read model validation', () => {
    it('returns disconnected warning when read model has no event source', () => {
      const board = GridBoard.empty().insertNode(
        ReadModelNode.create('rm1', 'Order Summary', 0, 0),
      );

      const warnings = handler.handle(board, [], new ValidateModelQuery());

      expect(warnings).toEqual([
        expect.objectContaining({
          nodeId: 'rm1',
          nodeKind: 'readModel',
          warningType: 'disconnected',
        }),
      ]);
    });

    it('returns no warning when read model is fed by an event', () => {
      const board = GridBoard.empty()
        .insertNode(DomainEventNode.create('e1', 'OrderPlaced', 0, 0))
        .insertNode(ReadModelNode.create('rm1', 'Order Summary', 1, 0));
      const links: NodeLink[] = [
        { sourceNodeId: 'e1', targetNodeId: 'rm1', connectionType: 'feeds' },
      ];

      const warnings = handler.handle(board, links, new ValidateModelQuery());

      const readModelWarnings = warnings.filter((w) => w.nodeId === 'rm1');
      expect(readModelWarnings).toEqual([]);
    });
  });

  describe('policy validation', () => {
    it('returns disconnected warning when policy has no event source', () => {
      const board = GridBoard.empty().insertNode(
        PolicyNode.create('p1', 'AutoConfirm', 0, 0),
      );

      const warnings = handler.handle(board, [], new ValidateModelQuery());

      expect(warnings).toEqual([
        expect.objectContaining({
          nodeId: 'p1',
          nodeKind: 'policy',
          warningType: 'disconnected',
        }),
      ]);
    });

    it('returns disconnected warning when policy has event source but no command target', () => {
      const board = GridBoard.empty()
        .insertNode(DomainEventNode.create('e1', 'OrderPlaced', 0, 0))
        .insertNode(PolicyNode.create('p1', 'AutoConfirm', 1, 0));
      const links: NodeLink[] = [
        { sourceNodeId: 'e1', targetNodeId: 'p1', connectionType: 'triggers policy' },
      ];

      const warnings = handler.handle(board, links, new ValidateModelQuery());

      const policyWarnings = warnings.filter((w) => w.nodeId === 'p1');
      expect(policyWarnings).toEqual([
        expect.objectContaining({
          nodeId: 'p1',
          nodeKind: 'policy',
          warningType: 'disconnected',
        }),
      ]);
    });

    it('returns no warning when policy is fully connected', () => {
      const board = GridBoard.empty()
        .insertNode(DomainEventNode.create('e1', 'OrderPlaced', 0, 0))
        .insertNode(PolicyNode.create('p1', 'AutoConfirm', 1, 0))
        .insertNode(CommandNode.create('c1', 'ConfirmOrder', 2, 0));
      const links: NodeLink[] = [
        { sourceNodeId: 'e1', targetNodeId: 'p1', connectionType: 'triggers policy' },
        { sourceNodeId: 'p1', targetNodeId: 'c1', connectionType: 'executes' },
      ];

      const warnings = handler.handle(board, links, new ValidateModelQuery());

      const policyWarnings = warnings.filter((w) => w.nodeId === 'p1');
      expect(policyWarnings).toEqual([]);
    });
  });

  describe('UI screen validation', () => {
    it('returns disconnected warning when UI screen has no connections', () => {
      const board = GridBoard.empty().insertNode(
        UIScreenNode.create('ui1', 'Order Form', 0, 0),
      );

      const warnings = handler.handle(board, [], new ValidateModelQuery());

      expect(warnings).toEqual([
        expect.objectContaining({
          nodeId: 'ui1',
          nodeKind: 'uiScreen',
          warningType: 'disconnected',
        }),
      ]);
    });

    it('returns no warning when UI screen triggers a command', () => {
      const board = GridBoard.empty()
        .insertNode(UIScreenNode.create('ui1', 'Order Form', 0, 0))
        .insertNode(CommandNode.create('c1', 'PlaceOrder', 1, 0));
      const links: NodeLink[] = [
        { sourceNodeId: 'ui1', targetNodeId: 'c1', connectionType: 'user action' },
      ];

      const warnings = handler.handle(board, links, new ValidateModelQuery());

      const uiWarnings = warnings.filter((w) => w.nodeId === 'ui1');
      expect(uiWarnings).toEqual([]);
    });

    it('returns no warning when UI screen displays a read model', () => {
      const board = GridBoard.empty()
        .insertNode(ReadModelNode.create('rm1', 'Order Summary', 0, 0))
        .insertNode(UIScreenNode.create('ui1', 'Order View', 1, 0));
      const links: NodeLink[] = [
        { sourceNodeId: 'rm1', targetNodeId: 'ui1', connectionType: 'displays' },
      ];

      const warnings = handler.handle(board, links, new ValidateModelQuery());

      const uiWarnings = warnings.filter((w) => w.nodeId === 'ui1');
      expect(uiWarnings).toEqual([]);
    });
  });

  describe('mixed scenarios', () => {
    it('returns warnings for all disconnected nodes in a complex board', () => {
      const board = GridBoard.empty()
        .insertNode(DomainEventNode.create('e1', 'OrderPlaced', 0, 0))
        .insertNode(CommandNode.create('c1', 'PlaceOrder', 0, 1))
        .insertNode(ReadModelNode.create('rm1', 'Orders', 1, 0));

      const warnings = handler.handle(board, [], new ValidateModelQuery());

      expect(warnings).toHaveLength(3);
      expect(warnings.map((w) => w.nodeId)).toContain('e1');
      expect(warnings.map((w) => w.nodeId)).toContain('c1');
      expect(warnings.map((w) => w.nodeId)).toContain('rm1');
    });

    it('warning disappears when link is added', () => {
      const board = GridBoard.empty()
        .insertNode(CommandNode.create('c1', 'PlaceOrder', 0, 0))
        .insertNode(DomainEventNode.create('e1', 'OrderPlaced', 1, 0));

      const warningsBefore = handler.handle(board, [], new ValidateModelQuery());
      expect(warningsBefore.some((w) => w.nodeId === 'c1')).toBe(true);

      const links: NodeLink[] = [
        { sourceNodeId: 'c1', targetNodeId: 'e1', connectionType: 'triggers' },
      ];
      const warningsAfter = handler.handle(board, links, new ValidateModelQuery());
      expect(warningsAfter.some((w) => w.nodeId === 'c1')).toBe(false);
    });

    it('returns no warnings when all nodes are fully connected', () => {
      const board = GridBoard.empty()
        .insertNode(UIScreenNode.create('ui1', 'Order Form', 0, 0))
        .insertNode(CommandNode.create('c1', 'PlaceOrder', 1, 0))
        .insertNode(DomainEventNode.create('e1', 'OrderPlaced', 2, 0))
        .insertNode(ReadModelNode.create('rm1', 'Order Summary', 3, 0));
      const links: NodeLink[] = [
        { sourceNodeId: 'ui1', targetNodeId: 'c1', connectionType: 'user action' },
        { sourceNodeId: 'c1', targetNodeId: 'e1', connectionType: 'triggers' },
        { sourceNodeId: 'e1', targetNodeId: 'rm1', connectionType: 'feeds' },
      ];

      const warnings = handler.handle(board, links, new ValidateModelQuery());

      expect(warnings).toEqual([]);
    });
  });
});
