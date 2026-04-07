import { useState, useCallback } from 'react';
import { useValidationWarnings } from '../../hooks/useValidationWarnings';
import { ValidationPanel } from './ValidationPanel';

export function ValidationCounter() {
  const warnings = useValidationWarnings();
  const [panelOpen, setPanelOpen] = useState(false);

  const togglePanel = useCallback(() => {
    setPanelOpen((open) => !open);
  }, []);

  if (warnings.length === 0) return null;

  return (
    <>
      <button
        className="validation-counter"
        onClick={togglePanel}
        title={`${warnings.length} validation warning${warnings.length > 1 ? 's' : ''}`}
        aria-label={`${warnings.length} validation warning${warnings.length > 1 ? 's' : ''}`}
      >
        ⚠ {warnings.length}
      </button>
      {panelOpen && (
        <ValidationPanel warnings={warnings} onClose={() => setPanelOpen(false)} />
      )}
    </>
  );
}
