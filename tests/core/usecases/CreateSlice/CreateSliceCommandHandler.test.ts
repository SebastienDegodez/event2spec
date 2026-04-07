import { describe, it, expect } from 'vitest';
import { CreateSliceCommand } from '../../../../src/core/usecases/commands/CreateSlice/CreateSliceCommand';
import { CreateSliceCommandHandler } from '../../../../src/core/usecases/commands/CreateSlice/CreateSliceCommandHandler';
import { InMemoryVerticalSliceRepository } from '../../../helpers/InMemoryVerticalSliceRepository';
import { collectSlices } from '../../../helpers/collectSlices';

describe('CreateSliceCommandHandler', () => {
  it('creates a slice in an empty collection', () => {
    const repository = new InMemoryVerticalSliceRepository();
    const handler = new CreateSliceCommandHandler(repository);

    handler.handle(new CreateSliceCommand('vs1', 'Place Order', 'c1', ['e1', 'e2'], 'rm1'));

    const slices = collectSlices(repository.load());
    expect(slices).toHaveLength(1);
    expect(slices[0].id).toBe('vs1');
    expect(slices[0].name).toBe('Place Order');
    expect(slices[0].commandId).toBe('c1');
    expect(slices[0].eventIds).toEqual(['e1', 'e2']);
    expect(slices[0].readModelId).toBe('rm1');
    expect(slices[0].scenarios).toHaveLength(0);
  });

  it('appends a slice at the end of an existing collection', () => {
    const repository = new InMemoryVerticalSliceRepository();
    const handler = new CreateSliceCommandHandler(repository);

    handler.handle(new CreateSliceCommand('vs1', 'Place Order', 'c1', ['e1'], 'rm1'));
    handler.handle(new CreateSliceCommand('vs2', 'Cancel Order', 'c2', ['e2'], 'rm2'));

    const slices = collectSlices(repository.load());
    expect(slices).toHaveLength(2);
    expect(slices[0].id).toBe('vs1');
    expect(slices[1].id).toBe('vs2');
  });

  it('creates a slice with multiple events', () => {
    const repository = new InMemoryVerticalSliceRepository();
    const handler = new CreateSliceCommandHandler(repository);

    handler.handle(new CreateSliceCommand('vs1', 'Checkout', 'c1', ['e1', 'e2', 'e3'], 'rm1'));

    const slices = collectSlices(repository.load());
    expect(slices[0].eventIds).toEqual(['e1', 'e2', 'e3']);
  });
});
