import { useCallback } from 'react';
import { useBoardActions } from '../../../core/store/useBoardStore';

export function NodePalette() {
  const { addNode, addReadModelNode, addPolicyNode, addUIScreenNode } = useBoardActions();

  const addAtOrigin = useCallback((type: string) => {
    const id = `${type}-${crypto.randomUUID()}`;
    if (type === 'domain-event') {
      addNode(id, 'Domain Event', 0, 0);
    } else if (type === 'read-model') {
      addReadModelNode(id, 'Read Model', 0, 1);
    } else if (type === 'policy') {
      addPolicyNode(id, 'Policy', 0, 2);
    } else if (type === 'ui-screen') {
      addUIScreenNode(id, 'UI Screen', 0, 3);
    }
  }, [addNode, addReadModelNode, addPolicyNode, addUIScreenNode]);

  return (
    <aside className="node-palette" aria-label="Node palette">
      <div className="palette-title">Post-its</div>
      <button
        className="palette-item palette-event"
        onClick={() => addAtOrigin('domain-event')}
        title="Add Domain Event"
        aria-label="Add Domain Event"
      >
        🟠 Domain Event
      </button>
      <button
        className="palette-item palette-read-model"
        onClick={() => addAtOrigin('read-model')}
        title="Add Read Model"
        aria-label="Add Read Model"
      >
        🟢 Read Model
      </button>
      <button
        className="palette-item palette-policy"
        onClick={() => addAtOrigin('policy')}
        title="Add Policy"
        aria-label="Add Policy"
      >
        🟣 Policy
      </button>
      <button
        className="palette-item palette-ui-screen"
        onClick={() => addAtOrigin('ui-screen')}
        title="Add UI Screen"
        aria-label="Add UI Screen"
      >
        🟡 UI Screen
      </button>
    </aside>
  );
}
