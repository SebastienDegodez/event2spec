import { describe, it, expect } from 'vitest';
import { GridBoard } from '../../../../src/core/domain/board/GridBoard';
import { DomainEventNode } from '../../../../src/core/domain/node/DomainEventNode';
import { CommandNode } from '../../../../src/core/domain/node/CommandNode';
import { ReadModelNode } from '../../../../src/core/domain/node/ReadModelNode';
import { PolicyNode } from '../../../../src/core/domain/node/PolicyNode';
import { UIScreenNode } from '../../../../src/core/domain/node/UIScreenNode';
import { VerticalSliceCollection } from '../../../../src/core/domain/vertical-slice/VerticalSliceCollection';
import { VerticalSlice } from '../../../../src/core/domain/vertical-slice/VerticalSlice';
import { Scenario } from '../../../../src/core/domain/Scenario';
import { type NodeProperties } from '../../../../src/core/domain/node/NodeProperties';
import { ExportJSONQuery } from '../../../../src/core/usecases/queries/ExportJSON/ExportJSONQuery';
import { ExportJSONQueryHandler } from '../../../../src/core/usecases/queries/ExportJSON/ExportJSONQueryHandler';

const handler = new ExportJSONQueryHandler();
const emptySlices = VerticalSliceCollection.empty();
const emptyProperties: Record<string, NodeProperties> = {};

describe('ExportJSONQueryHandler', () => {
  it('exports an empty board as a valid EventModel JSON with empty arrays', () => {
    const result = handler.handle(GridBoard.empty(), [], emptySlices, emptyProperties, new ExportJSONQuery());
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

    const result = handler.handle(board, [], emptySlices, emptyProperties, new ExportJSONQuery());
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

    const result = handler.handle(board, links, emptySlices, emptyProperties, new ExportJSONQuery());
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

    const result = handler.handle(board, links, emptySlices, emptyProperties, new ExportJSONQuery());
    const model = JSON.parse(result);

    expect(model.readModels[0].fedBy).toContain('e1');
  });

  it('exports policies with thenCommand from executes links', () => {
    const board = GridBoard.empty()
      .insertNode(PolicyNode.create('p1', 'AutoConfirm', 3, 0))
      .insertNode(CommandNode.create('c1', 'ConfirmOrder', 4, 0));
    const links = [{ sourceNodeId: 'p1', targetNodeId: 'c1', connectionType: 'executes' as const }];

    const result = handler.handle(board, links, emptySlices, emptyProperties, new ExportJSONQuery());
    const model = JSON.parse(result);

    expect(model.policies[0].thenCommand).toBe('c1');
  });

  it('exports UI screens with triggersCommand from user action links', () => {
    const board = GridBoard.empty()
      .insertNode(UIScreenNode.create('ui1', 'Order Form', 1, 0))
      .insertNode(CommandNode.create('c1', 'PlaceOrder', 2, 1));
    const links = [{ sourceNodeId: 'ui1', targetNodeId: 'c1', connectionType: 'user action' as const }];

    const result = handler.handle(board, links, emptySlices, emptyProperties, new ExportJSONQuery());
    const model = JSON.parse(result);

    expect(model.uiScreens[0].triggersCommand).toBe('c1');
  });

  it('exports read models', () => {
    const board = GridBoard.empty().insertNode(
      ReadModelNode.create('rm1', 'Order Summary', 3, 0)
    );

    const result = handler.handle(board, [], emptySlices, emptyProperties, new ExportJSONQuery());
    const model = JSON.parse(result);

    expect(model.readModels).toHaveLength(1);
    expect(model.readModels[0].name).toBe('Order Summary');
  });

  it('produces valid JSON string', () => {
    const result = handler.handle(GridBoard.empty(), [], emptySlices, emptyProperties, new ExportJSONQuery());
    expect(() => JSON.parse(result)).not.toThrow();
  });

  it('exports domain events with boundedContextId from the node', () => {
    const board = GridBoard.empty().insertNode(
      DomainEventNode.create('e1', 'OrderPlaced', 2, 2, 'bc-1')
    );

    const result = handler.handle(board, [], emptySlices, emptyProperties, new ExportJSONQuery());
    const model = JSON.parse(result);

    expect(model.domainEvents[0].boundedContextId).toBe('bc-1');
  });

  it('exports node properties in the JSON output', () => {
    const board = GridBoard.empty()
      .insertNode(CommandNode.create('c1', 'PlaceOrder', 0, 0));
    const properties: Record<string, NodeProperties> = {
      c1: { type: 'command', actor: 'Customer', payload: { orderId: 'string' }, guardConditions: ['order must be valid'] },
    };

    const result = handler.handle(board, [], emptySlices, properties, new ExportJSONQuery());
    const model = JSON.parse(result);

    expect(model.commands[0].actor).toBe('Customer');
    expect(model.commands[0].payload).toEqual({ orderId: 'string' });
    expect(model.commands[0].guardConditions).toEqual(['order must be valid']);
  });

  it('exports vertical slices with name, command, events, readModel, and scenarios', () => {
    const slice = VerticalSlice.create('vs1', 'Place Order', 'c1', ['e1', 'e2'], 'rm1')
      .addScenario(Scenario.create(['a cart with items'], 'user places order', ['order is confirmed', 'email is sent']));
    const slices = VerticalSliceCollection.empty().add(slice);

    const result = handler.handle(GridBoard.empty(), [], slices, emptyProperties, new ExportJSONQuery());
    const model = JSON.parse(result);

    expect(model.verticalSlices).toHaveLength(1);
    expect(model.verticalSlices[0].name).toBe('Place Order');
    expect(model.verticalSlices[0].command).toBe('c1');
    expect(model.verticalSlices[0].events).toEqual(['e1', 'e2']);
    expect(model.verticalSlices[0].readModel).toBe('rm1');
    expect(model.verticalSlices[0].scenarios).toHaveLength(1);
    expect(model.verticalSlices[0].scenarios[0].given).toEqual(['a cart with items']);
    expect(model.verticalSlices[0].scenarios[0].when).toBe('user places order');
    expect(model.verticalSlices[0].scenarios[0].then).toEqual(['order is confirmed', 'email is sent']);
  });

  it('exports empty vertical slices array when no slices exist', () => {
    const result = handler.handle(GridBoard.empty(), [], emptySlices, emptyProperties, new ExportJSONQuery());
    const model = JSON.parse(result);
    expect(model.verticalSlices).toHaveLength(0);
  });

  it('exports timelinePosition for commands', () => {
    const board = GridBoard.empty().insertNode(
      CommandNode.create('c1', 'PlaceOrder', 3, 1)
    );

    const result = handler.handle(board, [], emptySlices, emptyProperties, new ExportJSONQuery());
    const model = JSON.parse(result);

    expect(model.commands[0].timelinePosition).toBe(3);
  });

  it('exports timelinePosition for read models', () => {
    const board = GridBoard.empty().insertNode(
      ReadModelNode.create('rm1', 'Order Summary', 4, 1)
    );

    const result = handler.handle(board, [], emptySlices, emptyProperties, new ExportJSONQuery());
    const model = JSON.parse(result);

    expect(model.readModels[0].timelinePosition).toBe(4);
  });

  it('exports timelinePosition for policies', () => {
    const board = GridBoard.empty().insertNode(
      PolicyNode.create('p1', 'AutoConfirm', 3, 1)
    );

    const result = handler.handle(board, [], emptySlices, emptyProperties, new ExportJSONQuery());
    const model = JSON.parse(result);

    expect(model.policies[0].timelinePosition).toBe(3);
  });
});
