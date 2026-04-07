import { useCallback, useState } from 'react';

interface KeyValueEditorProps {
  entries: Record<string, string>;
  onChange: (entries: Record<string, string>) => void;
  keyPlaceholder?: string;
  valuePlaceholder?: string;
}

export function KeyValueEditor({ entries, onChange, keyPlaceholder = 'key', valuePlaceholder = 'value' }: KeyValueEditorProps) {
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  const handleAdd = useCallback(() => {
    const trimmedKey = newKey.trim();
    if (!trimmedKey) return;
    onChange({ ...entries, [trimmedKey]: newValue });
    setNewKey('');
    setNewValue('');
  }, [entries, newKey, newValue, onChange]);

  const handleRemove = useCallback(
    (key: string) => {
      const { [key]: _, ...rest } = entries;
      void _;
      onChange(rest);
    },
    [entries, onChange]
  );

  const handleValueChange = useCallback(
    (key: string, value: string) => {
      onChange({ ...entries, [key]: value });
    },
    [entries, onChange]
  );

  const entryKeys = Object.keys(entries);

  return (
    <div className="kv-editor">
      {entryKeys.map((key) => (
        <div key={key} className="kv-editor-row">
          <span className="kv-editor-key" title={key}>{key}</span>
          <input
            className="kv-editor-value"
            type="text"
            value={entries[key]}
            onChange={(e) => handleValueChange(key, e.target.value)}
            placeholder={valuePlaceholder}
          />
          <button
            className="kv-editor-remove"
            onClick={() => handleRemove(key)}
            title="Remove field"
            aria-label={`Remove ${key}`}
          >
            ×
          </button>
        </div>
      ))}
      <div className="kv-editor-row kv-editor-add-row">
        <input
          className="kv-editor-key-input"
          type="text"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
          placeholder={keyPlaceholder}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleAdd();
          }}
        />
        <input
          className="kv-editor-value"
          type="text"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          placeholder={valuePlaceholder}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleAdd();
          }}
        />
        <button
          className="kv-editor-add"
          onClick={handleAdd}
          title="Add field"
          aria-label="Add field"
          disabled={!newKey.trim()}
        >
          +
        </button>
      </div>
    </div>
  );
}
