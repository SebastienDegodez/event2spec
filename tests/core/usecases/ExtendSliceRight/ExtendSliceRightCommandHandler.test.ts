import { describe, it, expect } from 'vitest';
import { VerticalSlice } from '../../../../src/core/domain/vertical-slice/VerticalSlice';
import { VerticalSliceCollection } from '../../../../src/core/domain/vertical-slice/VerticalSliceCollection';
import { ExtendSliceRightCommand } from '../../../../src/core/usecases/commands/ExtendSliceRight/ExtendSliceRightCommand';
import { ExtendSliceRightCommandHandler } from '../../../../src/core/usecases/commands/ExtendSliceRight/ExtendSliceRightCommandHandler';
import { InMemoryVerticalSliceRepository } from '../../../helpers/InMemoryVerticalSliceRepository';
import { collectSlices } from '../../../helpers/collectSlices';

describe('ExtendSliceRightCommandHandler', () => {
  it('extends a slice by one free column on the right', () => {
    const initial = VerticalSliceCollection.empty().add(
      VerticalSlice.create('vs1', 'Checkout', 'c1', ['e1'], 'rm1', 4, 1)
    );
    const repository = new InMemoryVerticalSliceRepository(initial);
    const handler = new ExtendSliceRightCommandHandler(repository);

    handler.handle(new ExtendSliceRightCommand('vs1'));

    const slices = collectSlices(repository.load());
    expect(slices[0].startColumn).toBe(4);
    expect(slices[0].columnCount).toBe(2);
  });

  it('throws when the next column is already covered by another slice', () => {
    const initial = VerticalSliceCollection.empty()
      .add(VerticalSlice.create('vs1', 'Checkout', 'c1', ['e1'], 'rm1', 4, 1))
      .add(VerticalSlice.create('vs2', 'Pay', 'c2', ['e2'], 'rm2', 5, 1));
    const repository = new InMemoryVerticalSliceRepository(initial);
    const handler = new ExtendSliceRightCommandHandler(repository);

    expect(() => handler.handle(new ExtendSliceRightCommand('vs1'))).toThrow('Column 5 is already covered');
  });
});
