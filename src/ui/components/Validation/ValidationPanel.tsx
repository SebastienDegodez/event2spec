import { type ValidationWarning } from '../../../core/domain/ValidationWarning';

const KIND_ICONS: Record<string, string> = {
  domainEvent: '🟠',
  command: '🔵',
  readModel: '🟢',
  policy: '🟣',
  uiScreen: '🟡',
};

interface ValidationPanelProps {
  warnings: ReadonlyArray<ValidationWarning>;
  onClose: () => void;
}

export function ValidationPanel({ warnings, onClose }: ValidationPanelProps) {
  return (
    <div className="validation-panel-overlay" onClick={onClose}>
      <div className="validation-panel" onClick={(e) => e.stopPropagation()}>
        <div className="validation-panel-header">
          <span className="validation-panel-title">⚠ Validation Warnings ({warnings.length})</span>
          <button
            className="validation-panel-close"
            onClick={onClose}
            aria-label="Close validation panel"
          >
            ×
          </button>
        </div>
        <ul className="validation-panel-list">
          {warnings.map((warning) => (
            <li key={warning.nodeId} className="validation-panel-item">
              <span className="validation-panel-icon">{KIND_ICONS[warning.nodeKind] ?? '⚪'}</span>
              <span className="validation-panel-badge-label">{warning.warningType}</span>
              <span className="validation-panel-message">{warning.message}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
