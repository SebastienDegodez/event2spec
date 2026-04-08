import { useEffect, useRef } from 'react';
import { useAutoEditNodeId, useBoardStore } from '../../core/store/useBoardStore';

/**
 * Hook that checks whether a newly mounted node should start in
 * editing mode. Returns `true` on the first render if this node
 * matches the autoEditNodeId in the store (and clears it).
 *
 * Also watches for subsequent autoEditNodeId changes via useEffect,
 * calling `startEditing` when matched.
 */
export function useAutoEdit(
  nodeId: string,
  startEditing: () => void,
): boolean {
  const autoEditNodeId = useAutoEditNodeId();
  const startEditingRef = useRef(startEditing);
  startEditingRef.current = startEditing;

  // Synchronous check during first render — handles the case where
  // the node mounts after autoEditNodeId was already set
  const initialAutoEditRef = useRef<boolean | null>(null);
  if (initialAutoEditRef.current === null) {
    const state = useBoardStore.getState();
    if (state.autoEditNodeId === nodeId) {
      initialAutoEditRef.current = true;
      state.clearAutoEditNodeId();
    } else {
      initialAutoEditRef.current = false;
    }
  }

  // Effect-based check for when autoEditNodeId changes after mount
  useEffect(() => {
    if (autoEditNodeId === nodeId) {
      startEditingRef.current();
      useBoardStore.getState().clearAutoEditNodeId();
    }
  }, [autoEditNodeId, nodeId]);

  return initialAutoEditRef.current;
}
