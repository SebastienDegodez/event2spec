import { describe, it, expect } from 'vitest';
import { GridBoard } from '../../../../src/core/domain/GridBoard';
import { DomainEventNode } from '../../../../src/core/domain/DomainEventNode';
import { CommandNode } from '../../../../src/core/domain/CommandNode';
import { ReadModelNode } from '../../../../src/core/domain/ReadModelNode';
import { ExportJSONQuery } from '../../../../src/core/usecases/queries/ExportJSON/ExportJSONQuery';
import { ExportJSONQueryHandler } from '../../../../src/core/usecases/queries/ExportJSON/ExportJSONQueryHandler';

const handler = new ExportJSONQueryHandler();

describe('ExportJSONQueryHandler', () => {
  it('exports an empty board as a valid EventModel JSON with empty arrays', () => {
    const result = handler.handle(GridBoard.empty(), [], new ExportJSONQuery());
    const model = JSON.parse(result);

    expect(model.name).toBe('Event Model');
    expect(model.version).toBe('1.0.0');
    expect(model.domainEvents).toHaveLength(0);
    expect(model.commands).toHaveLength(0);
    expect(model.readModels).toHaveLength(0);
    expect(model.policies).toHaveLength(0);
    expect(model.uiScreens).toHaveLength(0);
  });

  it('exports domain events with id, name, and timelinePosition', () => {
    const board = GridBoard.empty().insertNode(
      DomainEventNode.create('e1', 'OrderPlaced', 2, 0)
    );

    const result = handler.handle(board, [], new ExportJSONQuery());
    const model = JSON.parse(result);

    expect(model.domainEvents).toHaveLength(1);
    expect(model.domainEvents[0].id).toBe('e1');
    expect(model.domainEvents[0].name).toBe('OrderPlaced');
    expect(model.domainEvents[0].timelinePosition).toBe(2);
  });

  it('exports commands with resultingEvents from links', () => {
    const board = GridBoard.empty()
      .insertNode(DomainEventNode.create('e1', 'OrderPlaced', 2, 0))
      .insertNode(CommandNode.create('c1', 'PlaceOrder', 2, 1));
    const links = [{ commandNodeId: 'c1', eventNodeId: 'e1' }];

    const result = handler.handle(board, links, new ExportJSONQuery());
    const model = JSON.parse(result);

    expect(model.commands).toHaveLength(1);
    expect(model.commands[0].id).toBe('c1');
    expect(model.commands[0].resultingEvents).toContain('e1');
  });

  it('exports read models', () => {
    const board = GridBoard.empty().insertNode(
      ReadModelNode.create('rm1', 'Order Summary', 3, 0)
    );

    const result = handler.handle(board, [], new ExportJSONQuery());
    const model = JSON.parse(result);

    expect(model.readModels).toHaveLength(1);
    expect(model.readModels[0].name).toBe('Order Summary');
  });

  it('produces valid JSON string', () => {
    const result = handler.handle(GridBoard.empty(), [], new ExportJSONQuery());
    expect(() => JSON.parse(result)).not.toThrow();
  });
});
