import { useMemo } from 'react';
import { useBoard, useLinks } from '../../core/store/useBoardStore';
import { ValidateModelQuery } from '../../core/usecases/queries/ValidateModel/ValidateModelQuery';
import { ValidateModelQueryHandler } from '../../core/usecases/queries/ValidateModel/ValidateModelQueryHandler';
import { type ValidationWarning } from '../../core/domain/validation/ValidationWarning';

export function useValidationWarnings(): ReadonlyArray<ValidationWarning> {
  const board = useBoard();
  const links = useLinks();

  return useMemo(() => {
    const queryHandler = new ValidateModelQueryHandler({
      loadBoard: () => board,
      loadLinks: () => links,
    });

    return queryHandler.handle(new ValidateModelQuery());
  }, [board, links]);
}
