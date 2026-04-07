import { useCallback, useState } from 'react';

interface StringListEditorProps {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}

export function StringListEditor({ items, onChange, placeholder = 'New item...' }: StringListEditorProps) {
  const [draft, setDraft] = useState('');

  const handleAdd = useCallback(() => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    onChange([...items, trimmed]);
    setDraft('');
  }, [items, draft, onChange]);

  const handleRemove = useCallback(
    (index: number) => {
      onChange(items.filter((_, i) => i !== index));
    },
    [items, onChange]
  );

  const handleChange = useCallback(
    (index: number, value: string) => {
      onChange(items.map((item, i) => (i === index ? value : item)));
    },
    [items, onChange]
  );

  return (
    <div className="string-list-editor">
      {items.map((item, index) => (
        <div key={index} className="string-list-row">
          <input
            className="string-list-input"
            type="text"
            value={item}
            onChange={(e) => handleChange(index, e.target.value)}
          />
          <button
            className="string-list-remove"
            onClick={() => handleRemove(index)}
            title="Remove"
            aria-label={`Remove item ${index + 1}`}
          >
            ×
          </button>
        </div>
      ))}
      <div className="string-list-row string-list-add-row">
        <input
          className="string-list-input"
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleAdd();
          }}
        />
        <button
          className="string-list-add"
          onClick={handleAdd}
          title="Add"
          aria-label="Add item"
          disabled={!draft.trim()}
        >
          +
        </button>
      </div>
    </div>
  );
}
