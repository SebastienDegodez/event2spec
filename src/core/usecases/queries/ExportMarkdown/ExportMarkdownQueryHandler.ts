import { GridBoard } from '../../../domain/GridBoard';
import { DomainEventNode } from '../../../domain/DomainEventNode';
import { CommandNode } from '../../../domain/CommandNode';
import { ReadModelNode } from '../../../domain/ReadModelNode';
import { PolicyNode } from '../../../domain/PolicyNode';
import { UIScreenNode } from '../../../domain/UIScreenNode';
import { ExportMarkdownQuery } from './ExportMarkdownQuery';

interface NodeLink {
  commandNodeId: string;
  eventNodeId: string;
}

export class ExportMarkdownQueryHandler {
  handle(board: GridBoard, links: ReadonlyArray<NodeLink>, query: ExportMarkdownQuery): string {
    void query;
    const nodes = board.toArray();

    const domainEvents = nodes.filter((node) => node instanceof DomainEventNode);
    const commands = nodes.filter((node) => node instanceof CommandNode);
    const readModels = nodes.filter((node) => node instanceof ReadModelNode);
    const policies = nodes.filter((node) => node instanceof PolicyNode);
    const uiScreens = nodes.filter((node) => node instanceof UIScreenNode);

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
      domainEvents.forEach((node) => {
        lines.push(`- **${node.label}** (id: \`${node.id}\`)`);
      });
    }

    lines.push('', '## Commands', '');

    if (commands.length === 0) {
      lines.push('*(No commands defined yet)*');
    } else {
      commands.forEach((node) => {
        const resultingEvent = commandLinks.get(node.id);
        const trigger = resultingEvent ? ` → triggers \`${resultingEvent}\`` : '';
        lines.push(`- **${node.label}** (id: \`${node.id}\`)${trigger}`);
      });
    }

    lines.push('', '## Read Models', '');

    if (readModels.length === 0) {
      lines.push('*(No read models defined yet)*');
    } else {
      readModels.forEach((node) => {
        lines.push(`- **${node.label}** (id: \`${node.id}\`)`);
      });
    }

    lines.push('', '## Policies', '');

    if (policies.length === 0) {
      lines.push('*(No policies defined yet)*');
    } else {
      policies.forEach((node) => {
        lines.push(`- **${node.label}** (id: \`${node.id}\`)`);
      });
    }

    lines.push('', '## UI Screens', '');

    if (uiScreens.length === 0) {
      lines.push('*(No UI screens defined yet)*');
    } else {
      uiScreens.forEach((node) => {
        lines.push(`- **${node.label}** (id: \`${node.id}\`)`);
      });
    }

    lines.push('', '## Vertical Slices', '', '*(No vertical slices defined yet)*');
    lines.push('', '## Bounded Contexts', '', '*(No bounded contexts defined yet)*');
    lines.push('', '## Decisions', '', '*(No decisions recorded yet)*');
    lines.push('', '## Open Questions', '', '*(No open questions recorded yet)*');

    return lines.join('\n');
  }
}
