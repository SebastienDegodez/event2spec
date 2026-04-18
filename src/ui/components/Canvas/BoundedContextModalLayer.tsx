import { RenameModal } from '../RenameModal';
import { ConfirmDeleteModal } from '../ConfirmDeleteModal';

interface BoundedContextModalLayerProps {
  editingBoundedContextId: string | null;
  editingBoundedContextName: string;
  onConfirmRename: (newName: string) => void;
  onCancelRename: () => void;
  deleteConfirmingBcId: string | null;
  deleteConfirmingBcName: string;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
}

export function BoundedContextModalLayer({
  editingBoundedContextId,
  editingBoundedContextName,
  onConfirmRename,
  onCancelRename,
  deleteConfirmingBcId,
  deleteConfirmingBcName,
  onConfirmDelete,
  onCancelDelete,
}: BoundedContextModalLayerProps) {
  return (
    <>
      {editingBoundedContextId && (
        <RenameModal
          title="Rename Bounded Context"
          currentValue={editingBoundedContextName}
          onConfirm={onConfirmRename}
          onCancel={onCancelRename}
        />
      )}
      {deleteConfirmingBcId && (
        <ConfirmDeleteModal
          title="Delete Bounded Context?"
          message={`Are you sure you want to delete "${deleteConfirmingBcName}"?`}
          confirmLabel="Delete"
          cancelLabel="Cancel"
          onConfirm={onConfirmDelete}
          onCancel={onCancelDelete}
        />
      )}
    </>
  );
}