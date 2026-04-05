import { GridBoard } from '../../../domain/GridBoard';
import { DomainEventNode } from '../../../domain/DomainEventNode';
import { CommandNode } from '../../../domain/CommandNode';
import { ReadModelNode } from '../../../domain/ReadModelNode';
import { PolicyNode } from '../../../domain/PolicyNode';
import { UIScreenNode } from '../../../domain/UIScreenNode';
import { type EventModel, type DomainEventEntry, type CommandEntry, type ReadModelEntry, type PolicyEntry, type UIScreenEntry } from '../../../domain/EventModelSchema';
import { ExportJSONQuery } from './ExportJSONQuery';

interface NodeLink {
  commandNodeId: string;
  eventNodeId: string;
}

export class ExportJSONQueryHandler {
  handle(board: GridBoard, links: ReadonlyArray<NodeLink>, query: ExportJSONQuery): string {
    void query;
    const nodes = board.toArray();

    const domainEvents: DomainEventEntry[] = nodes
      .filter((node) => node instanceof DomainEventNode)
      .map((node) => ({
        id: node.id,
        name: node.label,
        swimlaneId: '',
        triggeredBy: '',
        data: {},
        timelinePosition: node.gridPosition().column,
      }));

    const commandLinks = new Map<string, string>(
      links.map((link) => [link.commandNodeId, link.eventNodeId])
    );

    const commands: CommandEntry[] = nodes
      .filter((node) => node instanceof CommandNode)
      .map((node) => ({
        id: node.id,
        name: node.label,
        actor: '',
        payload: {},
        resultingEvents: commandLinks.has(node.id) ? [commandLinks.get(node.id)!] : [],
        guardConditions: [],
      }));

    const readModels: ReadModelEntry[] = nodes
      .filter((node) => node instanceof ReadModelNode)
      .map((node) => ({
        id: node.id,
        name: node.label,
        fedBy: [],
        consumedBy: '',
        data: {},
      }));

    const policies: PolicyEntry[] = nodes
      .filter((node) => node instanceof PolicyNode)
      .map((node) => ({
        id: node.id,
        name: node.label,
        whenEvent: '',
        thenCommand: '',
        condition: '',
      }));

    const uiScreens: UIScreenEntry[] = nodes
      .filter((node) => node instanceof UIScreenNode)
      .map((node) => ({
        id: node.id,
        name: node.label,
        description: '',
        triggersCommand: '',
        displaysReadModel: '',
        timelinePosition: node.gridPosition().column,
      }));

    const model: EventModel = {
      name: 'Event Model',
      version: '1.0.0',
      description: '',
      actors: [],
      swimlanes: [],
      domainEvents,
      commands,
      readModels,
      policies,
      uiScreens,
      verticalSlices: [],
      boundedContexts: [],
      decisions: [],
      openQuestions: [],
    };

    return JSON.stringify(model, null, 2);
  }
}
