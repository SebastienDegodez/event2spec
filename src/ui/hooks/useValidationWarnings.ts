import { useMemo } from 'react';
import { useBoard, useLinks } from '../../core/store/useBoardStore';
import { ValidateModelQuery } from '../../core/usecases/queries/ValidateModel/ValidateModelQuery';
import { ValidateModelQueryHandler } from '../../core/usecases/queries/ValidateModel/ValidateModelQueryHandler';
import { type ValidationWarning } from '../../core/domain/ValidationWarning';

const queryHandler = new ValidateModelQueryHandler();

export function useValidationWarnings(): ReadonlyArray<ValidationWarning> {
  const board = useBoard();
  const links = useLinks();

  return useMemo(
    () => queryHandler.handle(board, links, new ValidateModelQuery()),
    [board, links],
  );
}
