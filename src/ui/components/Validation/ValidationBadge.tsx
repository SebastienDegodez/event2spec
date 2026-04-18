import { type ValidationWarningType } from '../../../core/domain/validation/ValidationWarningType';

const BADGE_LABELS: Record<ValidationWarningType, string> = {
  orphan: 'orphan',
  incomplete: 'incomplete',
  disconnected: 'disconnected',
};

interface ValidationBadgeProps {
  warningType: ValidationWarningType;
}

export function ValidationBadge({ warningType }: ValidationBadgeProps) {
  return (
    <span className={`validation-badge validation-badge--${warningType}`}>
      ⚠ {BADGE_LABELS[warningType]}
    </span>
  );
}
