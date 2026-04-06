import { GridBoard } from '../../../domain/GridBoard';
import { type BoardProjection } from '../../../domain/BoardProjection';
import { type EventModel, type DomainEventEntry, type CommandEntry, type ReadModelEntry, type PolicyEntry, type UIScreenEntry } from '../../../domain/EventModelSchema';
import { ExportJSONQuery } from './ExportJSONQuery';

interface NodeLink {
  commandNodeId: string;
  eventNodeId: string;
}

export class ExportJSONQueryHandler {
  handle(board: GridBoard, links: ReadonlyArray<NodeLink>, query: ExportJSONQuery): string {
    void query;

    const domainEvents: DomainEventEntry[] = [];
    const commands: CommandEntry[] = [];
    const readModels: ReadModelEntry[] = [];
    const policies: PolicyEntry[] = [];
    const uiScreens: UIScreenEntry[] = [];

    const commandLinks = new Map<string, string>(
      links.map((link) => [link.commandNodeId, link.eventNodeId])
    );

    const projection: BoardProjection = {
      onDomainEventNode(id, label, column) {
        domainEvents.push({
          id,
          name: label,
          swimlaneId: '',
          triggeredBy: '',
          data: {},
          timelinePosition: column,
        });
      },
      onCommandNode(id, label) {
        commands.push({
          id,
          name: label,
          actor: '',
          payload: {},
          resultingEvents: commandLinks.has(id) ? [commandLinks.get(id)!] : [],
          guardConditions: [],
        });
      },
      onReadModelNode(id, label) {
        readModels.push({
          id,
          name: label,
          fedBy: [],
          consumedBy: '',
          data: {},
        });
      },
      onPolicyNode(id, label) {
        policies.push({
          id,
          name: label,
          whenEvent: '',
          thenCommand: '',
          condition: '',
        });
      },
      onUIScreenNode(id, label, column) {
        uiScreens.push({
          id,
          name: label,
          description: '',
          triggersCommand: '',
          displaysReadModel: '',
          timelinePosition: column,
        });
      },
    };

    board.describeTo(projection);

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
