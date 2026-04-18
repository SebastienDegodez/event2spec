import { useCallback, useState } from 'react';
import { useAutoEdit } from './useAutoEdit';

interface NodeInlineEditingParams {
  id: string;
  label: string;
  updateLabel: (id: string, label: string) => void;
}

interface NodeInlineEditingResult {
  editing: boolean;
  draft: string;
  setDraft: (value: string) => void;
  commitEdit: () => void;
  cancelEdit: () => void;
}

export function useNodeInlineEditing({
  id,
  label,
  updateLabel,
}: NodeInlineEditingParams): NodeInlineEditingResult {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(label);

  const startEditing = useCallback(() => {
    setDraft(label);
    setEditing(true);
  }, [label]);

  useAutoEdit(id, startEditing);

  const commitEdit = useCallback(() => {
    const trimmed = draft.trim();
    if (trimmed) {
      updateLabel(id, trimmed);
    } else {
      setDraft(label);
    }
    setEditing(false);
  }, [draft, id, label, updateLabel]);

  const cancelEdit = useCallback(() => {
    setDraft(label);
    setEditing(false);
  }, [label]);

  return {
    editing,
    draft,
    setDraft,
    commitEdit,
    cancelEdit,
  };
}