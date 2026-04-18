import { useCallback, useState } from 'react';

interface BoundedContextModalActions {
  deleteBoundedContext: (id: string) => void;
  renameBoundedContext: (id: string, newName: string) => void;
  createBoundedContext: (id: string, name: string, insertIndex?: number) => void;
}

export interface BoundedContextModalsState {
  editingBoundedContextId: string | null;
  editingBoundedContextName: string;
  deleteConfirmingBcId: string | null;
  deleteConfirmingBcName: string;
}

export interface BoundedContextModalsHandlers {
  handleStartRenameBoundedContext: (id: string, currentName: string) => void;
  handleStartDeleteBoundedContext: (id: string, name: string, domainEventCount: number) => void;
  handleConfirmRenameBoundedContext: (newName: string) => void;
  handleCancelRenameBoundedContext: () => void;
  handleConfirmDeleteBoundedContext: () => void;
  handleCancelDeleteBoundedContext: () => void;
  handleCreateBoundedContext: (insertIndex?: number) => void;
}

export function useBoundedContextModals(
  actions: BoundedContextModalActions,
): BoundedContextModalsState & BoundedContextModalsHandlers {
  const [editingBoundedContextId, setEditingBoundedContextId] = useState<string | null>(null);
  const [editingBoundedContextName, setEditingBoundedContextName] = useState('');
  const [deleteConfirmingBcId, setDeleteConfirmingBcId] = useState<string | null>(null);
  const [deleteConfirmingBcName, setDeleteConfirmingBcName] = useState('');

  const handleDeleteBoundedContext = useCallback((id: string) => {
    actions.deleteBoundedContext(id);
    if (editingBoundedContextId === id) {
      setEditingBoundedContextId(null);
      setEditingBoundedContextName('');
    }
  }, [actions.deleteBoundedContext, editingBoundedContextId]);

  const handleStartRenameBoundedContext = useCallback((id: string, currentName: string) => {
    setEditingBoundedContextId(id);
    setEditingBoundedContextName(currentName);
  }, []);

  const handleStartDeleteBoundedContext = useCallback((id: string, name: string, domainEventCount: number) => {
    if (domainEventCount === 0) {
      handleDeleteBoundedContext(id);
      return;
    }
    setDeleteConfirmingBcId(id);
    setDeleteConfirmingBcName(name);
  }, [handleDeleteBoundedContext]);

  const handleConfirmDeleteBoundedContext = useCallback(() => {
    if (deleteConfirmingBcId) {
      handleDeleteBoundedContext(deleteConfirmingBcId);
    }
    setDeleteConfirmingBcId(null);
    setDeleteConfirmingBcName('');
  }, [deleteConfirmingBcId, handleDeleteBoundedContext]);

  const handleCancelDeleteBoundedContext = useCallback(() => {
    setDeleteConfirmingBcId(null);
    setDeleteConfirmingBcName('');
  }, []);

  const handleConfirmRenameBoundedContext = useCallback((newName: string) => {
    if (editingBoundedContextId) {
      actions.renameBoundedContext(editingBoundedContextId, newName);
    }
    setEditingBoundedContextId(null);
    setEditingBoundedContextName('');
  }, [editingBoundedContextId, actions.renameBoundedContext]);

  const handleCancelRenameBoundedContext = useCallback(() => {
    setEditingBoundedContextId(null);
    setEditingBoundedContextName('');
  }, []);

  const handleCreateBoundedContext = useCallback((insertIndex?: number) => {
    const baseName = 'New Bounded Context';
    actions.createBoundedContext(`bc-${crypto.randomUUID()}`, baseName, insertIndex);
  }, [actions.createBoundedContext]);

  return {
    editingBoundedContextId,
    editingBoundedContextName,
    deleteConfirmingBcId,
    deleteConfirmingBcName,
    handleStartRenameBoundedContext,
    handleStartDeleteBoundedContext,
    handleConfirmRenameBoundedContext,
    handleCancelRenameBoundedContext,
    handleConfirmDeleteBoundedContext,
    handleCancelDeleteBoundedContext,
    handleCreateBoundedContext,
  };
}
