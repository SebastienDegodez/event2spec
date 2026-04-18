import { GridBoard } from '../../../domain/GridBoard';
import { type BoardProjection } from '../../../domain/BoardProjection';
import { type NodeLink } from '../../../domain/NodeLink';
import { VerticalSliceCollection } from '../../../domain/VerticalSliceCollection';
import { ExportMarkdownQuery } from './ExportMarkdownQuery';

interface NamedEntry {
  id: string;
  label: string;
}

export interface ExportMarkdownQueryRepository {
  loadBoard(): GridBoard;
  loadLinks(): ReadonlyArray<NodeLink>;
  loadSlices(): VerticalSliceCollection;
}

export class ExportMarkdownQueryHandler {
  private readonly repository: ExportMarkdownQueryRepository | undefined;

  constructor(repository?: ExportMarkdownQueryRepository) {
    this.repository = repository;
  }

  handle(query: ExportMarkdownQuery): string;
  handle(board: GridBoard, links: ReadonlyArray<NodeLink>, slices: VerticalSliceCollection, query: ExportMarkdownQuery): string;
  handle(
    boardOrQuery: GridBoard | ExportMarkdownQuery,
    links?: ReadonlyArray<NodeLink>,
    slices?: VerticalSliceCollection,
    query?: ExportMarkdownQuery,
  ): string {
    let board: GridBoard;
    let resolvedLinks: ReadonlyArray<NodeLink>;
    let resolvedSlices: VerticalSliceCollection;
    let resolvedQuery: ExportMarkdownQuery;

    if (boardOrQuery instanceof ExportMarkdownQuery) {
      if (!this.repository) {
        throw new Error('ExportMarkdownQueryRepository is required when calling handle(query)');
      }
      board = this.repository.loadBoard();
      resolvedLinks = this.repository.loadLinks();
      resolvedSlices = this.repository.loadSlices();
      resolvedQuery = boardOrQuery;
    } else {
      board = boardOrQuery;
      resolvedLinks = links ?? [];
      resolvedSlices = slices ?? VerticalSliceCollection.empty();
      resolvedQuery = query ?? new ExportMarkdownQuery();
    }

    void resolvedQuery;

    const domainEvents: NamedEntry[] = [];
    const commands: NamedEntry[] = [];
    const readModels: NamedEntry[] = [];
    const policies: NamedEntry[] = [];
    const uiScreens: NamedEntry[] = [];

    const projection: BoardProjection = {
      onDomainEventNode(id, label) { domainEvents.push({ id, label }); },
      onCommandNode(id, label) { commands.push({ id, label }); },
      onReadModelNode(id, label) { readModels.push({ id, label }); },
      onPolicyNode(id, label) { policies.push({ id, label }); },
      onUIScreenNode(id, label) { uiScreens.push({ id, label }); },
    };

    board.describeTo(projection);

    const triggersLinks = new Map<string, string>(
      resolvedLinks.filter((l) => l.connectionType === 'triggers').map((l) => [l.sourceNodeId, l.targetNodeId])
    );
    const feedsLinks = new Map<string, string[]>();
    const policyEventLinks = new Map<string, string>();
    const policyCommandLinks = new Map<string, string>();
    const uiScreenCommandLinks = new Map<string, string>();
    const readModelScreenLinks = new Map<string, string>();

    for (const link of resolvedLinks) {
      if (link.connectionType === 'feeds') {
        const existing = feedsLinks.get(link.targetNodeId) ?? [];
        feedsLinks.set(link.targetNodeId, [...existing, link.sourceNodeId]);
      } else if (link.connectionType === 'triggers policy') {
        policyEventLinks.set(link.targetNodeId, link.sourceNodeId);
      } else if (link.connectionType === 'executes') {
        policyCommandLinks.set(link.sourceNodeId, link.targetNodeId);
      } else if (link.connectionType === 'user action') {
        uiScreenCommandLinks.set(link.sourceNodeId, link.targetNodeId);
      } else if (link.connectionType === 'displays') {
        readModelScreenLinks.set(link.sourceNodeId, link.targetNodeId);
      }
    }

    const lines: string[] = [
      '# Event Model',
      '',
      '## Actors',
      '',
      '*(No actors defined yet)*',
      '',
      '## Domain Events',
      '',
    ];

    if (domainEvents.length === 0) {
      lines.push('*(No domain events defined yet)*');
    } else {
      domainEvents.forEach((entry) => {
        lines.push(`- **${entry.label}** (id: \`${entry.id}\`)`);
      });
    }

    lines.push('', '## Commands', '');

    if (commands.length === 0) {
      lines.push('*(No commands defined yet)*');
    } else {
      commands.forEach((entry) => {
        const resultingEvent = triggersLinks.get(entry.id);
        const trigger = resultingEvent ? ` → triggers \`${resultingEvent}\`` : '';
        lines.push(`- **${entry.label}** (id: \`${entry.id}\`)${trigger}`);
      });
    }

    lines.push('', '## Read Models', '');

    if (readModels.length === 0) {
      lines.push('*(No read models defined yet)*');
    } else {
      readModels.forEach((entry) => {
        const sources = feedsLinks.get(entry.id);
        const fedBy = sources && sources.length > 0 ? ` ← fed by ${sources.map((s) => `\`${s}\``).join(', ')}` : '';
        lines.push(`- **${entry.label}** (id: \`${entry.id}\`)${fedBy}`);
      });
    }

    lines.push('', '## Policies', '');

    if (policies.length === 0) {
      lines.push('*(No policies defined yet)*');
    } else {
      policies.forEach((entry) => {
        const whenEvent = policyEventLinks.get(entry.id);
        const thenCommand = policyCommandLinks.get(entry.id);
        const when = whenEvent ? ` when \`${whenEvent}\`` : '';
        const then = thenCommand ? ` → executes \`${thenCommand}\`` : '';
        lines.push(`- **${entry.label}** (id: \`${entry.id}\`)${when}${then}`);
      });
    }

    lines.push('', '## UI Screens', '');

    if (uiScreens.length === 0) {
      lines.push('*(No UI screens defined yet)*');
    } else {
      uiScreens.forEach((entry) => {
        const triggersCommand = uiScreenCommandLinks.get(entry.id);
        const action = triggersCommand ? ` → user action \`${triggersCommand}\`` : '';
        lines.push(`- **${entry.label}** (id: \`${entry.id}\`)${action}`);
      });
    }

    lines.push('', '## Vertical Slices', '');

    interface SliceEntry {
      name: string;
      commandId: string;
      eventIds: ReadonlyArray<string>;
      readModelId: string;
      scenarios: ReadonlyArray<{ given: ReadonlyArray<string>; when: string; then: ReadonlyArray<string> }>;
    }
    const sliceEntries: SliceEntry[] = [];
    resolvedSlices.describeTo({
      onSlice(_id, name, commandId, eventIds, readModelId, scenarios) {
        sliceEntries.push({ name, commandId, eventIds, readModelId, scenarios });
      },
    });

    if (sliceEntries.length === 0) {
      lines.push('*(No vertical slices defined yet)*');
    } else {
      sliceEntries.forEach((entry) => {
        lines.push(`### ${entry.name}`);
        lines.push('');
        lines.push(`- **Command**: \`${entry.commandId}\``);
        lines.push(`- **Events**: ${entry.eventIds.map((e) => `\`${e}\``).join(', ')}`);
        lines.push(`- **Read Model**: \`${entry.readModelId}\``);
        if (entry.scenarios.length > 0) {
          lines.push('');
          lines.push('**Scenarios:**');
          entry.scenarios.forEach((scenario) => {
            lines.push('');
            scenario.given.forEach((g) => lines.push(`- **Given** ${g}`));
            lines.push(`- **When** ${scenario.when}`);
            scenario.then.forEach((t) => lines.push(`- **Then** ${t}`));
          });
        }
        lines.push('');
      });
    }
    lines.push('', '## Bounded Contexts', '', '*(No bounded contexts defined yet)*');
    lines.push('', '## Decisions', '', '*(No decisions recorded yet)*');
    lines.push('', '## Open Questions', '', '*(No open questions recorded yet)*');

    return lines.join('\n');
  }
}
