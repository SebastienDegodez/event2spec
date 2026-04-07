import { describe, it, expect } from 'vitest';
import { VerticalSliceCollection } from '../../../../src/core/domain/VerticalSliceCollection';
import { VerticalSlice } from '../../../../src/core/domain/VerticalSlice';
import { Scenario } from '../../../../src/core/domain/Scenario';
import { RemoveScenarioFromSliceCommand } from '../../../../src/core/usecases/commands/RemoveScenarioFromSlice/RemoveScenarioFromSliceCommand';
import { RemoveScenarioFromSliceCommandHandler } from '../../../../src/core/usecases/commands/RemoveScenarioFromSlice/RemoveScenarioFromSliceCommandHandler';
import { InMemoryVerticalSliceRepository } from '../../../helpers/InMemoryVerticalSliceRepository';
import { collectSlices } from '../../../helpers/collectSlices';

describe('RemoveScenarioFromSliceCommandHandler', () => {
  it('removes a scenario by index from a slice', () => {
    const slice = VerticalSlice.create('vs1', 'Place Order', 'c1', ['e1'], 'rm1')
      .addScenario(Scenario.create(['cart with items'], 'user places order', ['order confirmed']))
      .addScenario(Scenario.create(['empty cart'], 'user places order', ['error shown']));
    const initial = VerticalSliceCollection.empty().add(slice);
    const repository = new InMemoryVerticalSliceRepository(initial);
    const handler = new RemoveScenarioFromSliceCommandHandler(repository);

    handler.handle(new RemoveScenarioFromSliceCommand('vs1', 0));

    const slices = collectSlices(repository.load());
    expect(slices[0].scenarios).toHaveLength(1);
    expect(slices[0].scenarios[0].when).toBe('user places order');
    expect(slices[0].scenarios[0].given).toEqual(['empty cart']);
  });
});
