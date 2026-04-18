import { useMemo } from 'react';
import { useValidationWarnings } from './useValidationWarnings';
import { type ValidationWarningType } from '../../core/domain/validation/ValidationWarningType';

export function useNodeValidationWarning(nodeId: string): ValidationWarningType | null {
  const warnings = useValidationWarnings();

  return useMemo(() => {
    const warning = warnings.find((w) => w.nodeId === nodeId);
    return warning ? warning.warningType : null;
  }, [warnings, nodeId]);
}
