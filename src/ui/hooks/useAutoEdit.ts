import { useEffect, useRef } from 'react';
import { useAutoEditNodeId, useBoardStore } from '../../core/store/useBoardStore';

/**
 * Hook that checks whether a newly mounted node should start in
 * editing mode. Uses a synchronous store read on first render to
 * detect if this node matches autoEditNodeId, then triggers
 * `startEditing` via a mount effect.
 *
 * Also watches for subsequent autoEditNodeId changes via useEffect,
 * calling `startEditing` when matched.
 */
export function useAutoEdit(
  nodeId: string,
  startEditing: () => void,
): void {
  const autoEditNodeId = useAutoEditNodeId();
  const startEditingRef = useRef(startEditing);
  startEditingRef.current = startEditing;

  // Synchronous check during first render — detects if this node
  // should auto-edit on mount (before effects from other components
  // have a chance to clear autoEditNodeId)
  const initialAutoEditRef = useRef<boolean | null>(null);
  if (initialAutoEditRef.current === null) {
    const state = useBoardStore.getState();
    if (state.autoEditNodeId === nodeId) {
      initialAutoEditRef.current = true;
      state.clearAutoEditNodeId();
    }
    initialAutoEditRef.current ??= false;
  }

  // Mount effect: trigger editing if this node matched autoEditNodeId
  // on its first render. Uses [] deps because the check already ran
  // synchronously above — this just defers the state update.
  const initialFlag = initialAutoEditRef.current;
  useEffect(() => {
    if (initialFlag) startEditingRef.current();
  }, [initialFlag]);

  // Effect-based check for when autoEditNodeId changes after mount
  useEffect(() => {
    if (autoEditNodeId === nodeId) {
      startEditingRef.current();
      useBoardStore.getState().clearAutoEditNodeId();
    }
  }, [autoEditNodeId, nodeId]);
}
