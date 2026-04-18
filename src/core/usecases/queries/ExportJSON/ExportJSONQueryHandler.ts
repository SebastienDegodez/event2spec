import { GridBoard } from '../../../domain/board/GridBoard';
import { type BoardProjection } from '../../../domain/board/BoardProjection';
import { type EventModel, type DomainEventEntry, type CommandEntry, type ReadModelEntry, type PolicyEntry, type UIScreenEntry, type VerticalSlice as VerticalSliceSchema, type Scenario as ScenarioSchema } from '../../../domain/EventModelSchema';
import { type NodeLink } from '../../../domain/NodeLink';
import { type NodeProperties } from '../../../domain/NodeProperties';
import { VerticalSliceCollection } from '../../../domain/vertical-slice/VerticalSliceCollection';
import { ExportJSONQuery } from './ExportJSONQuery';

export interface ExportJSONQueryRepository {
  loadBoard(): GridBoard;
  loadLinks(): ReadonlyArray<NodeLink>;
  loadSlices(): VerticalSliceCollection;
  loadNodeProperties(): Record<string, NodeProperties>;
}

export class ExportJSONQueryHandler {
  private readonly repository: ExportJSONQueryRepository | undefined;

  constructor(repository?: ExportJSONQueryRepository) {
    this.repository = repository;
  }

  handle(query: ExportJSONQuery): string;
  handle(board: GridBoard, links: ReadonlyArray<NodeLink>, slices: VerticalSliceCollection, nodeProperties: Record<string, NodeProperties>, query: ExportJSONQuery): string;
  handle(
    boardOrQuery: GridBoard | ExportJSONQuery,
    links?: ReadonlyArray<NodeLink>,
    slices?: VerticalSliceCollection,
    nodeProperties?: Record<string, NodeProperties>,
    query?: ExportJSONQuery,
  ): string {
    let board: GridBoard;
    let resolvedLinks: ReadonlyArray<NodeLink>;
    let resolvedSlices: VerticalSliceCollection;
    let resolvedNodeProperties: Record<string, NodeProperties>;
    let resolvedQuery: ExportJSONQuery;

    if (boardOrQuery instanceof ExportJSONQuery) {
      if (!this.repository) {
        throw new Error('ExportJSONQueryRepository is required when calling handle(query)');
      }
      board = this.repository.loadBoard();
      resolvedLinks = this.repository.loadLinks();
      resolvedSlices = this.repository.loadSlices();
      resolvedNodeProperties = this.repository.loadNodeProperties();
      resolvedQuery = boardOrQuery;
    } else {
      board = boardOrQuery;
      resolvedLinks = links ?? [];
      resolvedSlices = slices ?? VerticalSliceCollection.empty();
      resolvedNodeProperties = nodeProperties ?? {};
      resolvedQuery = query ?? new ExportJSONQuery();
    }

    void resolvedQuery;

    const domainEvents: DomainEventEntry[] = [];
    const commands: CommandEntry[] = [];
    const readModels: ReadModelEntry[] = [];
    const policies: PolicyEntry[] = [];
    const uiScreens: UIScreenEntry[] = [];

    const triggersLinks = new Map<string, string>(
      resolvedLinks.filter((l) => l.connectionType === 'triggers').map((l) => [l.sourceNodeId, l.targetNodeId])
    );
    const feedsLinks = new Map<string, string[]>();
    const policyCommandLinks = new Map<string, string>();
    const uiScreenCommandLinks = new Map<string, string>();
    const readModelScreenLinks = new Map<string, string>();

    for (const link of resolvedLinks) {
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
      onDomainEventNode(id, label, column, _row, boundedContextId) {
        const props = resolvedNodeProperties[id];
        domainEvents.push({
          id,
          name: label,
          boundedContextId: boundedContextId ?? '',
          triggeredBy: '',
          data: props?.type === 'domainEvent' ? props.data : {},
          timelinePosition: column,
        });
      },
      onCommandNode(id, label, column) {
        const props = resolvedNodeProperties[id];
        commands.push({
          id,
          name: label,
          actor: props?.type === 'command' ? props.actor : '',
          payload: props?.type === 'command' ? props.payload : {},
          resultingEvents: triggersLinks.has(id) ? [triggersLinks.get(id)!] : [],
          guardConditions: props?.type === 'command' ? props.guardConditions : [],
          timelinePosition: column,
        });
      },
      onReadModelNode(id, label, column) {
        const props = resolvedNodeProperties[id];
        readModels.push({
          id,
          name: label,
          fedBy: feedsLinks.get(id) ?? [],
          consumedBy: props?.type === 'readModel' ? props.consumedBy : readModelScreenLinks.get(id) ?? '',
          data: props?.type === 'readModel' ? props.data : {},
          timelinePosition: column,
        });
      },
      onPolicyNode(id, label, column) {
        const props = resolvedNodeProperties[id];
        policies.push({
          id,
          name: label,
          whenEvent: '',
          thenCommand: policyCommandLinks.get(id) ?? '',
          condition: props?.type === 'policy' ? props.condition : '',
          timelinePosition: column,
        });
      },
      onUIScreenNode(id, label, column) {
        const props = resolvedNodeProperties[id];
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

    const exportedSlices: VerticalSliceSchema[] = [];
    resolvedSlices.describeTo({
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
