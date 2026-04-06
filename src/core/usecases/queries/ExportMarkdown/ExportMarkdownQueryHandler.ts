import { GridBoard } from '../../../domain/GridBoard';
import { type BoardProjection } from '../../../domain/BoardProjection';
import { type NodeLink } from '../../../domain/NodeLink';
import { ExportMarkdownQuery } from './ExportMarkdownQuery';

interface NamedEntry {
  id: string;
  label: string;
}

export class ExportMarkdownQueryHandler {
  handle(board: GridBoard, links: ReadonlyArray<NodeLink>, query: ExportMarkdownQuery): string {
    void query;

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
      links.filter((l) => l.connectionType === 'triggers').map((l) => [l.sourceNodeId, l.targetNodeId])
    );
    const feedsLinks = new Map<string, string[]>();
    const policyEventLinks = new Map<string, string>();
    const policyCommandLinks = new Map<string, string>();
    const uiScreenCommandLinks = new Map<string, string>();
    const readModelScreenLinks = new Map<string, string>();

    for (const link of links) {
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

    lines.push('', '## Vertical Slices', '', '*(No vertical slices defined yet)*');
    lines.push('', '## Bounded Contexts', '', '*(No bounded contexts defined yet)*');
    lines.push('', '## Decisions', '', '*(No decisions recorded yet)*');
    lines.push('', '## Open Questions', '', '*(No open questions recorded yet)*');

    return lines.join('\n');
  }
}
