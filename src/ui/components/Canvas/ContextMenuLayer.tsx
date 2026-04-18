import { ContextMenu } from './ContextMenu';
import { type ContextMenuState } from './ContextMenuState';
import { type ContextMenuItem } from './ContextMenuItem';

interface ContextMenuLayerProps {
  contextMenu: ContextMenuState | null;
  items: ReadonlyArray<ContextMenuItem>;
  onClose: () => void;
}

export function ContextMenuLayer({
  contextMenu,
  items,
  onClose,
}: ContextMenuLayerProps) {
  if (!contextMenu) {
    return null;
  }

  return (
    <ContextMenu
      x={contextMenu.x}
      y={contextMenu.y}
      items={items}
      onClose={onClose}
    />
  );
}