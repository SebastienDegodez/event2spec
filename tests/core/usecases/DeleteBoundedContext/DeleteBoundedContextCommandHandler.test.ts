import { describe, it, expect } from 'vitest';
import { DeleteBoundedContextCommand } from '../../../../src/core/usecases/commands/DeleteBoundedContext/DeleteBoundedContextCommand';
import { DeleteBoundedContextCommandHandler } from '../../../../src/core/usecases/commands/DeleteBoundedContext/DeleteBoundedContextCommandHandler';
import { InMemoryBoundedContextRepository } from '../../../helpers/InMemoryBoundedContextRepository';
import { InMemoryVerticalSliceRepository } from '../../../helpers/InMemoryVerticalSliceRepository';
import { CreateBoundedContextCommandHandler } from '../../../../src/core/usecases/commands/CreateBoundedContext/CreateBoundedContextCommandHandler';
import { CreateBoundedContextCommand } from '../../../../src/core/usecases/commands/CreateBoundedContext/CreateBoundedContextCommand';
import { AssignSliceToBoundedContextCommandHandler } from '../../../../src/core/usecases/commands/AssignSliceToBoundedContext/AssignSliceToBoundedContextCommandHandler';
import { AssignSliceToBoundedContextCommand } from '../../../../src/core/usecases/commands/AssignSliceToBoundedContext/AssignSliceToBoundedContextCommand';
import { CreateSliceCommandHandler } from '../../../../src/core/usecases/commands/CreateSlice/CreateSliceCommandHandler';
import { CreateSliceCommand } from '../../../../src/core/usecases/commands/CreateSlice/CreateSliceCommand';
import { collectBoundedContexts } from '../../../helpers/collectBoundedContexts';
import { collectSlices } from '../../../helpers/collectSlices';

describe('DeleteBoundedContextCommandHandler', () => {
  it('removes the bounded context from the collection', () => {
    const bcRepository = new InMemoryBoundedContextRepository();
    const createHandler = new CreateBoundedContextCommandHandler(bcRepository);
    createHandler.handle(new CreateBoundedContextCommand('bc1', 'Réservation'));
    createHandler.handle(new CreateBoundedContextCommand('bc2', 'Paiement'));

    const deleteHandler = new DeleteBoundedContextCommandHandler(bcRepository);
    deleteHandler.handle(new DeleteBoundedContextCommand('bc1'));

    const contexts = collectBoundedContexts(bcRepository.load());
    expect(contexts).toHaveLength(1);
    expect(contexts[0].id).toBe('bc2');
  });

  it('unassigns slices that belonged to the deleted bounded context', () => {
    const bcRepository = new InMemoryBoundedContextRepository();
    const sliceRepository = new InMemoryVerticalSliceRepository();

    new CreateBoundedContextCommandHandler(bcRepository).handle(new CreateBoundedContextCommand('bc1', 'Réservation'));
    new CreateSliceCommandHandler(sliceRepository).handle(new CreateSliceCommand('vs1', 'Réserver une chambre', 'c1', ['e1'], 'rm1'));
    new AssignSliceToBoundedContextCommandHandler(sliceRepository).handle(new AssignSliceToBoundedContextCommand('vs1', 'bc1'));

    new DeleteBoundedContextCommandHandler(bcRepository, sliceRepository).handle(new DeleteBoundedContextCommand('bc1'));

    const slices = collectSlices(sliceRepository.load());
    expect(slices[0].boundedContextId).toBeUndefined();
  });
});
