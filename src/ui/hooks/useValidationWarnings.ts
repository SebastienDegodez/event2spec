import { useMemo } from 'react';
import { type ValidationWarning } from '../../core/domain/validation/ValidationWarning';
import { useBoardViewModel } from '../adapters/zustand/useBoardViewModel';

export function useValidationWarnings(): ReadonlyArray<ValidationWarning> {
  const boardViewModel = useBoardViewModel();

  return useMemo(() => {
    return boardViewModel.validationWarnings();
  }, [boardViewModel]);
}
