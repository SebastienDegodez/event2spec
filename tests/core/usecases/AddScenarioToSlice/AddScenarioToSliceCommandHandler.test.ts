import { describe, it, expect } from 'vitest';
import { VerticalSliceCollection } from '../../../../src/core/domain/vertical-slice/VerticalSliceCollection';
import { VerticalSlice } from '../../../../src/core/domain/vertical-slice/VerticalSlice';
import { AddScenarioToSliceCommand } from '../../../../src/core/usecases/commands/AddScenarioToSlice/AddScenarioToSliceCommand';
import { AddScenarioToSliceCommandHandler } from '../../../../src/core/usecases/commands/AddScenarioToSlice/AddScenarioToSliceCommandHandler';
import { InMemoryVerticalSliceRepository } from '../../../helpers/InMemoryVerticalSliceRepository';
import { collectSlices } from '../../../helpers/collectSlices';

describe('AddScenarioToSliceCommandHandler', () => {
  it('adds a scenario to an existing slice', () => {
    const initial = VerticalSliceCollection.empty()
      .add(VerticalSlice.create('vs1', 'Place Order', 'c1', ['e1'], 'rm1'));
    const repository = new InMemoryVerticalSliceRepository(initial);
    const handler = new AddScenarioToSliceCommandHandler(repository);

    handler.handle(new AddScenarioToSliceCommand('vs1', ['an empty cart'], 'user places order', ['order is created']));

    const slices = collectSlices(repository.load());
    expect(slices[0].scenarios).toHaveLength(1);
    expect(slices[0].scenarios[0].given).toEqual(['an empty cart']);
    expect(slices[0].scenarios[0].when).toBe('user places order');
    expect(slices[0].scenarios[0].then).toEqual(['order is created']);
  });

  it('appends multiple scenarios to the same slice', () => {
    const initial = VerticalSliceCollection.empty()
      .add(VerticalSlice.create('vs1', 'Place Order', 'c1', ['e1'], 'rm1'));
    const repository = new InMemoryVerticalSliceRepository(initial);
    const handler = new AddScenarioToSliceCommandHandler(repository);

    handler.handle(new AddScenarioToSliceCommand('vs1', ['a cart with items'], 'user places order', ['order is confirmed']));
    handler.handle(new AddScenarioToSliceCommand('vs1', ['an empty cart'], 'user places order', ['error is shown']));

    const slices = collectSlices(repository.load());
    expect(slices[0].scenarios).toHaveLength(2);
  });
});
