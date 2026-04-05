import { GridBoard } from '../../../domain/GridBoard';
import { type BoardNodeVisitor } from '../../../domain/BoardNodeVisitor';
import { ExportMarkdownQuery } from './ExportMarkdownQuery';

interface NodeLink {
  commandNodeId: string;
  eventNodeId: string;
}

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

    const visitor: BoardNodeVisitor = {
      visitDomainEventNode(id, label) { domainEvents.push({ id, label }); },
      visitCommandNode(id, label) { commands.push({ id, label }); },
      visitReadModelNode(id, label) { readModels.push({ id, label }); },
      visitPolicyNode(id, label) { policies.push({ id, label }); },
      visitUIScreenNode(id, label) { uiScreens.push({ id, label }); },
    };

    board.accept(visitor);

    const commandLinks = new Map<string, string>(
      links.map((link) => [link.commandNodeId, link.eventNodeId])
    );

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
        const resultingEvent = commandLinks.get(entry.id);
        const trigger = resultingEvent ? ` → triggers \`${resultingEvent}\`` : '';
        lines.push(`- **${entry.label}** (id: \`${entry.id}\`)${trigger}`);
      });
    }

    lines.push('', '## Read Models', '');

    if (readModels.length === 0) {
      lines.push('*(No read models defined yet)*');
    } else {
      readModels.forEach((entry) => {
        lines.push(`- **${entry.label}** (id: \`${entry.id}\`)`);
      });
    }

    lines.push('', '## Policies', '');

    if (policies.length === 0) {
      lines.push('*(No policies defined yet)*');
    } else {
      policies.forEach((entry) => {
        lines.push(`- **${entry.label}** (id: \`${entry.id}\`)`);
      });
    }

    lines.push('', '## UI Screens', '');

    if (uiScreens.length === 0) {
      lines.push('*(No UI screens defined yet)*');
    } else {
      uiScreens.forEach((entry) => {
        lines.push(`- **${entry.label}** (id: \`${entry.id}\`)`);
      });
    }

    lines.push('', '## Vertical Slices', '', '*(No vertical slices defined yet)*');
    lines.push('', '## Bounded Contexts', '', '*(No bounded contexts defined yet)*');
    lines.push('', '## Decisions', '', '*(No decisions recorded yet)*');
    lines.push('', '## Open Questions', '', '*(No open questions recorded yet)*');

    return lines.join('\n');
  }
}
