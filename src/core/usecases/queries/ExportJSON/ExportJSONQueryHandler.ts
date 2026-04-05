import { GridBoard } from '../../../domain/GridBoard';
import { type BoardNodeVisitor } from '../../../domain/BoardNodeVisitor';
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

    const visitor: BoardNodeVisitor = {
      visitDomainEventNode(id, label, column) {
        domainEvents.push({
          id,
          name: label,
          swimlaneId: '',
          triggeredBy: '',
          data: {},
          timelinePosition: column,
        });
      },
      visitCommandNode(id, label) {
        commands.push({
          id,
          name: label,
          actor: '',
          payload: {},
          resultingEvents: commandLinks.has(id) ? [commandLinks.get(id)!] : [],
          guardConditions: [],
        });
      },
      visitReadModelNode(id, label) {
        readModels.push({
          id,
          name: label,
          fedBy: [],
          consumedBy: '',
          data: {},
        });
      },
      visitPolicyNode(id, label) {
        policies.push({
          id,
          name: label,
          whenEvent: '',
          thenCommand: '',
          condition: '',
        });
      },
      visitUIScreenNode(id, label, column) {
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

    board.accept(visitor);

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
