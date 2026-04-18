import { type NodeKind } from '../../../core/domain/node/NodeKind';
import { cellNodeOptions } from '../../../core/domain/CellNodeOptions';
import { type ContextMenuState } from './ContextMenuState';
import { type ContextMenuItem } from './ContextMenuItem';

interface BuildContextMenuItemsOptions {
  readonly contextMenu: ContextMenuState | null;
  readonly addEventAtPosition: (column: number, row: number) => void;
  readonly addNodeAtPosition: (kind: NodeKind, label: string, column: number, row: number) => void;
}

export function buildContextMenuItems({
  contextMenu,
  addEventAtPosition,
  addNodeAtPosition,
}: BuildContextMenuItemsOptions): ContextMenuItem[] {
  if (!contextMenu) return [];

  if (!contextMenu.nodeId) {
    const options = cellNodeOptions(contextMenu.row);
    return options.map((opt) => ({
      label: `Add ${opt.label}`,
      onClick: () => addNodeAtPosition(opt.kind, opt.label, contextMenu.column, contextMenu.row),
    }));
  }

  if (contextMenu.nodeId) {
    return [
      { label: 'Insert event before', onClick: () => addEventAtPosition(contextMenu.column, contextMenu.row) },
      { label: 'Insert event after', onClick: () => addEventAtPosition(contextMenu.column + 1, contextMenu.row) },
    ];
  }

  return [
    { label: 'Add domain event', onClick: () => addEventAtPosition(contextMenu.column, contextMenu.row) },
  ];
}