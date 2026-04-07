import { GridBoard } from '../../../domain/GridBoard';
import { type BoardProjection } from '../../../domain/BoardProjection';
import { type EventModel, type DomainEventEntry, type CommandEntry, type ReadModelEntry, type PolicyEntry, type UIScreenEntry, type VerticalSlice as VerticalSliceSchema, type Scenario as ScenarioSchema } from '../../../domain/EventModelSchema';
import { type NodeLink } from '../../../domain/NodeLink';
import { type NodeProperties } from '../../../domain/NodeProperties';
import { SwimlaneCollection } from '../../../domain/SwimlaneCollection';
import { VerticalSliceCollection } from '../../../domain/VerticalSliceCollection';
import { ExportJSONQuery } from './ExportJSONQuery';

export class ExportJSONQueryHandler {
  handle(board: GridBoard, links: ReadonlyArray<NodeLink>, swimlanes: SwimlaneCollection, slices: VerticalSliceCollection, nodeProperties: Record<string, NodeProperties>, query: ExportJSONQuery): string {
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
        const props = nodeProperties[id];
        domainEvents.push({
          id,
          name: label,
          swimlaneId: '',
          triggeredBy: '',
          data: props?.type === 'domainEvent' ? props.data : {},
          timelinePosition: column,
        });
      },
      onCommandNode(id, label) {
        const props = nodeProperties[id];
        commands.push({
          id,
          name: label,
          actor: props?.type === 'command' ? props.actor : '',
          payload: props?.type === 'command' ? props.payload : {},
          resultingEvents: triggersLinks.has(id) ? [triggersLinks.get(id)!] : [],
          guardConditions: props?.type === 'command' ? props.guardConditions : [],
        });
      },
      onReadModelNode(id, label) {
        const props = nodeProperties[id];
        readModels.push({
          id,
          name: label,
          fedBy: feedsLinks.get(id) ?? [],
          consumedBy: props?.type === 'readModel' ? props.consumedBy : readModelScreenLinks.get(id) ?? '',
          data: props?.type === 'readModel' ? props.data : {},
        });
      },
      onPolicyNode(id, label) {
        const props = nodeProperties[id];
        policies.push({
          id,
          name: label,
          whenEvent: '',
          thenCommand: policyCommandLinks.get(id) ?? '',
          condition: props?.type === 'policy' ? props.condition : '',
        });
      },
      onUIScreenNode(id, label, column) {
        const props = nodeProperties[id];
        uiScreens.push({
          id,
          name: label,
          description: props?.type === 'uiScreen' ? props.description : '',
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

    const exportedSlices: VerticalSliceSchema[] = [];
    slices.describeTo({
      onSlice(_id, name, commandId, eventIds, readModelId, scenarios) {
        const exportedScenarios: ScenarioSchema[] = scenarios.map((s) => ({
          given: [...s.given],
          when: s.when,
          then: [...s.then],
        }));
        exportedSlices.push({
          name,
          command: commandId,
          events: [...eventIds],
          readModel: readModelId,
          scenarios: exportedScenarios,
        });
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
      verticalSlices: exportedSlices,
      boundedContexts: [],
      decisions: [],
      openQuestions: [],
    };

    return JSON.stringify(model, null, 2);
  }
}
