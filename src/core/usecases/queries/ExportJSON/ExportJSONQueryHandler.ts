import { GridBoard } from '../../../domain/GridBoard';
import { type BoardProjection } from '../../../domain/BoardProjection';
import { type EventModel, type DomainEventEntry, type CommandEntry, type ReadModelEntry, type PolicyEntry, type UIScreenEntry } from '../../../domain/EventModelSchema';
import { type NodeLink } from '../../../domain/NodeLink';
import { SwimlaneCollection } from '../../../domain/SwimlaneCollection';
import { ExportJSONQuery } from './ExportJSONQuery';

export class ExportJSONQueryHandler {
  handle(board: GridBoard, links: ReadonlyArray<NodeLink>, swimlanes: SwimlaneCollection, query: ExportJSONQuery): string {
    void query;

    const domainEvents: DomainEventEntry[] = [];
    const commands: CommandEntry[] = [];
    const readModels: ReadModelEntry[] = [];
    const policies: PolicyEntry[] = [];
    const uiScreens: UIScreenEntry[] = [];

    const triggersLinks = new Map<string, string>(
      links.filter((l) => l.connectionType === 'triggers').map((l) => [l.sourceNodeId, l.targetNodeId])
    );
    const feedsLinks = new Map<string, string[]>();
    const policyCommandLinks = new Map<string, string>();
    const uiScreenCommandLinks = new Map<string, string>();
    const readModelScreenLinks = new Map<string, string>();

    for (const link of links) {
      if (link.connectionType === 'feeds') {
        const existing = feedsLinks.get(link.targetNodeId) ?? [];
        feedsLinks.set(link.targetNodeId, [...existing, link.sourceNodeId]);
      } else if (link.connectionType === 'executes') {
        policyCommandLinks.set(link.sourceNodeId, link.targetNodeId);
      } else if (link.connectionType === 'user action') {
        uiScreenCommandLinks.set(link.sourceNodeId, link.targetNodeId);
      } else if (link.connectionType === 'displays') {
        readModelScreenLinks.set(link.sourceNodeId, link.targetNodeId);
      } else if (link.connectionType === 'triggers policy') {
        // tracked separately if needed
      }
    }

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
          resultingEvents: triggersLinks.has(id) ? [triggersLinks.get(id)!] : [],
          guardConditions: [],
        });
      },
      onReadModelNode(id, label) {
        readModels.push({
          id,
          name: label,
          fedBy: feedsLinks.get(id) ?? [],
          consumedBy: readModelScreenLinks.get(id) ?? '',
          data: {},
        });
      },
      onPolicyNode(id, label) {
        policies.push({
          id,
          name: label,
          whenEvent: '',
          thenCommand: policyCommandLinks.get(id) ?? '',
          condition: '',
        });
      },
      onUIScreenNode(id, label, column) {
        uiScreens.push({
          id,
          name: label,
          description: '',
          triggersCommand: uiScreenCommandLinks.get(id) ?? '',
          displaysReadModel: '',
          timelinePosition: column,
        });
      },
    };

    board.describeTo(projection);

    const exportedSwimlanes: EventModel['swimlanes'] = [];
    swimlanes.describeTo({
      onSwimlane(id, actorName, _actorType, color, index) {
        exportedSwimlanes.push({ id, actorName, order: index, color });
      },
    });

    const model: EventModel = {
      name: 'Event Model',
      version: '1.0.0',
      description: '',
      actors: [],
      swimlanes: exportedSwimlanes,
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
