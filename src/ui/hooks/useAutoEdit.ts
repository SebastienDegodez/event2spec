import { useEffect } from 'react';
import { useAutoEditNodeId, useBoardActions } from '../../core/store/useBoardStore';

/**
 * Hook that triggers editing mode when the given node id matches
 * the autoEditNodeId in the store. Once matched, it clears the
 * autoEditNodeId so only one node enters editing mode.
 */
export function useAutoEdit(
  nodeId: string,
  startEditing: () => void,
): void {
  const autoEditNodeId = useAutoEditNodeId();
  const { clearAutoEditNodeId } = useBoardActions();

  useEffect(() => {
    if (autoEditNodeId === nodeId) {
      startEditing();
      clearAutoEditNodeId();
    }
  }, [autoEditNodeId, nodeId, startEditing, clearAutoEditNodeId]);
}
