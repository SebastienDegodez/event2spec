import { describe, it, expect } from 'vitest';
import { GridBoard } from '../../../../src/core/domain/GridBoard';
import { DomainEventNode } from '../../../../src/core/domain/DomainEventNode';
import { CommandNode } from '../../../../src/core/domain/CommandNode';
import { ReadModelNode } from '../../../../src/core/domain/ReadModelNode';
import { PolicyNode } from '../../../../src/core/domain/PolicyNode';
import { UIScreenNode } from '../../../../src/core/domain/UIScreenNode';
import { SwimlaneCollection } from '../../../../src/core/domain/SwimlaneCollection';
import { Swimlane } from '../../../../src/core/domain/Swimlane';
import { type NodeProperties } from '../../../../src/core/domain/NodeProperties';
import { ExportJSONQuery } from '../../../../src/core/usecases/queries/ExportJSON/ExportJSONQuery';
import { ExportJSONQueryHandler } from '../../../../src/core/usecases/queries/ExportJSON/ExportJSONQueryHandler';

const handler = new ExportJSONQueryHandler();
const emptySwimlanes = SwimlaneCollection.empty();
const emptyProperties: Record<string, NodeProperties> = {};

describe('ExportJSONQueryHandler', () => {
  it('exports an empty board as a valid EventModel JSON with empty arrays', () => {
    const result = handler.handle(GridBoard.empty(), [], emptySwimlanes, emptyProperties, new ExportJSONQuery());
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

    const result = handler.handle(board, [], emptySwimlanes, emptyProperties, new ExportJSONQuery());
    const model = JSON.parse(result);

    expect(model.domainEvents).toHaveLength(1);
    expect(model.domainEvents[0].id).toBe('e1');
    expect(model.domainEvents[0].name).toBe('OrderPlaced');
    expect(model.domainEvents[0].timelinePosition).toBe(2);
  });

  it('exports commands with resultingEvents from triggers links', () => {
    const board = GridBoard.empty()
      .insertNode(DomainEventNode.create('e1', 'OrderPlaced', 2, 0))
      .insertNode(CommandNode.create('c1', 'PlaceOrder', 2, 1));
    const links = [{ sourceNodeId: 'c1', targetNodeId: 'e1', connectionType: 'triggers' as const }];

    const result = handler.handle(board, links, emptySwimlanes, emptyProperties, new ExportJSONQuery());
    const model = JSON.parse(result);

    expect(model.commands).toHaveLength(1);
    expect(model.commands[0].id).toBe('c1');
    expect(model.commands[0].resultingEvents).toContain('e1');
  });

  it('exports read models with fedBy from feeds links', () => {
    const board = GridBoard.empty()
      .insertNode(DomainEventNode.create('e1', 'OrderPlaced', 2, 0))
      .insertNode(ReadModelNode.create('rm1', 'Order Summary', 3, 0));
    const links = [{ sourceNodeId: 'e1', targetNodeId: 'rm1', connectionType: 'feeds' as const }];

    const result = handler.handle(board, links, emptySwimlanes, emptyProperties, new ExportJSONQuery());
    const model = JSON.parse(result);

    expect(model.readModels[0].fedBy).toContain('e1');
  });

  it('exports policies with thenCommand from executes links', () => {
    const board = GridBoard.empty()
      .insertNode(PolicyNode.create('p1', 'AutoConfirm', 3, 0))
      .insertNode(CommandNode.create('c1', 'ConfirmOrder', 4, 0));
    const links = [{ sourceNodeId: 'p1', targetNodeId: 'c1', connectionType: 'executes' as const }];

    const result = handler.handle(board, links, emptySwimlanes, emptyProperties, new ExportJSONQuery());
    const model = JSON.parse(result);

    expect(model.policies[0].thenCommand).toBe('c1');
  });

  it('exports UI screens with triggersCommand from user action links', () => {
    const board = GridBoard.empty()
      .insertNode(UIScreenNode.create('ui1', 'Order Form', 1, 0))
      .insertNode(CommandNode.create('c1', 'PlaceOrder', 2, 1));
    const links = [{ sourceNodeId: 'ui1', targetNodeId: 'c1', connectionType: 'user action' as const }];

    const result = handler.handle(board, links, emptySwimlanes, emptyProperties, new ExportJSONQuery());
    const model = JSON.parse(result);

    expect(model.uiScreens[0].triggersCommand).toBe('c1');
  });

  it('exports read models', () => {
    const board = GridBoard.empty().insertNode(
      ReadModelNode.create('rm1', 'Order Summary', 3, 0)
    );

    const result = handler.handle(board, [], emptySwimlanes, emptyProperties, new ExportJSONQuery());
    const model = JSON.parse(result);

    expect(model.readModels).toHaveLength(1);
    expect(model.readModels[0].name).toBe('Order Summary');
  });

  it('produces valid JSON string', () => {
    const result = handler.handle(GridBoard.empty(), [], emptySwimlanes, emptyProperties, new ExportJSONQuery());
    expect(() => JSON.parse(result)).not.toThrow();
  });

  it('exports swimlanes with id, actorName, order, and color', () => {
    const swimlanes = SwimlaneCollection.empty()
      .add(Swimlane.create('s1', 'Customer', 'human'))
      .add(Swimlane.create('s2', 'Order Service', 'internal_system'));

    const result = handler.handle(GridBoard.empty(), [], swimlanes, emptyProperties, new ExportJSONQuery());
    const model = JSON.parse(result);

    expect(model.swimlanes).toHaveLength(2);
    expect(model.swimlanes[0]).toMatchObject({ id: 's1', actorName: 'Customer', order: 0, color: 'yellow' });
    expect(model.swimlanes[1]).toMatchObject({ id: 's2', actorName: 'Order Service', order: 1, color: 'blue' });
  });

  it('exports empty swimlanes array when no swimlanes exist', () => {
    const result = handler.handle(GridBoard.empty(), [], emptySwimlanes, emptyProperties, new ExportJSONQuery());
    const model = JSON.parse(result);
    expect(model.swimlanes).toHaveLength(0);
  });

  it('exports node properties in the JSON output', () => {
    const board = GridBoard.empty()
      .insertNode(CommandNode.create('c1', 'PlaceOrder', 0, 0));
    const properties: Record<string, NodeProperties> = {
      c1: { type: 'command', actor: 'Customer', payload: { orderId: 'string' }, guardConditions: ['order must be valid'] },
    };

    const result = handler.handle(board, [], emptySwimlanes, properties, new ExportJSONQuery());
    const model = JSON.parse(result);

    expect(model.commands[0].actor).toBe('Customer');
    expect(model.commands[0].payload).toEqual({ orderId: 'string' });
    expect(model.commands[0].guardConditions).toEqual(['order must be valid']);
  });
});
