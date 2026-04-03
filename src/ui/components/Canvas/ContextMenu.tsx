import { memo, useCallback, useEffect, useRef } from 'react';

export interface ContextMenuItem {
  readonly label: string;
  readonly onClick: () => void;
}

interface ContextMenuProps {
  readonly x: number;
  readonly y: number;
  readonly items: ReadonlyArray<ContextMenuItem>;
  readonly onClose: () => void;
}

export const ContextMenu = memo(({ x, y, items, onClose }: ContextMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as globalThis.Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="context-menu"
      style={{ top: y, left: x }}
      role="menu"
    >
      {items.map((item) => (
        <button
          key={item.label}
          className="context-menu-item"
          role="menuitem"
          onClick={() => {
            item.onClick();
            onClose();
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
});

ContextMenu.displayName = 'ContextMenu';
