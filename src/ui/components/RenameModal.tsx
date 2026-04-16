import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export interface RenameModalProps {
  title: string;
  currentValue: string;
  onConfirm: (newValue: string) => void;
  onCancel: () => void;
}

export function RenameModal({ title, currentValue, onConfirm, onCancel }: RenameModalProps) {
  const [value, setValue] = useState(currentValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  const handleConfirm = () => {
    if (value.trim() && value !== currentValue) {
      onConfirm(value.trim());
    }
    onCancel();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleConfirm();
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  return createPortal(
    <div className="confirm-dialog-overlay" onClick={onCancel}>
      <div
        className="confirm-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="confirm-dialog-title">{title}</h2>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="rename-modal-input"
          placeholder="Enter name..."
          aria-label="New name"
        />
        <div className="confirm-dialog-actions">
          <button
            className="confirm-dialog-btn confirm-dialog-btn--cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="confirm-dialog-btn confirm-dialog-btn--confirm"
            onClick={handleConfirm}
          >
            Rename
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
