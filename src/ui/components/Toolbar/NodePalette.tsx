import { useCallback, type DragEvent } from 'react';
import { useBoardActions } from '../../../core/store/useBoardStore';

const PALETTE_ITEMS = [
  { type: 'domain-event', label: '🟠 Domain Event', className: 'palette-event' },
  { type: 'command', label: '🔵 Command', className: 'palette-command' },
  { type: 'read-model', label: '🟢 Read Model', className: 'palette-read-model' },
  { type: 'policy', label: '🟣 Policy', className: 'palette-policy' },
  { type: 'ui-screen', label: '🟡 UI Screen', className: 'palette-ui-screen' },
] as const;

export function NodePalette() {
  const { addDomainEventNode, addCommandNode, addReadModelNode, addPolicyNode, addUIScreenNode } = useBoardActions();

  const addAtOrigin = useCallback((type: string) => {
    const id = `${type}-${crypto.randomUUID()}`;
    if (type === 'domain-event') {
      addDomainEventNode(id, 'Domain Event', 0, 0);
    } else if (type === 'command') {
      addCommandNode(id, 'Command', 0, 0);
    } else if (type === 'read-model') {
      addReadModelNode(id, 'Read Model', 0, 1);
    } else if (type === 'policy') {
      addPolicyNode(id, 'Policy', 0, 2);
    } else if (type === 'ui-screen') {
      addUIScreenNode(id, 'UI Screen', 0, 3);
    }
  }, [addDomainEventNode, addCommandNode, addReadModelNode, addPolicyNode, addUIScreenNode]);

  const onDragStart = useCallback((event: DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/event2spec-node-type', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  }, []);

  return (
    <aside className="node-palette" aria-label="Node palette">
      <div className="palette-title">Post-its</div>
      {PALETTE_ITEMS.map((item) => (
        <div
          key={item.type}
          className={`palette-item ${item.className}`}
          draggable
          onClick={() => addAtOrigin(item.type)}
          onDragStart={(e) => onDragStart(e, item.type)}
          title={`Add ${item.label.slice(2)}`}
          aria-label={`Add ${item.label.slice(2)}`}
        >
          {item.label}
        </div>
      ))}
    </aside>
  );
}
