import { describe, it, expect } from 'vitest';
import { GridBoard } from '../../../../src/core/domain/GridBoard';
import { DomainEventNode } from '../../../../src/core/domain/DomainEventNode';
import { CommandNode } from '../../../../src/core/domain/CommandNode';
import { ReadModelNode } from '../../../../src/core/domain/ReadModelNode';
import { ExportMarkdownQuery } from '../../../../src/core/usecases/queries/ExportMarkdown/ExportMarkdownQuery';
import { ExportMarkdownQueryHandler } from '../../../../src/core/usecases/queries/ExportMarkdown/ExportMarkdownQueryHandler';

const handler = new ExportMarkdownQueryHandler();

describe('ExportMarkdownQueryHandler', () => {
  it('includes the expected section headings', () => {
    const result = handler.handle(GridBoard.empty(), [], new ExportMarkdownQuery());

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

    const result = handler.handle(board, [], new ExportMarkdownQuery());

    expect(result).toContain('OrderPlaced');
  });

  it('lists command names with their triggered event', () => {
    const board = GridBoard.empty()
      .insertNode(DomainEventNode.create('e1', 'OrderPlaced', 0, 0))
      .insertNode(CommandNode.create('c1', 'PlaceOrder', 0, 1));
    const links = [{ commandNodeId: 'c1', eventNodeId: 'e1' }];

    const result = handler.handle(board, links, new ExportMarkdownQuery());

    expect(result).toContain('PlaceOrder');
    expect(result).toContain('e1');
  });

  it('lists read model names', () => {
    const board = GridBoard.empty().insertNode(
      ReadModelNode.create('rm1', 'Order Summary', 0, 0)
    );

    const result = handler.handle(board, [], new ExportMarkdownQuery());

    expect(result).toContain('Order Summary');
  });

  it('shows placeholder text when sections are empty', () => {
    const result = handler.handle(GridBoard.empty(), [], new ExportMarkdownQuery());

    expect(result).toContain('*(No domain events defined yet)*');
    expect(result).toContain('*(No commands defined yet)*');
  });
});
