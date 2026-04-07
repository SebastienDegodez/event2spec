import { describe, it, expect } from 'vitest';
import { VerticalSliceCollection } from '../../../../src/core/domain/VerticalSliceCollection';
import { VerticalSlice } from '../../../../src/core/domain/VerticalSlice';
import { DeleteSliceCommand } from '../../../../src/core/usecases/commands/DeleteSlice/DeleteSliceCommand';
import { DeleteSliceCommandHandler } from '../../../../src/core/usecases/commands/DeleteSlice/DeleteSliceCommandHandler';
import { InMemoryVerticalSliceRepository } from '../../../helpers/InMemoryVerticalSliceRepository';
import { collectSlices } from '../../../helpers/collectSlices';

describe('DeleteSliceCommandHandler', () => {
  it('removes a slice from the collection', () => {
    const initial = VerticalSliceCollection.empty()
      .add(VerticalSlice.create('vs1', 'Place Order', 'c1', ['e1'], 'rm1'));
    const repository = new InMemoryVerticalSliceRepository(initial);
    const handler = new DeleteSliceCommandHandler(repository);

    handler.handle(new DeleteSliceCommand('vs1'));

    const slices = collectSlices(repository.load());
    expect(slices).toHaveLength(0);
  });

  it('only removes the specified slice', () => {
    const initial = VerticalSliceCollection.empty()
      .add(VerticalSlice.create('vs1', 'Place Order', 'c1', ['e1'], 'rm1'))
      .add(VerticalSlice.create('vs2', 'Cancel Order', 'c2', ['e2'], 'rm2'));
    const repository = new InMemoryVerticalSliceRepository(initial);
    const handler = new DeleteSliceCommandHandler(repository);

    handler.handle(new DeleteSliceCommand('vs1'));

    const slices = collectSlices(repository.load());
    expect(slices).toHaveLength(1);
    expect(slices[0].id).toBe('vs2');
  });
});
