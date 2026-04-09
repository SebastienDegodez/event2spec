import { describe, it, expect } from 'vitest';
import { AssignSliceToBoundedContextCommand } from '../../../../src/core/usecases/commands/AssignSliceToBoundedContext/AssignSliceToBoundedContextCommand';
import { AssignSliceToBoundedContextCommandHandler } from '../../../../src/core/usecases/commands/AssignSliceToBoundedContext/AssignSliceToBoundedContextCommandHandler';
import { InMemoryVerticalSliceRepository } from '../../../helpers/InMemoryVerticalSliceRepository';
import { CreateSliceCommandHandler } from '../../../../src/core/usecases/commands/CreateSlice/CreateSliceCommandHandler';
import { CreateSliceCommand } from '../../../../src/core/usecases/commands/CreateSlice/CreateSliceCommand';
import { collectSlices } from '../../../helpers/collectSlices';

describe('AssignSliceToBoundedContextCommandHandler', () => {
  it('assigns a slice to a bounded context', () => {
    const repository = new InMemoryVerticalSliceRepository();
    new CreateSliceCommandHandler(repository).handle(new CreateSliceCommand('vs1', 'Réserver une chambre', 'c1', ['e1'], 'rm1'));

    const handler = new AssignSliceToBoundedContextCommandHandler(repository);
    handler.handle(new AssignSliceToBoundedContextCommand('vs1', 'bc1'));

    const slices = collectSlices(repository.load());
    expect(slices[0].boundedContextId).toBe('bc1');
  });

  it('unassigns a slice when boundedContextId is undefined', () => {
    const repository = new InMemoryVerticalSliceRepository();
    new CreateSliceCommandHandler(repository).handle(new CreateSliceCommand('vs1', 'Réserver une chambre', 'c1', ['e1'], 'rm1'));
    new AssignSliceToBoundedContextCommandHandler(repository).handle(new AssignSliceToBoundedContextCommand('vs1', 'bc1'));

    new AssignSliceToBoundedContextCommandHandler(repository).handle(new AssignSliceToBoundedContextCommand('vs1', undefined));

    const slices = collectSlices(repository.load());
    expect(slices[0].boundedContextId).toBeUndefined();
  });

  it('slices without assignment have no boundedContextId', () => {
    const repository = new InMemoryVerticalSliceRepository();
    new CreateSliceCommandHandler(repository).handle(new CreateSliceCommand('vs1', 'Réserver une chambre', 'c1', ['e1'], 'rm1'));

    const slices = collectSlices(repository.load());
    expect(slices[0].boundedContextId).toBeUndefined();
  });
});
