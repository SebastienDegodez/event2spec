import { describe, it, expect } from 'vitest';
import { GridBoard } from '../../../../src/core/domain/board/GridBoard';
import { DomainEventNode } from '../../../../src/core/domain/DomainEventNode';
import { CommandNode } from '../../../../src/core/domain/CommandNode';
import { ReadModelNode } from '../../../../src/core/domain/ReadModelNode';
import { PolicyNode } from '../../../../src/core/domain/PolicyNode';
import { UIScreenNode } from '../../../../src/core/domain/UIScreenNode';
import { VerticalSliceCollection } from '../../../../src/core/domain/vertical-slice/VerticalSliceCollection';
import { ExportMarkdownQuery } from '../../../../src/core/usecases/queries/ExportMarkdown/ExportMarkdownQuery';
import { ExportMarkdownQueryHandler } from '../../../../src/core/usecases/queries/ExportMarkdown/ExportMarkdownQueryHandler';

const handler = new ExportMarkdownQueryHandler();
const emptySlices = VerticalSliceCollection.empty();

describe('ExportMarkdownQueryHandler', () => {
  it('includes the expected section headings', () => {
    const result = handler.handle(GridBoard.empty(), [], emptySlices, new ExportMarkdownQuery());

    expect(result).toContain('# Event Model');
    expect(result).toContain('## Domain Events');
    expect(result).toContain('## Commands');
    expect(result).toContain('## Read Models');
    expect(result).toContain('## Policies');
    expect(result).toContain('## UI Screens');
    expect(result).toContain('## Vertical Slices');
    expect(result).toContain('## Bounded Contexts');
    expect(result).toContain('## Decisions');
    expect(result).toContain('## Open Questions');
  });

  it('lists domain event names in the Domain Events section', () => {
    const board = GridBoard.empty().insertNode(
      DomainEventNode.create('e1', 'OrderPlaced', 0, 0)
    );

    const result = handler.handle(board, [], emptySlices, new ExportMarkdownQuery());

    expect(result).toContain('OrderPlaced');
  });

  it('lists command names with their triggered event', () => {
    const board = GridBoard.empty()
      .insertNode(DomainEventNode.create('e1', 'OrderPlaced', 0, 0))
      .insertNode(CommandNode.create('c1', 'PlaceOrder', 0, 1));
    const links = [{ sourceNodeId: 'c1', targetNodeId: 'e1', connectionType: 'triggers' as const }];

    const result = handler.handle(board, links, emptySlices, new ExportMarkdownQuery());

    expect(result).toContain('PlaceOrder');
    expect(result).toContain('e1');
  });

  it('lists read model names with fed-by sources from feeds links', () => {
    const board = GridBoard.empty()
      .insertNode(DomainEventNode.create('e1', 'OrderPlaced', 0, 0))
      .insertNode(ReadModelNode.create('rm1', 'Order Summary', 1, 0));
    const links = [{ sourceNodeId: 'e1', targetNodeId: 'rm1', connectionType: 'feeds' as const }];

    const result = handler.handle(board, links, emptySlices, new ExportMarkdownQuery());

    expect(result).toContain('Order Summary');
    expect(result).toContain('e1');
  });

  it('lists policies with their triggering event and executed command', () => {
    const board = GridBoard.empty()
      .insertNode(DomainEventNode.create('e1', 'OrderPlaced', 0, 0))
      .insertNode(PolicyNode.create('p1', 'AutoConfirm', 1, 0))
      .insertNode(CommandNode.create('c1', 'ConfirmOrder', 2, 0));
    const links = [
      { sourceNodeId: 'e1', targetNodeId: 'p1', connectionType: 'triggers policy' as const },
      { sourceNodeId: 'p1', targetNodeId: 'c1', connectionType: 'executes' as const },
    ];

    const result = handler.handle(board, links, emptySlices, new ExportMarkdownQuery());

    expect(result).toContain('AutoConfirm');
    expect(result).toContain('e1');
    expect(result).toContain('c1');
  });

  it('lists UI screens with their triggered command', () => {
    const board = GridBoard.empty()
      .insertNode(UIScreenNode.create('ui1', 'Order Form', 0, 0))
      .insertNode(CommandNode.create('c1', 'PlaceOrder', 1, 0));
    const links = [{ sourceNodeId: 'ui1', targetNodeId: 'c1', connectionType: 'user action' as const }];

    const result = handler.handle(board, links, emptySlices, new ExportMarkdownQuery());

    expect(result).toContain('Order Form');
    expect(result).toContain('c1');
  });

  it('lists read models', () => {
    const board = GridBoard.empty().insertNode(
      ReadModelNode.create('rm1', 'Order Summary', 0, 0)
    );

    const result = handler.handle(board, [], emptySlices, new ExportMarkdownQuery());

    expect(result).toContain('Order Summary');
  });

  it('shows placeholder text when sections are empty', () => {
    const result = handler.handle(GridBoard.empty(), [], emptySlices, new ExportMarkdownQuery());

    expect(result).toContain('*(No domain events defined yet)*');
    expect(result).toContain('*(No commands defined yet)*');
  });
});
